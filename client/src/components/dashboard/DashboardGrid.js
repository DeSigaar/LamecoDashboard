import React, { Component } from "react";

class DashboardGrid extends Component {
  render() {
    return <div className="dashboardGrid">{this.props.children}</div>;
  }
}

export default DashboardGrid;
