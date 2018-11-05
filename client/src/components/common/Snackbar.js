import PropTypes from "prop-types";
import React, { Component } from "react";

class Snackbar extends Component {
  toggleSnackbar() {
    if (this.props.toggle) {
      setTimeout(() => {
        this.props.toggle = false;
      }, 3000);
    } else {
      this.props.toggle = true;
    }
  }

  render() {
    console.log(this.props);
    let snackbar = null;
    return { snackbar };
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
