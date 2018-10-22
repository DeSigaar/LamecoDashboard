import React, { Component } from "react";
import TitleBar from "../bars/TitleBar";
import SideNav from "../bars/SideNav";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <TitleBar />
        <SideNav />
      </div>
    );
  }
}

export default Dashboard;
