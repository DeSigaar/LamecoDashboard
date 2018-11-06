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

    const { name, email, username } = this.props.user;

    this.setState({ name, email, username });
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

    const { name, email, password, password2, username } = this.state;

    const profileData = {
      id: this.props.user._id,
      name,
      email,
      password,
      password2,
      username
    };

    this.props.updateProfile(profileData, this.props.history);
    alert("Profile updated 😂😂😂😂");
  };
  render() {
    const { errors, email, name, username, password, password2 } = this.state;
    const { user, history } = this.props;
    return (
      <div className="adminProfile">
        <TitleBar />
        <div className="profileContainer">
          {/* Back button */}
          <div className="backButton" onClick={() => history.push("/")}>
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
                <h2>{user.name}</h2>
                <h5>{user.email}</h5>
              </div>
            </div>
            <form onSubmit={this.onSubmit} className="adminForm">
              <div className="inputFields">
                <div className="adminFormInfo">
                  <TextFieldGroup
                    placeholder="* Name"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="* Email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="* Username"
                    name="username"
                    value={username}
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
                    value={password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="* Password repeat"
                    name="password2"
                    type="password"
                    value={password2}
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
