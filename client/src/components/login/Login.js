import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loginUser,
  forgotPassword,
  updateUserWithEmail
} from "../../actions/authActions";
import axios from "axios";
import LoginForm from "./LoginForm";
import ForgotForm from "./ForgotForm";
import ForgotFormSuccess from "./ForgotFormSuccess";
import PasswordReset from "./PasswordReset";
import PasswordResetSuccess from "./PasswordResetSuccess";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      password: "",
      remember_me: false,
      email: "",
      time: "",
      key: "",
      newPassword1: "",
      newPassword2: "",
      errors: {}
    };
  }

  componentWillMount() {
    if (
      this.props.history.location.pathname === "/sent-password-reset" &&
      this.state.email === "" &&
      this.state.time === ""
    ) {
      this.props.history.push("/login");
    }

    if (
      this.props.history.location.pathname === "/password-reset-success" &&
      this.state.email === ""
    ) {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (this.props.history.location.pathname.startsWith("/password-reset/")) {
      axios
        .get(`/api/forgot/email/${this.props.match.params.key}`)
        .then(res => {
          const currentTime = Date.now() / 1000;
          if (res.data.time < currentTime) {
            axios.delete(`/api/forgot/remove/${this.props.match.params.key}`);
            this.props.history.push("/login");
            this.setState({
              errors: { forgotpassword: "Password reset link has expired" }
            });
          } else {
            this.setState({
              key: this.props.match.params.key,
              email: res.data.email
            });
          }
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onForgot = e => {
    e.preventDefault();

    const location = this.props.history.location.pathname;
    if (
      location === "/forgot-password" ||
      location === "/sent-password-reset" ||
      location === "/password-reset-success"
    ) {
      this.props.history.push("/login");
      this.setState({ email: "", key: "" });
    } else if (location === "/login") {
      this.props.history.push("/forgot-password");
      this.setState({ info: "", password: "" });
    }
  };

  onTick = () => {
    this.setState({ remember_me: !this.state.remember_me });
  };

  onSubmitForgot = e => {
    e.preventDefault();

    const currentDate = new Date();
    let validDate = new Date(currentDate);
    let passTime = validDate;

    validDate.setHours(currentDate.getHours() + 3);
    validDate = validDate.getTime();

    passTime.setTime(validDate);

    this.setState({ time: passTime });

    this.props.forgotPassword(
      { email: this.state.email, time: validDate },
      this.props.history
    );
  };

  onSubmitPassword = e => {
    e.preventDefault();

    const resetData = {
      email: this.state.email,
      newPassword1: this.state.newPassword1,
      newPassword2: this.state.newPassword2
    };

    this.props.updateUserWithEmail(resetData, this.props.history);
  };

  onSubmitLogin = e => {
    e.preventDefault();

    const userData = {
      info: this.state.info,
      password: this.state.password,
      remember_me: this.state.remember_me
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    var loginContainerContent = "";
    const location = this.props.history.location.pathname;

    if (location === "/forgot-password") {
      loginContainerContent = (
        <ForgotForm
          onChange={this.onChange}
          onSubmit={this.onSubmitForgot}
          onForgot={this.onForgot}
          email={this.state.email}
          error={errors.email}
        />
      );
    } else if (location === "/sent-password-reset") {
      loginContainerContent = (
        <ForgotFormSuccess
          email={this.state.email}
          time={this.state.time}
          onForgot={this.onForgot}
        />
      );
    } else if (location.startsWith("/password-reset/")) {
      loginContainerContent = (
        <PasswordReset
          email={this.state.email}
          newPassword1={this.state.newPassword1}
          newPassword2={this.state.newPassword2}
          onSubmit={this.onSubmitPassword}
          onChange={this.onChange}
          errors={errors}
        />
      );
    } else if (location === "/password-reset-success") {
      loginContainerContent = (
        <PasswordResetSuccess
          email={this.state.email}
          onForgot={this.onForgot}
        />
      );
    } else {
      loginContainerContent = (
        <LoginForm
          onSubmit={this.onSubmitLogin}
          onChange={this.onChange}
          onTick={this.onTick}
          onForgot={this.onForgot}
          info={this.state.info}
          password={this.state.password}
          remember_me={this.state.remember_me}
          errors={errors}
        />
      );
    }

    return (
      <div className="login">
        <div className="loginImage">
          <div className="overlayImage" />
          <div className="imageText">
            <h1>Laméco</h1>
            <h4>
              Maakt Online <strong>Succesvol</strong>
            </h4>
          </div>
        </div>
        <div className="loginContainer">
          {loginContainerContent}
          {errors.forgotpassword && (
            <div className="invalid forgotpassworderror">
              {errors.forgotpassword}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  updateUserWithEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, forgotPassword, updateUserWithEmail }
)(Login);
