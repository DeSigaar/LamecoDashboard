import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="loginImage">
          <img
            className="backgroundImage"
            src="img/showcase.jpg"
            alt="backgroundImage"
          />
          <div className="imageText">
            <h1>Laméco</h1>
            <h4>Maakt Online Succesvol</h4>
          </div>
        </div>
        <div className="loginContainer">
          <div className="formContainer">
            <form>
              <input type="text" name="uname" placeholder="Email or Username" />
              <input
                type="password"
                name="psw"
                placeholder="Password"
                required
              />
              <label>
                <input type="checkbox" name="remember" required /> Remember me
              </label>
              <span>
                <a href="#">Forgot Password?</a>
              </span>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
