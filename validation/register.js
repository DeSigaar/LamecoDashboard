const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Check for anything wrong with the email
  data.email = !isEmpty(data.email) ? data.email : "";
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Check for anything wrong with the username
  data.username = !isEmpty(data.username) ? data.username : "";
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (/\s/.test(data.username)) {
    errors.username = "Username has whitespace which is not allowed";
  } else if (
    !Validator.isLength(data.username, {
      min: 6,
      max: 30
    })
  ) {
    errors.username = "Username must be between 6 and 30 characters";
  }

  // Check for anything wrong with the password
  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  // Check for anything wrong with the confirmation password
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  // Check if password and confirmation password are the same
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Check for anything wrong with the name
  data.name = !isEmpty(data.name) ? data.name : "";
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Check for anything wrong with the handle
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  } else if (
    !Validator.isLength(data.handle, {
      min: 6,
      max: 30
    })
  ) {
    errors.handle = "Handle must be between 6 and 30 characters";
  }

  // Check for anything wrong with the admin_role
  data.admin_role = !isEmpty(data.admin_role) ? data.admin_role : "";
  if (Validator.isEmpty(data.admin_role)) {
    errors.admin_role = "Role field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
