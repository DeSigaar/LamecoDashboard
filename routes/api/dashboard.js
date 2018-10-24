const express = require("express");
const router = express.Router();
const passport = require("passport");

// Lad Dashboard model
const Dashboard = require("../../models/Dashboard");
// Load Company model
const Company = require("../../models/Company");

// @route   GET /api/dashboard/:id
// @desc    Get dashboard by given id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    Dashboard.findById(req.params.id)
      .then(dashboard => {
        dashboard.__v = undefined;
        res.json(dashboard);
      })
      .catch(err =>
        res
          .status(404)
          .json({ nodashboardfound: "No dashboard found with that ID" })
      );
  }
);

// @route   GET /api/dashboard
// @desc    Get all dashboard
// @access  Public --- TODO: Make private
router.get("/", (req, res) => {
  Dashboard.find().then(dashboards => res.json(dashboards));
});

// @route   POST api/dashboard/add
// @desc    Create a dashboard
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    const { errors, isValid } = validateDashboardInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    req.body.name = req.body.name
      .toLowerCase()
      .split(" ")
      .map(x => x.charAt(0).toUpperCase() + x.substring(1))
      .join(" ");
    req.body.handle = req.body.handle.toLowerCase();

    Dashboard.findOne({
      name: req.body.name
    }).then(dashboard => {
      if (dashboard) {
        errors.name = "Name already exists";
      }
      Dashboard.findOne({
        handle: req.body.handle
      }).then(dashboard => {
        if (dashboard) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          // Check for company !!
          const newDashboard = new Dashboard({
            company: req.body.company,
            name: req.body.name,
            handle: req.body.handle,
            content: req.body.content
          });

          newDashboard.save().then(dashboard => res.json(dashboard));
        }
      });
    });
  }
);

// @route   DELETE api/dashboard/remove/:id
// @desc    Remove a dashboard
// @access  Public --- TODO: Make private
router.delete("/remove/:id", (req, res) => {
  Dashboard.findById(req.params.id)
    .then(dashboard =>
      dashboard.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/dashboard/update/:id
// @desc    Update a dashboard
// @access  Private
//
//  TODO:
//  Update function for dashboard
//  What updates:   content
//  Needed params:  dashboardId & dashboardContent
//  Possibilty:     Change the company?
//

module.exports = router;
