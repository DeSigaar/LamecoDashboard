import React, { Component } from "react";

class DashboardCardHolder extends Component {
  render() {
    return <div className="cardHolder">{this.props.children}</div>;
  }
}

export default DashboardCardHolder;
