import React from "react";
import PropTypes from "prop-types";

const LoginError = ({ error }) => {
  return <div className="loginError">{error}</div>;
};

LoginError.propTypes = {
  error: PropTypes.string.isRequired
};

export default LoginError;
