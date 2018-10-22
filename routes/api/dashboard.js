const express = require("express");
const router = express.Router();
const passport = require("passport");

// Lad Dashboard model
const Dashboard = require("../../models/Dashboard");
// Load Company model
const Company = require("../../models/Company");

// @route   GET api/dashboard/test
// @desc    Tests dashboard route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Dashboard works"
  })
);

// @route   GET api/dashboard
// @desc    Get all dashboard
// @access  Public --- TODO: Make private
router.get("/", (req, res) => {
  Dashboard.find().then(dashboards => res.json(dashboards));
});

// @route   POST api/dashboard/add
// @desc    Create a dashboard
// @access  Public --- TODO: Make private
router.post("/add", (req, res) => {
  const newDashboard = new Dashboard({
    company: req.body.company,
    name: req.body.name,
    handle: req.body.handle,
    content: req.body.content
  });

  newDashboard.save().then(dashboard => res.json(dashboard));
});

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

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle.toLowerCase();
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//
//  TODO:
//  Update function for dashboard
//  What updates:   content
//  Needed params:  dashboardId & dashboardContent
//  Possibilty:     Change the company?
//

module.exports = router;
