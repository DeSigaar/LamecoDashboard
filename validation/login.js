const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Check for anything wrong with the info given
  data.info = !isEmpty(data.info) ? data.info : "";
  if (Validator.isEmpty(data.info)) {
    errors.info = "Email or username field is required";
  }

  // Check for anything wrong with the password
  data.password = !isEmpty(data.password) ? data.password : "";
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Check for anything wrong with the remember_me
  data.remember_me = !isEmpty(data.remember_me) ? data.remember_me : false;

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
