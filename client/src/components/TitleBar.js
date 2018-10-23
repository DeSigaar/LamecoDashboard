import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class TitleBar extends Component {
  onLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="titleBar shadow1">
        <h1 onClick={this.onLogoutClick} style={{ cursor: "pointer" }}>
          Laméco
        </h1>
        <ul className="contentRight">
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/AdminProfile">Profile</Link>
          </li>
          <li>
            <Link to="/DashboardEdit">dots</Link>
          </li>
        </ul>
      </div>
    );
  }
}

TitleBar.propTypes = {
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
)(TitleBar);
