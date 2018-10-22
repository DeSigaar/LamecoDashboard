import React, { Component } from "react";
import TitleBar from "../bars/TitleBar";

class AdminProfile extends Component {
  render() {
    return (
      <div className="adminProfile">
        <TitleBar />
        <div className="mainContainer">
          {/* Back button */}
          <div className="backButton">
            <button className="btn red">
              <i className="material-icons">arrow_back</i>
              <span>Back</span>
            </button>
          </div>
          <div className="profileForm">
            <div className="adminInfo">
              <div className="profileImg" />
              <div className="info">
                <h5>Change Icon</h5>
                <h6>@username</h6>
                <button className="btn">Upload Image</button>
              </div>
            </div>
            <form className="adminForm">
              <div className="inputFields">
                <div className="adminFormInfo">
                  <input type="text" name="name" placeholder="Name" />
                  <input type="text" name="email" placeholder="E-mail" />
                  <input type="text" name="username" placeholder="@Username" />
                </div>
                <div className="adminFormPassword">
                  <h6>Change Password</h6>
                  <input type="password" name="psw" placeholder="Password" />
                  <input
                    type="password"
                    name="confirmPsw"
                    placeholder="Confirm Password"
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

export default AdminProfile;
