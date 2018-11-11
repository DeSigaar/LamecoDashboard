import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class TitleBarDropdown extends Component {
  onLogoutClick = () => {
    const { logoutUser } = this.props;

    logoutUser();
  };

  render() {
    return (
      <ul className="subnav">
        <li>
          <Link to="/add-user">
            <i className="material-icons white-icon">person_add</i>
          </Link>
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
