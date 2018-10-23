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

// @route   POST /api/forgot/request
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
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
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
      host: require("../../config/keys").mailHost,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: require("../../config/keys").mailAccountUsername,
        pass: require("../../config/keys").mailAccountPassword
      }
    });

    let mailOptions = {
      from: `"Laméco Dashboard" <${
        require("../../config/keys").mailAccountUsername
      }>`,
      to: email,
      subject: `Laméco Dashboard - Reset password request for ${email}`,
      text: `Trouble signing in?\nWe heard that you lost your Laméco Dashboard password. Sorry about that!\nBut don't worry! You can use the following link to reset your password:\nhttps://lameco-dashboard.herokuapp.com/password-reset/${key}\nIf you don't use this link within 3 hours, it will expire.\nTo get a new password reset link, visit https://lameco-dashboard.herokuapp.com/forgot-password\nCheers,\nThe Laméco Dashboard Team`,
      html: `<!DOCTYPE html><html><head><title>Laméco Dashboard - Reset password request for ${email}</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"/><style type="text/css"> @media screen{@font-face{font-family: 'Montserrat'; font-style: normal; font-weight: 400; src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2) format('woff2');}@font-face{font-family: 'Montserrat'; font-style: normal; font-weight: 700; src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2) format('woff2');}}body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}a[x-apple-data-detectors]{color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important;}@media screen and (max-width:600px){h1{font-size: 32px !important; line-height: 32px !important;}}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style></head><body style="background-color: #F4F5F5; margin: 0 !important; padding: 0 !important;"><div style="display: none; font-size: 1px; color: #FEFEFE; line-height: 1px; font-family: 'Montserrat', Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We heard that you lost your Laméco Dashboard password. Sorry about that!</div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#CF1F3E" align="center"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> <a href="https://lameco-dashboard.herokuapp.com/" target="_blank"> <img alt="Logo" src="https://www.lameco.nl/favicon.ico?v1" width="40" height="40" style="display: block; width: 40px; max-width: 40px; min-width: 40px; font-family: 'Montserrat', Arial, sans-serif; color: #FFFFFF; font-size: 18px;" border="0"> </a> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#CF1F3E" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#FFFFFF" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Montserrat', Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 2px; line-height: 48px;"> <h1 style="font-size: 48px; font-weight: 400; margin: 0;">Trouble signing in?</h1> </td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#F4F5F5" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#FFFFFF" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">We heard that you lost your <b>Laméco Dashboard</b> password. Sorry about that!</p><p style="margin:0;">But don't worry! Just press the button below and get yourself set back up.</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td bgcolor="#FFFFFF" align="center" style="padding: 20px 30px 60px 30px;"> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="border-radius: 30px;" bgcolor="#CF1F3E"><a href="https://lameco-dashboard.herokuapp.com/password-reset/${key}" target="_blank" style="font-size: 20px; font-family: Arial, sans-serif; color: #FFFFFF; text-decoration: none; padding: 15px 25px; border-radius: 30px; border: 1px solid #CF1F3E; display: inline-block;">Reset Password</a></td></tr></table> </td></tr></table> </td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;"><a href="https://lameco-dashboard.herokuapp.com/password-reset/${key}" target="_blank" style="color: #CF1F3E;">https://lameco-dashboard.herokuapp.com/password-reset/${key}</a></p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">If you don't use this link to reset your password within <b>3 hours</b>, it will expire. To get a new password reset link, visit:</p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;"><a href="https://lameco-dashboard.herokuapp.com/forgot-password" target="_blank" style="color: #CF1F3E;">https://lameco-dashboard.herokuapp.com/forgot-password</a></p></td></tr><tr> <td bgcolor="#FFFFFF" align="left" style="padding: 20px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" > <p style="margin: 0;">Cheers,<br>The Laméco Dashboard Team</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr><tr> <td bgcolor="#F4F5F5" align="center" style="padding: 0px 10px 0px 10px;"><!--[if (gte mso 9)|(IE)]> <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"> <tr> <td align="center" valign="top" width="600"><![endif]--> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" > <tr> <td bgcolor="#F4F5F5" align="left" style="padding: 30px 30px 10px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" > <p style="margin: 0;">You received this email because you requested a password reset.</p></td></tr><tr> <td bgcolor="#F4F5F5" align="left" style="padding: 10px 30px 30px 30px; color: #666666; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" > <p style="margin: 0;">Not ${email}? No need to do anything!</p></td></tr></table><!--[if (gte mso 9)|(IE)]> </td></tr></table><![endif]--> </td></tr></table> </body></html>`
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

// @route   GET /api/forgot/info/:key
// @desc    Get email by key
// @access  Public
router.get("/info/:key", (req, res) => {
  Forgot.findOne({ key: req.params.key })
    .then(forgot => {
      forgot.__v = undefined;
      res.json(forgot);
    })
    .catch(err => res.status(404));
});

// @route   POST /api/forgot/update
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

// @route   DELETE /api/forgot/remove/:key
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

// @route   GET /api/forgot/:key
// @desc    See if key exists and return bool
// @access  Public
router.get("/:key", (req, res) => {
  Forgot.findOne({ key: req.params.key })
    .then(forgot => {
      if (forgot) {
        res.json(true);
      } else {
        res.json(false);
      }
    })
    .catch(err => res.status(404));
});

module.exports = router;
