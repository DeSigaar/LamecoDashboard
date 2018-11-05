import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TitleBarDropdown extends Component {
  onLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <ul className="subnav">
        <li>
          <Link to="/add-user">
            {/* Eeeeek inline styling, sorry hiervoor het is bijna 5 uur*/}
            <i style={{ color: "#fff" }} className="material-icons">
              person_add
            </i>
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
