import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loginUser,
  forgotPassword,
  updateUserWithEmail,
  clearErrors
} from "../../actions/authActions";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoginImage from "./LoginImage";
import LoginError from "./container/LoginError";
import LoginForm from "./container/LoginForm";
import ForgotForm from "./container/ForgotForm";
import ForgotFormSuccess from "./container/ForgotFormSuccess";
import PasswordReset from "./container/PasswordReset";
import PasswordResetSuccess from "./container/PasswordResetSuccess";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      password: "",
      remember_me: false,
      reverse: "",
      email: "",
      time: "",
      key: "",
      newPassword1: "",
      newPassword2: "",
      errors: {}
    };
    this.loginContainerContent = "";
    this.loginContainerErrors = "";
  }

  componentWillMount() {
    const location = this.props.history.location.pathname;
    if (
      location === "/sent-password-reset" &&
      this.state.email === "" &&
      this.state.time === ""
    ) {
      this.props.history.push("/login");
    } else if (
      location === "/password-reset-success" &&
      this.state.email === ""
    ) {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    const location = this.props.history.location.pathname;
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else if (location.startsWith("/password-reset/")) {
      axios.get(`/api/forgot/${this.props.match.params.key}`).then(res => {
        console.log(res);
        if (!res.data) {
          this.setState({ reverse: "reverse" });
          this.props.history.push("/login");
        }
      });
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
      this.setState({ errors: nextProps.errors, reverse: "" });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onForgot = e => {
    e.preventDefault();
    this.setState({ reverse: "" });

    const location = this.props.history.location.pathname;
    switch (true) {
      case location.startsWith("/forgot-password"):
      case location.startsWith("/sent-password-reset"):
      case location.startsWith("/password-reset-success"):
        this.props.history.push("/login");
        this.setState({ email: "", key: "" });
        break;
      case location.startsWith("/login"):
      default:
        this.props.history.push("/forgot-password");
        this.setState({ info: "", password: "" });
        break;
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

    this.setState({ time: passTime, reverse: "reverse" });

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

  setupContainerContent = () => {
    if (this.state.errors.forgotpassword) {
      this.loginContainerErrors = (
        <LoginError error={this.state.errors.forgotpassword} />
      );
    }

    const location = this.props.history.location.pathname;
    switch (true) {
      case location.startsWith("/forgot-password"):
        document.title = "Forgot password | Laméco Dashboard";
        this.loginContainerContent = (
          <ForgotForm
            onChange={this.onChange}
            onSubmit={this.onSubmitForgot}
            onForgot={this.onForgot}
            reverse={this.state.reverse}
            email={this.state.email}
            error={this.state.errors.email}
          />
        );
        break;
      case location.startsWith("/sent-password-reset"):
        document.title = "Password request sent | Laméco Dashboard";
        this.loginContainerContent = (
          <ForgotFormSuccess
            email={this.state.email}
            time={this.state.time}
            onForgot={this.onForgot}
          />
        );
        break;
      case location.startsWith("/password-reset/"):
        document.title = "Password reset | Laméco Dashboard";
        this.loginContainerContent = (
          <PasswordReset
            email={this.state.email}
            newPassword1={this.state.newPassword1}
            newPassword2={this.state.newPassword2}
            reverse={this.state.reverse}
            onSubmit={this.onSubmitPassword}
            onChange={this.onChange}
            errors={this.state.errors}
          />
        );
        break;
      case location.startsWith("/password-reset-success"):
        document.title = "Password reset success | Laméco Dashboard";
        this.loginContainerContent = (
          <PasswordResetSuccess
            email={this.state.email}
            onForgot={this.onForgot}
          />
        );
        break;
      case location.startsWith("/login"):
      default:
        document.title = "Login | Laméco Dashboard";
        this.loginContainerContent = (
          <LoginForm
            onSubmit={this.onSubmitLogin}
            onChange={this.onChange}
            onTick={this.onTick}
            onForgot={this.onForgot}
            info={this.state.info}
            password={this.state.password}
            remember_me={this.state.remember_me}
            errors={this.state.errors}
          />
        );
        break;
    }
  };

  render() {
    this.setupContainerContent();

    return (
      <div className="login">
        <LoginImage />
        <TransitionGroup className="loginContainer">
          <CSSTransition
            key={this.loginContainerContent.type.name}
            timeout={400}
            classNames="slide"
          >
            {this.loginContainerContent}
          </CSSTransition>
          {this.loginContainerErrors}
        </TransitionGroup>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  updateUserWithEmail: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, forgotPassword, updateUserWithEmail, clearErrors }
)(Login);
