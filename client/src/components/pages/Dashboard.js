import React, { Component } from "react";
import TitleBar from "../TitleBar";
import SideNav from "../SideNav";

class Dashboard extends Component {
  render() {
    document.title = "Dashboard | Laméco Dashboard";
    return (
      <div className="dashboard">
        <TitleBar />
        <SideNav />
      </div>
    );
  }
}

export default Dashboard;
