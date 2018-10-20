const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const Validator = require("validator");
const isEmpty = require("../../validation/is-empty");

// Load input validation
const validateLoginInput = require("../../validation/login");
const validateUserInput = require("../../validation/user");

// Load User model
const User = require("../../models/User");

// @route   GET /api/user/current
// @desc    Get current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      username: req.user.username,
      name: req.user.name,
      avatar: req.user.avatar,
      admin_role: req.user.admin_role
    });
  }
);

// @route   GET /api/user/:id
// @desc    Get user by given id
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

    User.findById(req.params.id)
      .then(user => {
        user.password = undefined;
        user.__v = undefined;
        res.json(user);
      })
      .catch(err =>
        res.status(404).json({ nouserfound: "No user found with that ID" })
      );
  }
);

// @route   GET /api/user/all
// @desc    Get all users
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }
    User.find().then(users => {
      users.forEach(user => {
        user.password = undefined;
        user.__v = undefined;
      });
      res.json(users);
    });
  }
);

// @route   POST /api/user/register
// @desc    Register user
// @access  Private
router.post(
  "/register",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    const { errors, isValid } = validateUserInput(req.body);

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
      }
      User.findOne({
        username: req.body.username
      }).then(user => {
        if (user) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
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
    });
  }
);

// @route   POST /api/user/update/:id
// @desc    Update user with given id
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.admin_role === false && req.user.id !== req.params.id) {
      return res.status(401).json({ authorized: false });
    }

    const { errors, isValid } = validateUserInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userFields = {};
    userFields.user = req.params.id;
    if (req.body.email) userFields.email = req.body.email.toLowerCase();
    if (req.body.username)
      userFields.username = req.body.username.toLowerCase();
    if (req.body.name) userFields.name = req.body.name;
    if (req.body.password) userFields.password = req.body.password;

    User.findOne({
      email: userFields.email
    }).then(user => {
      if (user && user.id !== userFields.user) {
        errors.email = "Email already exists";
      }

      User.findOne({
        username: userFields.username
      }).then(user => {
        if (user && user.id !== userFields.user) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          userFields.avatar = gravatar.url(userFields.email, {
            s: "200", // Size
            r: "pg", // Rating
            d: "mm" // Default
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userFields.password, salt, (err, hash) => {
              if (err) throw err;
              userFields.password = hash;

              // Update
              User.findOneAndUpdate(
                { _id: userFields.user },
                { $set: userFields },
                { new: true }
              ).then(user => res.json(user));
            });
          });
        }
      });
    });
  }
);

// @route   POST /api/user/login
// @desc    Login user and return JWT token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const info = req.body.info.toLowerCase();
  const password = req.body.password;

  if (Validator.isEmail(info)) {
    const email = info;
    // Find user by email given
    User.findOne({
      email
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

          if (req.body.remember_me === true) {
            // Sign token
            jwt.sign(payload, keys.secretOrKey, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          } else {
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 36000
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          }
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  } else {
    const username = info;
    // Find user by username given
    User.findOne({
      username
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

          if (req.body.remember_me === true) {
            // Sign token
            jwt.sign(payload, keys.secretOrKey, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          } else {
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 36000
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          }
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
});

// @route   DELETE /api/user/remove/:id
// @desc    Remove user with given id
// @access  Private
router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    User.findById(req.params.id)
      .then(user => {
        user.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ usernotfound: "User not found with that ID" })
      );
  }
);

module.exports = router;
