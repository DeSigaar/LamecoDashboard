const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDashboardInput(data) {
  let errors = {};

  // Check for aynthing wrong with the companyId
  data.company = !isEmpty(data.company) ? data.company : "";
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  // Check for anything wrong with the name
  data.name = !isEmpty(data.name) ? data.name : "";
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
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
