import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TitleBar from "../bars/TitleBar";
import TextFieldGroup from "../common/TextField";
import { getCurrentProfile, updateProfile } from "../../actions/authActions";

class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();

    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      username: this.props.user.username
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      id: this.props.user._id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      username: this.state.username
    };

    this.props.updateProfile(profileData, this.props.history);
    alert("Profile updated 😂😂😂😂");
  };
  render() {
    const { errors } = this.state;
    const { user } = this.props;
    return (
      <div className="adminProfile">
        <TitleBar />
        <div className="mainContainer">
          {/* Back button */}
          <div
            className="backButton"
            onClick={() => this.props.history.push("/")}
          >
            <button className="btn icon red">
              <i className="material-icons">arrow_back</i>
              <span>Back</span>
            </button>
          </div>
          <div className="profileForm">
            <div className="adminInfo">
              <div className="imageBox">
                <img className="profileImg" src={user.avatar} alt="" />
              </div>
              <div className="info">
                <h6>{user.username}</h6>
              </div>
            </div>
            <form onSubmit={this.onSubmit} className="adminForm">
              <div className="inputFields">
                <div className="adminFormInfo">
                  <TextFieldGroup
                    placeholder="* Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="* Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="* Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    error={errors.username}
                  />
                </div>
                <div className="adminFormPassword">
                  <h6>Change Password</h6>
                  <TextFieldGroup
                    placeholder="* Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="* Password repeat"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                </div>
              </div>
              <button type="submit" className="btn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AdminProfile.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateProfile }
)(AdminProfile);
