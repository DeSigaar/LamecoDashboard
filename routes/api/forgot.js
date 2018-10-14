const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

// Load input validation
const validateForgotInput = require("../../validation/forgot");
const validatePasswordInput = require("../../validation/forgotpassword");

// Load Forgot model
const Forgot = require("../../models/Forgot");
const User = require("../../models/User");

// @route   POST api/forgot/request
// @desc    Creates a request link and sends email
// @access  Public
router.post("/request", (req, res) => {
  const { errors, isValid } = validateForgotInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const time = req.body.time;

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    Forgot.findOne({ email }).then(forgot => {
      if (forgot) {
        Forgot.findOneAndRemove({ email }).then(forgot => {
          forgot.remove();
        });
      }
    });

    // Remove any current forgot requests

    var key = "";
    const possible =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-.";
    for (let i = 0; i < 40; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    // See if new key is unique - we'll try 2 more times
    Forgot.findOne({
      key
    }).then(forgot => {
      if (forgot) {
        for (let i = 0; i < 40; i++) {
          key += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        Forgot.findOne({
          key
        }).then(forgot => {
          if (forgot) {
            for (let i = 0; i < 40; i++) {
              key += possible.charAt(
                Math.floor(Math.random() * possible.length)
              );
            }
          }
        });
      }
    });

    let transporter = nodemailer.createTransport({
      host: "smtp02.hostnet.nl",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: require("../../config/keys").mailAccountUsername,
        pass: require("../../config/keys").mailAccountPassword
      }
    });

    let mailOptions = {
      from: '"Laméco Dashboard" <lamecodashboard@maxaltena.com>',
      to: email,
      subject: "Laméco Dashboard - Reset password request",
      text: `We heard that you lost your Laméco Dashboard password. Sorry about that!\nBut don't worry! You can use the following link to reset your password:\nhttps://lameco-dashboard.herokuapp.com/password-reset/${key}\nIf you don't use this link within 3 hours, it will expire.\nTo get a new password reset link, visit https://lameco-dashboard.herokuapp.com/forgot-password\nThanks,\nLaméco Dashboard`,
      html: `<p>We heard that you lost your <b>Laméco Dashboard</b> password. Sorry about that!</p><p>But don't worry! You can use the following link to reset your password:</p><p>https://lameco-dashboard.herokuapp.com/password-reset/${key}</p><p>If you don't use this link within <b>3 hours</b>, it will expire.</p><p>To get a new password reset link, visit https://lameco-dashboard.herokuapp.com/forgot-password</p><p>Thanks,</p><p>Laméco Dashboard</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });

    const newRequest = new Forgot({ email, key, time });
    newRequest
      .save()
      .then(forgot => res.json(forgot))
      .catch(err => console.log(err));
  });
});

// @route   GET api/forgot/email/:key
// @desc    Get email by key
// @access  Public
router.get("/email/:key", (req, res) => {
  Forgot.findOne({ key: req.params.key })
    .then(forgot => {
      forgot.__v = undefined;
      res.json(forgot);
    })
    .catch(err => res.status(404));
});

// @route   POST api/forgot/update
// @desc    Update password and remove request
// @access  Public
router.post("/update", (req, res) => {
  const { errors, isValid } = validatePasswordInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Update password
  User.findOne({
    email: req.body.email
  }).then(user => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.newPassword1, salt, (err, hash) => {
        if (err) throw err;
        // Update
        user.password = hash;
        user.save();
      });
    });
  });

  // Remove the request
  Forgot.findOneAndRemove({ email: req.body.email }).then(forgot => {
    forgot.remove();
  });

  res.json({ success: true });
});

// @route   DELETE api/forgot/remove/:key
// @desc    Remove request with given key
// @access  Public
router.delete("/remove/:key", (req, res) => {
  Forgot.findOne({ key: req.params.key })
    .then(forgot => {
      forgot.remove().then(() => res.json({ success: true }));
    })
    .catch(err =>
      res
        .status(404)
        .json({ requestnotfound: "Request not found with that key" })
    );
});

module.exports = router;
