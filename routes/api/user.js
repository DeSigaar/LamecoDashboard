const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

// Load User model
const User = require("../../models/User");

// @route   GET api/user/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "User works"
  })
);

// @route   POST api/user/register
// @desc    Register user
// @access  Public --- TODO: Should become private once we have accounts
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  req.body.email = req.body.email.toLowerCase();
  req.body.username = req.body.username.toLowerCase();

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      User.findOne({
        username: req.body.username
      }).then(user => {
        if (user) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: "200", // Size
            r: "pg", // Rating
            d: "mm" // Default
          });

          const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            avatar,
            admin_role: req.body.admin_role
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
});

// @route   POST api/user/login
// @desc    Login User / Returning JWT token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const info = req.body.info.toLowerCase();
  const password = req.body.password;

  let email;

  if (Validator.isEmail(info)) {
    email = info;
  }
  // Find user by info given
  User.findOne({
    info
  }).then(user => {
    // Check for user
    if (!user) {
      errors.info = "User not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          admin_role: user.admin_role
        }; // Create JWT payload

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 36000 // Time before token expires in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
