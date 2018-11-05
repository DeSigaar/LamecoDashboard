const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load input validation
const validateDashboardInput = require("../../validation/dashboard");

// Lad Dashboard model
const Dashboard = require("../../models/Dashboard");

// @route   GET /api/dashboard/all
// @desc    Get all dashboards
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    Dashboard.find().then(dashboards => res.json(dashboards));
  }
);

// @route   POST /api/dashboard/add
// @desc    Create a dashboard
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    const dashboardFields = {};
    dashboardFields.name = req.body.name
      .toLowerCase()
      .split(" ")
      .map(x => x.charAt(0).toUpperCase() + x.substring(1))
      .join(" ");
    dashboardFields.handle = req.body.handle
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
    dashboardFields.company = req.body.company;

    const { errors, isValid } = validateDashboardInput(dashboardFields);

    // Check if data is valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find dashboard in database with name
    Dashboard.findOne({
      name: dashboardFields.name
    }).then(dashboard => {
      if (dashboard) {
        errors.name = "Name already exists";
      }

      // Find dashboard in database with handle
      Dashboard.findOne({
        handle: dashboardFields.handle
      }).then(dashboard => {
        if (dashboard) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          // Create new dashboard
          const newDashboard = new Dashboard({
            company: dashboardFields.company,
            name: dashboardFields.name,
            handle: dashboardFields.handle,
            content: ""
          });

          // Save dashboard to database
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    // Find dashboard in database by given ID
    Dashboard.findById(req.params.id)
      .then(dashboard => {
        dashboard.__v = undefined;
        res.json(dashboard);
      })
      .catch(err =>
        res
          .status(404)
          .json({ dashboard_not_found: "No dashboard found with that ID" })
      );
  }
);

// @route   POST /api/dashboard/update/layout/:handle
// @desc    Update dashboard layout by given handle
// @access  Private
router.post(
  "/update/layout/:handle",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    const handle = req.params.handle;
    const dashboardFields = {};
    dashboardFields.content = req.body.content;

    // Update dashboard in database
    Dashboard.findOneAndUpdate(
      { handle },
      { $set: dashboardFields },
      { new: true }
    ).then(dashboard => res.json(dashboard));
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

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

    const { errors, isValid } = validateDashboardInput(dashboardFields);

    // Check if data is valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find dashboard in database by given ID
    Dashboard.findOne({ name: dashboardFields.name }).then(dashboard => {
      if (dashboard && dashboard.id !== dashboardFields.dashboard) {
        errors.name = "Name already exists";
      }
      // Find dashboard in database with handle
      Dashboard.findOne({
        handle: dashboardFields.handle
      }).then(dashboard => {
        if (dashboard && dashboard.id !== dashboardFields.dashboard) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          // Update dashboard in database
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    // Find dashboard in database wit given ID
    Dashboard.findById(req.params.id)
      .then(dashboard => {
        // Remove dashboard from database
        dashboard.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res
          .status(404)
          .json({ dashboard_not_found: "Dashboard not found with that ID" })
      );
  }
);

module.exports = router;
