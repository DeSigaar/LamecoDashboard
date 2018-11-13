import React, { Component } from "react";

class DashboardGrid extends Component {
  render() {
    const { children } = this.props;

    return <div className="dashboardGrid">{children}</div>;
  }
}

export default DashboardGrid;
