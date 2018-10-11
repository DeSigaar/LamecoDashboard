import React, { Component } from "react";
class Login extends Component {
  render() {
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
          <div className="formContainer">
            <h3>Log in</h3>
            <form>
              <input type="text" name="uname" placeholder="Email or Username" />
              <input
                type="password"
                name="psw"
                placeholder="Password"
                required
              />
              <br />
              <div className="formBottom">
                <label className="rememberContainer">
                  Remember me
                  <input type="checkbox" />
                  <span class="checkmark" />
                </label>
                <span>
                  <a href="#">Forgot password?</a>
                </span>
              </div>
              <br />
              <button type="submit" className="btn">
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
