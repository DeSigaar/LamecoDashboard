import PropTypes from "prop-types";
import React, { Component } from "react";

class Snackbar extends Component {
  render() {
    return <div className="snackbar">{this.props.text}</div>;
  }
}
Snackbar.propTypes = {
  text: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  toggle: PropTypes.bool
};

Snackbar.defaultProps = {
  timeout: 4000,
  toggle: false
};

export default Snackbar;
