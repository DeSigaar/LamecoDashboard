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
const validateCompanyInput = require("../../validation/company");

// Load Company model
const Company = require("../../models/Company");

// @route   GET api/company/all
// @desc    Get all companies
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Company.find().then(companies => res.json(companies));
  }
);

// @route   POST api/company/add
// @desc    Create a company
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const newCompany = new Company({
      name: req.body.name
    });

    newCompany.save().then(company => res.json(company));
  }
);

// @route   DELETE api/company/remove/:id
// @desc    Remove a company
// @access  Make private
router.delete(
  "/remove/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    Company.findById(req.params.id)
      .then(company => company.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  }
);

// @route   POST api/company/update/:id
// @desc    Update a company
// @access  Private

//
//  TODO:
//  Update function for company
//  What updates:   name
//  Needed params:  companyId & companyName
//

module.exports = router;
