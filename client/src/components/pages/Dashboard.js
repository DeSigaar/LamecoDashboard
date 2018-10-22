import React, { Component } from "react";
import TitleBar from "../bars/TitleBar";
import SideNav from "../bars/SideNav";

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
