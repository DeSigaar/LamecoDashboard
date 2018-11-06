const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordInput(data) {
  let errors = {};

  // Check for anything wrong with the passwords
  if (Validator.isEmpty(data.newPassword1)) {
    errors.newPassword1 = "Password field is required";
  } else if (
    !Validator.isLength(data.newPassword1, {
      min: 6,
      max: 30
    })
  ) {
    errors.newPassword1 = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = "Confirm password field is required";
  }

  if (!Validator.equals(data.newPassword1, data.newPassword2)) {
    errors.newPassword2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
