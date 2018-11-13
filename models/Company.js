const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Company Schema
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  handle: {
    type: String,
    required: true,
    min: 3,
    max: 30
  }
});

module.exports = Company = mongoose.model("company", CompanySchema);
