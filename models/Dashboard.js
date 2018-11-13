const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Dashboard Schema
const DashboardSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: true
  },
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
  },
  content: {
    type: String
  }
});

module.exports = Dashboard = mongoose.model("dashboard", DashboardSchema);
