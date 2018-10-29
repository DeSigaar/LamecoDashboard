const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

// Load input validation
const validateCompanyInput = require("../../validation/company");

// Load Company model
const Company = require("../../models/Company");

// @route   GET /api/company/all
// @desc    Get all companies
// @access  Public
router.get("/all", (req, res) => {
  Company.find().then(companies => res.json(companies));
});

// @route   POST /api/company/add
// @desc    Create a company
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

    const { errors, isValid } = validateCompanyInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Company.findOne({
      name: req.body.name
    }).then(company => {
      if (company) {
        errors.name = "Name already exists";
      }
      Company.findOne({
        handle: req.body.handle
      }).then(company => {
        if (company) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          const newCompany = new Company({
            name: req.body.name,
            handle: req.body.handle
          });

          newCompany.save().then(company => res.json(company));
        }
      });
    });
  }
);

// @route   GET /api/company/:id
// @desc    Get company by given id
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

    Company.findById(req.params.id)
      .then(company => {
        company.__v = undefined;
        res.json(company);
      })
      .catch(err =>
        res
          .status(404)
          .json({ nocompanyfound: "No company found with that ID" })
      );
  }
);

// @route   POST /api/company/update/:id
// @desc    Update company with given id
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

    const companyFields = {};
    companyFields.company = req.params.id;
    if (req.body.name) {
      companyFields.name = req.body.name
        .toLowerCase()
        .split(" ")
        .map(x => x.charAt(0).toUpperCase() + x.substring(1))
        .join(" ");
    }
    if (req.body.handle) {
      companyFields.handle = req.body.handle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
    }

    const { errors, isValid } = validateCompanyInput(companyFields);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Company.findOne({
      name: companyFields.name
    }).then(company => {
      if (company && company.id !== companyFields.company) {
        errors.name = "Name already exists";
      }
      Company.findOne({
        handle: companyFields.handle
      }).then(company => {
        if (company && company.id !== companyFields.company) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        } else if (!isEmpty(errors)) {
          return res.status(400).json(errors);
        } else {
          Company.findOneAndUpdate(
            { _id: companyFields.company },
            { $set: companyFields },
            { new: true }
          ).then(company => res.json(company));
        }
      });
    });
  }
);

// @route   DELETE /api/company/remove/:id
// @desc    Remove company with given id
// @access  Private
router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.admin_role === false) {
      return res.status(401).json({ authorized: false });
    }

    Company.findById(req.params.id)
      .then(company => {
        company.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res
          .status(404)
          .json({ companynotfound: "Company not found with that ID" })
      );
  }
);

module.exports = router;
