import React, { Component } from "react";
import TitleBar from "../bars/TitleBar";
import SideNav from "../bars/SideNav";
import SideNavContainer from "../bars/SideNavContainer";
import DashboardCard from "../dashboard/DashboardCard";
import DashboardGrid from "../dashboard/DashboardGrid";

class Dashboard extends Component {
  render() {
    document.title = "Dashboard | Laméco Dashboard";
    return (
      <div className="dashboard">
        <TitleBar />
        <div className="mainContainer">
          <SideNavContainer>
            <SideNav />
          </SideNavContainer>
          <DashboardGrid>
            <h2>Berkvens deursystemen</h2>
            <DashboardCard />
          </DashboardGrid>
        </div>
      </div>
    );
  }
}

export default Dashboard;
