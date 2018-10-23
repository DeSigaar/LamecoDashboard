const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Forgot Schema
const ForgotSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

module.exports = Forgot = mongoose.model("forgot", ForgotSchema);
