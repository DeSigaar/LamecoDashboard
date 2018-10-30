import React, { Component } from "react";

class DashboardCard extends Component {
  render() {
    return (
      <div className="dashboardCard">
        <span>Dashboard title</span>
        <div className="editButtons">
          <i className="material-icons">edit</i>
          <i className="material-icons">remove_red_eye</i>
          <i className="material-icons">share</i>
        </div>
      </div>
    );
  }
}

export default DashboardCard;
