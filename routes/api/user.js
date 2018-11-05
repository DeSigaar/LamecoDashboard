const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const Validator = require("validator");
const nodemailer = require("nodemailer");
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
      _id: req.user.id,
      email: req.user.email,
      username: req.user.username,
      name: req.user.name,
      avatar: req.user.avatar
    });
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    // Get all users
    User.find().then(users => {
      users.forEach(user => {
        user.password = undefined;
        user.__v = undefined;
      });
      res.json(users);
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    // Get user by given ID
    User.findById(req.params.id)
      .then(user => {
        user.password = undefined;
        user.__v = undefined;
        res.json(user);
      })
      .catch(err =>
        res.status(404).json({ user_not_found: "No user found with that ID" })
      );
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    const userFields = {};
    userFields.email = req.body.email.toLowerCase();
    userFields.username = req.body.username.toLowerCase();
    userFields.name = req.body.name;
    userFields.password = req.body.password;
    userFields.password2 = req.body.password2;

    const { errors, isValid } = validateUserInput(userFields);

    // Check if data is valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find user in database with email
    User.findOne({
      email: userFields.email
    }).then(user => {
      if (user) {
        errors.email = "Email already exists";
      }

      // Find user in database with username
      User.findOne({
        username: userFields.username
      }).then(user => {
        if (user) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          // Get gravatar from email
          const avatar = gravatar.url(userFields.email, {
            s: "200", // Size
            r: "pg", // Rating
            d: "mm" // Default
          });

          // Create new user
          const newUser = new User({
            email: userFields.email,
            username: userFields.username,
            password: userFields.password,
            name: userFields.name,
            avatar
          });

          // Prepare to send the email with data
          let transporter = nodemailer.createTransport({
            host: require("../../config/keys").mailHost,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: require("../../config/keys").mailAccountUsername,
              pass: require("../../config/keys").mailAccountPassword
            }
          });

          // Prepare email itself
          let mailOptions = {
            from: `"Laméco Dashboard" <${
              require("../../config/keys").mailAccountUsername
            }>`,
            to: newUser.email,
            subject: `Laméco Dashboard - Registration of ${newUser.email}`,
            text: `Welcome!\nWe're thrilled to have you here! Get ready to dive into your new account.\nEmail: ${
              newUser.email
            }\nUsername: ${newUser.username}\nPassword: ${
              newUser.password
            }\nTo log in to your new account visit:\nhttps://lameco-dashboard.herokuapp.com/login\nCheers,\nThe Laméco Dashboard Team`,
            html: `<!DOCTYPE html><html><head><title>Laméco Dashboard - Registration of ${
              newUser.email
            }</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"/><style type="text/css"> @media screen{@font-face{font-family: 'Montserrat'; font-style: normal; font-weight: 400; src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');}}body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}a[x-apple-data-detectors]{color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important;}@media screen and (max-width:600px){h1{font-size: 32px !important; line-height: 32px !important;}}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style></head><body style="background-color: #F4F5F5; margin: 0 !important; padding: 0 !important;"><div style="display: none; font-size: 1px; color: #FEFEFE; line-height: 1px; font-family: 'Montserrat', Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.</div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#CF1F3E" align="center"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> <a href="https://lameco-dashboard.herokuapp.com/" target="_blank"> <img alt="Logo" src="https://www.lameco.nl/favicon.ico?v1" width="40" height="40" style="display: block; width: 40px; max-width: 40px; min-width: 40px; font-family: 'Montserrat', Arial, sans-serif; color: #FFFFFF; font-size: 18px;" border="0"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#CF1F3E" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#FFFFFF" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Montserrat', Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"> <h1 style="font-size: 48px; font-weight: 400; margin: 0;">Welcome!</h1> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#F4F5F5" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#FFFFFF" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">We're thrilled to have you here! Get ready to dive into your new account.</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">Email: ${
              newUser.email
            }</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">Username: ${
              newUser.username
            }</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">Password: ${
              newUser.password
            }</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td bgcolor="#FFFFFF" align="center" style="padding: 0px 30px 30px 30px;"> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="border-radius: 30px;" bgcolor="#CF1F3E"><a href="https://lameco-dashboard.herokuapp.com/login" target="_blank" style="font-size: 20px; font-family: Arial, sans-serif; color: #FFFFFF; text-decoration: none; padding: 15px 25px; border-radius: 30px; border: 1px solid #CF1F3E; display: inline-block; background-color:#CF1F3E;">Log in</a></td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">To log in to your new account visit:</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;"><a href="https://lameco-dashboard.herokuapp.com/login" target="_blank" style="color: #CF1F3E;">https://lameco-dashboard.herokuapp.com/login</a></p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">Cheers,<br>The Laméco Dashboard Team</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#F4F5F5" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#F4F5F5" align="left" style="padding: 30px 30px 10px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" > <p style="margin: 0;">You received this email because you've got registered by an admin.</p></td></tr><tr> <td bgcolor="#F4F5F5" align="left" style="padding: 10px 30px 30px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" > <p style="margin: 0;">Not ${
              newUser.email
            } or ${
              newUser.name
            }? No need to do anything!</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
          };

          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
          });

          // Create hashed password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;

              // Save to database
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false && req.user.id !== req.params.id) {
    //   return res.status(401).json({ authorized: false });
    // }

    const userFields = {};
    userFields.id = req.params.id;
    if (req.body.email) userFields.email = req.body.email.toLowerCase();
    if (req.body.username)
      userFields.username = req.body.username.toLowerCase();
    if (req.body.name) userFields.name = req.body.name;
    if (req.body.password) userFields.password = req.body.password;

    var passwordChange = false;
    if (!isEmpty(req.body.password)) {
      passwordChange = true;
    }

    const { errors, isValid } = validateUserInput(userFields, passwordChange);

    // Check if data is valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find user in database with email
    User.findOne({
      email: userFields.email
    }).then(user => {
      if (user && user.id !== userFields.id) {
        errors.email = "Email already exists";
      }

      // Find user in database with username
      User.findOne({
        username: userFields.username
      }).then(user => {
        if (user && user.id !== userFields.id) {
          errors.username = "Username already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          // Get gravatar from email
          userFields.avatar = gravatar.url(userFields.email, {
            s: "200", // Size
            r: "pg", // Rating
            d: "mm" // Default
          });

          if (passwordChange) {
            // Create hashed password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(userFields.password, salt, (err, hash) => {
                if (err) throw err;
                userFields.password = hash;

                // Update user within database
                User.findOneAndUpdate(
                  { _id: userFields.id },
                  { $set: userFields },
                  { new: true }
                ).then(user => res.json(user));
              });
            });
          } else {
            // Update user within database
            User.findOneAndUpdate(
              { _id: userFields.id },
              { $set: userFields },
              { new: true }
            ).then(user => res.json(user));
          }
        }
      });
    });
  }
);

// @route   POST /api/user/login
// @desc    Login user and return JWT token
// @access  Public
router.post("/login", (req, res) => {
  const userFields = {};
  userFields.info = req.body.info.toLowerCase();
  userFields.password = req.body.password;
  userFields.remember_me = req.body.remember_me;

  const { errors, isValid } = validateLoginInput(userFields);

  // Check if data is valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if given info is an email or username
  if (Validator.isEmail(userFields.info)) {
    const email = userFields.info;

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
      bcrypt.compare(userFields.password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            avatar: user.avatar
          }; // Create JWT payload

          if (userFields.remember_me) {
            // Sign token without expiration
            jwt.sign(payload, keys.secretOrKey, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          } else {
            // Sign token with expiration
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
    const username = userFields.info;

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
      bcrypt.compare(userFields.password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            avatar: user.avatar
          }; // Create JWT payload

          if (userFields.remember_me) {
            // Sign token without expiration
            jwt.sign(payload, keys.secretOrKey, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          } else {
            // Sign token with expiration
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
    // Check if user requesting is admin [UNUSED]
    // if (req.user.admin_role === false) {
    //   return res.status(401).json({ authorized: false });
    // }

    // Get user by given ID
    User.findById(req.params.id)
      .then(user => {
        // Remove user from database
        user.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ user_not_found: "User not found with that ID" })
      );
  }
);

module.exports = router;
