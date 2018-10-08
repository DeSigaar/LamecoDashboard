const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Dashboard Schema
const DashboardSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    min: 2,
    max: 40
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = Dashboard = mongoose.model("dashboard", DashboardSchema);
