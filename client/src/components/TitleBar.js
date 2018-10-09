import React, { Component } from "react";
import { Link } from "react-router-dom";

export class TitleBar extends Component {
  render() {
    return (
      <div className="titleBar z-depth-1">
        <h1>Laméco</h1>
        <ul className="contentRight">
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dots">dots</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default TitleBar;
