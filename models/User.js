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
    required: true,
    min: 6,
    max: 30
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 30
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
  // Admin role used for admins and customers [UNUSED]
  // admin_role: {
  //   type: Boolean,
  //   required: true,
  //   default: false
  // }
});

module.exports = User = mongoose.model("user", UserSchema);
