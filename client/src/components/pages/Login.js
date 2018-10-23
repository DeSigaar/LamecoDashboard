import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      password: "",
      remember_me: false,
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
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

  onSubmit = e => {
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
          <form onSubmit={this.onSubmit}>
            <h3>Log in</h3>
            <div className="middleForm">
              <div className="formField">
                <input
                  type="text"
                  name="info"
                  placeholder="Email or Username"
                  onChange={this.onChange}
                  value={this.state.info}
                />
                {errors.info && <div className="invalid"> {errors.info} </div>}
              </div>
              <div className="formField">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
                {errors.password && (
                  <div className="invalid"> {errors.password} </div>
                )}
              </div>
            </div>
            <div className="bottomForm">
              <div className="formBottom">
                <label className="rememberContainer">
                  <span className="otherCheckmarkstuff">Remember me</span>
                  <input
                    type="checkbox"
                    onClick={this.onTick}
                    value={this.state.remember_me}
                  />
                  <span className="checkmark" />
                </label>
                <span>
                  <a href="/login">Forgot password?</a>
                </span>
              </div>
              <div class="flex-center">
                <button type="submit" className="btn">
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
