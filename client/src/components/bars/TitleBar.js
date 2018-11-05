import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TitleBarDropdown from "./TitleBarDropdown";
import { connect } from "react-redux";

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownToggle: false
    };
  }

  onDropdownToggle = () => {
    this.setState({ dropdownToggle: !this.state.dropdownToggle });
  };

  render() {
    const avatarUrl = `https:${this.props.auth.user.avatar}`;
    let titleBarDropdown;
    if (this.state.dropdownToggle) {
      titleBarDropdown = <TitleBarDropdown />;
    }
    return (
      <div className="titleBar">
        <h1>
          <Link to="/">Laméco</Link>
        </h1>
        <ul className="contentRight">
          {/* <li>
            <Link to="/search">
              <i className="material-icons">search</i>
            </Link>
          </li> */}
          <li>
            <Link to="/profile">
              <img
                className="profilePicture"
                alt="Gravatar profile"
                src={avatarUrl}
              />
            </Link>
          </li>
          <li onClick={this.onDropdownToggle}>
            <i className="material-icons">more_vert</i>
            {titleBarDropdown}
          </li>
        </ul>
      </div>
    );
  }
}

TitleBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TitleBar);
