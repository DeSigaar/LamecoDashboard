import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TitleBar from "../bars/TitleBar";
import TextFieldGroup from "../common/TextField";
import { getCurrentProfile, addUser } from "../../actions/authActions";

class UpdateProfile extends Component {
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

    this.props.addUser(profileData, this.props.history);
    alert("User created??");
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="updateProfile">
        <TitleBar />
        <div className="profileContainer">
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
            <form onSubmit={this.onSubmit} className="adminForm">
              <div className="inputFields">
                <div className="adminFormInfo">
                  <h6>Register</h6>
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
                  <h6>Password</h6>
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

UpdateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, addUser }
)(UpdateProfile);
