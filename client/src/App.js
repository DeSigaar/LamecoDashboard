import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRouter";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
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
                  <input
                    type="text"
                    name="uname"
                    placeholder="Email or Username"
                  />
                  <input
                    type="password"
                    name="psw"
                    placeholder="Password"
                    required
                  />
                  <label>
                    <input type="checkbox" name="remember" required /> Remember
                    me
                  </label>
                  <span>
                    <a href="#">Forgot Password?</a>
                  </span>
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
