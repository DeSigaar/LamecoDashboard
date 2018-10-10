const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCompanyInput(data) {
  let errors = {};

  // Check for anything wrong with the name
  data.name = !isEmpty(data.name) ? data.name : "";
  if (Validator.isEmpty(data.name)) {
    errors.name = "Username field is required";
  } else if (
    !Validator.isLength(data.name, {
      min: 6
    })
  ) {
    errors.name = "Name must be at least 6 characters";
  }

  // Check for anything wrong with the handle
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  } else if (
    !Validator.isLength(data.handle, {
      min: 3,
      max: 30
    })
  ) {
    errors.handle = "Handle must be between 6 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
