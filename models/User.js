const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  admin_role: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
