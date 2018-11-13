import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import axios from "axios";
import {
  loginUser,
  forgotPassword,
  updateUserWithEmail,
  clearErrors
} from "../../actions/authActions";
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
      errors: {},
      forgotpassword: ""
    };
    this.loginContainerContent = "";
  }

  componentWillMount = () => {
    const { history } = this.props;
    const { email, time } = this.state;
    const location = history.location.pathname;

    // Redirect if no data is found for password reset sent and success
    if (location === "/sent-password-reset" && email === "" && time === "") {
      history.push("/login");
    } else if (location === "/password-reset-success" && email === "") {
      history.push("/login");
    }
  };

  componentDidMount = () => {
    const { history, auth, match } = this.props;
    const location = history.location.pathname;

    if (auth.isAuthenticated) {
      history.push("/");
    } else if (location.startsWith("/password-reset/")) {
      // Check for the key
      axios.get(`/api/forgot/${match.params.key}`).then(res => {
        if (!res.data) {
          this.setState({ reverse: "reverse" });
          history.push("/login");
        }
      });

      // Get info of the key
      axios.get(`/api/forgot/info/${match.params.key}`).then(res => {
        const currentTime = Date.now();
        if (res.data.time < Math.round(currentTime)) {
          axios.delete(`/api/forgot/remove/${match.params.key}`);
          this.setState({
            forgotpassword: "Password reset link has expired",
            reverse: "reverse"
          });
          history.push("/login");
        } else {
          this.setState({
            key: match.params.key,
            email: res.data.email
          });
        }
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    const { history } = this.props;

    if (nextProps.auth.isAuthenticated) {
      history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onForgot = e => {
    e.preventDefault();
    const { clearErrors, history } = this.props;

    this.setState({ forgotpassword: "", reverse: "" });
    clearErrors();

    const location = history.location.pathname;

    switch (true) {
      case location.startsWith("/forgot-password"):
      case location.startsWith("/sent-password-reset"):
      case location.startsWith("/password-reset-success"):
        history.push("/login");
        this.setState({ email: "", key: "" });
        break;
      case location.startsWith("/login"):
      default:
        history.push("/forgot-password");
        this.setState({ info: "", password: "" });
        break;
    }
  };

  onTick = () => {
    this.setState({ remember_me: !this.state.remember_me });
  };

  onSubmitForgot = e => {
    e.preventDefault();
    const { clearErrors, forgotPassword, history } = this.props;

    clearErrors();

    const currentDate = new Date();
    let validDate = new Date(currentDate);
    let passTime = validDate;

    validDate.setHours(currentDate.getHours() + 3);
    validDate = validDate.getTime();

    passTime.setTime(validDate);

    this.setState({ time: passTime });

    const { email } = this.state;

    forgotPassword(
      { email, time: validDate },
      history,
      () => this.changeReverse(""),
      () => this.changeReverse("reverse")
    );
  };

  changeReverse = reverse => {
    this.setState({ reverse: reverse });
  };

  onSubmitPassword = e => {
    e.preventDefault();
    const { email, newPassword1, newPassword2 } = this.state;
    const { updateUserWithEmail, history } = this.props;

    updateUserWithEmail({ email, newPassword1, newPassword2 }, history);
  };

  onSubmitLogin = e => {
    e.preventDefault();
    const { info, password, remember_me } = this.state;
    const { loginUser } = this.props;

    loginUser({ info, password, remember_me });
  };

  setupContainerContent = location => {
    const {
      reverse,
      email,
      time,
      password,
      newPassword1,
      newPassword2,
      info,
      remember_me,
      errors
    } = this.state;
    switch (true) {
      case location.startsWith("/forgot-password"):
        document.title = "Forgot password | Laméco Dashboard";
        this.loginContainerContent = (
          <ForgotForm
            onChange={this.onChange}
            onSubmit={this.onSubmitForgot}
            onForgot={this.onForgot}
            reverse={reverse}
            email={email}
            error={errors.email}
          />
        );
        break;
      case location.startsWith("/sent-password-reset"):
        document.title = "Password request sent | Laméco Dashboard";
        this.loginContainerContent = (
          <ForgotFormSuccess
            email={email}
            time={time}
            onForgot={this.onForgot}
          />
        );
        break;
      case location.startsWith("/password-reset/"):
        document.title = "Password reset | Laméco Dashboard";
        this.loginContainerContent = (
          <PasswordReset
            email={email}
            newPassword1={newPassword1}
            newPassword2={newPassword2}
            reverse={reverse}
            onSubmit={this.onSubmitPassword}
            onChange={this.onChange}
            errors={errors}
          />
        );
        break;
      case location.startsWith("/password-reset-success"):
        document.title = "Password reset success | Laméco Dashboard";
        this.loginContainerContent = (
          <PasswordResetSuccess email={email} onForgot={this.onForgot} />
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
            info={info}
            password={password}
            remember_me={remember_me}
            errors={errors}
          />
        );
        break;
    }
  };

  render() {
    const { forgotpassword } = this.state;
    const { history } = this.props;

    this.setupContainerContent(history.location.pathname);

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
          <LoginError error={forgotpassword} />
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
