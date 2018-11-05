import React from "react";
import PropTypes from "prop-types";

const Snackbar = ({ text }) => {
  return <div className="snackbar">{text}</div>;
};

Snackbar.propTypes = {
  text: PropTypes.string.isRequired
};

export default Snackbar;
