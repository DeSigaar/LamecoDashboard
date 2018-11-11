import React from "react";
import PropTypes from "prop-types";

const Snackbar = ({ text }) => {
  return <div className="snackbar">{text}</div>;
};

Snackbar.propTypes = {
  text: PropTypes.string.isRequired
  // timeout: PropTypes.number,
  // toggle: PropTypes.bool
};

// Snackbar.defaultProps = {
//   timeout: 4000,
//   toggle: false
// };

export default Snackbar;
