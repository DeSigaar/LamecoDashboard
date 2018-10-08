const express = require("express");
const router = express.Router();

// Load Company model
const Company = require("../../models/Company");

// @route   GET api/company/test
// @desc    Tests company route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Company works"
  })
);

// @route   GET api/company
// @desc    Get all companies
// @access  Public --- TODO: Make private
router.get("/", (req, res) => {
  Company.find().then(companies => res.json(companies));
});

// @route   POST api/company/add
// @desc    Create a company
// @access  Public --- TODO: Make private
router.post("/add", (req, res) => {
  const newCompany = new Company({
    name: req.body.name
  });

  newCompany.save().then(company => res.json(company));
});

// @route   DELETE api/company/remove/:id
// @desc    Remove a company
// @access  Public --- TODO: Make private
router.delete("/remove/:id", (req, res) => {
  Company.findById(req.params.id)
    .then(company => company.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

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
