const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Company Schema
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Company = mongoose.model("company", CompanySchema);
