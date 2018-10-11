import React, { Component } from "react";

export class SideNav extends Component {
  render() {
    return (
      <div className="sideNav shadow2">
        <button className="btn">
          <i class="material-icons">add</i>
          <span>Add company</span>
        </button>
        <button className="btn small fullColor">
          <i class="material-icons">add</i>
          Add dashboard
        </button>
      </div>
    );
  }
}

export default SideNav;
