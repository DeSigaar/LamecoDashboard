import React, { Component } from "react";

class SideNavContainer extends Component {
  render() {
    return <div className="sideNav">{this.props.children}</div>;
  }
}

export default SideNavContainer;
