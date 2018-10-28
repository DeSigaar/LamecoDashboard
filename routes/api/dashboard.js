const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load input validation
const validateDashboardInput = require("../../validation/dashboard");

// Lad Dashboard model
const Dashboard = require("../../models/Dashboard");
// Load Company model
const Company = require("../../models/Company");

// @route   GET /api/dashboard/all
// @desc    Get all dashboards
// @access  Public
router.get("/all", (req, res) => {
  Dashboard.find().then(dashboards => res.json(dashboards));
});

// @route   POST /api/dashboard/add
// @desc    Create a dashboard
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    req.body.name = req.body.name
      .toLowerCase()
      .split(" ")
      .map(x => x.charAt(0).toUpperCase() + x.substring(1))
      .join(" ");
    req.body.handle = req.body.handle
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const { errors, isValid } = validateDashboardInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

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
          const newDashboard = new Dashboard({
            company: req.body.company,
            name: req.body.name,
            handle: req.body.handle,
            content: ""
          });

          newDashboard.save().then(dashboard => res.json(dashboard));
        }
      });
    });
  }
);

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

// @route   POST /api/dashboard/update/:id
// @desc    Update dashboard with given id
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    const dashboardFields = {};
    dashboardFields.dashboard = req.params.id;
    dashboardFields.company = req.body.company;
    if (req.body.name)
      dashboardFields.name = req.body.name
        .toLowerCase()
        .split(" ")
        .map(x => x.charAt(0).toUpperCase() + x.substring(1))
        .join(" ");
    if (req.body.handle)
      dashboardFields.handle = req.body.handle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
    if (req.body.content) dashboardFields.content = req.body.content;
    // Content check?

    const { errors, isValid } = validateDashboardInput(dashboardFields);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Dashboard.findById(dashboardFields.dashboard).then(dashboard => {
      if (dashboard && dashboard.id !== dashboardFields.dashboard) {
        errors.name = "Name already exists";
      }
      Dashboard.findOne({
        handle: dashboardFields.handle
      }).then(dashboard => {
        if (dashboard && dashboard.id !== dashboardFields.dashboard) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          Dashboard.findOneAndUpdate(
            { _id: dashboardFields.dashboard },
            { $set: dashboardFields },
            { new: true }
          ).then(dashboard => res.json(dashboard));
        }
      });
    });
  }
);

// @route   DELETE /api/dashboard/remove/:id
// @desc    Remove dashboard with given id
// @access  Private
router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    Dashboard.findById(req.params.id)
      .then(dashboard => {
        dashboard.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res
          .status(404)
          .json({ dashboardnotfound: "Dashboard not found with that ID" })
      );
  }
);

module.exports = router;
