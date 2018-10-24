import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TitleBarDropdown extends Component {
  onLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <ul className="subnav">
        <li>
          <i className="material-icons">person_add</i>
        </li>
        <li onClick={this.onLogoutClick}>
          <i className="material-icons">power_settings_new</i>
        </li>
      </ul>
    );
  }
}

TitleBarDropdown.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(TitleBarDropdown);
