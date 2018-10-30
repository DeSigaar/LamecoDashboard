import React, { Component } from "react";
import Company from "./Company";
import Dashboard from "./Dashboard";

class PopupBody extends Component {
  constructor() {
    super();
  }
  render() {
    let isDashboard = false;
    let isCompany = false;
    console.log(this.props.title);
    if (this.props.title === "Add Dashboard") {
      isDashboard = true;
    }
    if (this.props.title === "Add Company") {
      isCompany = true;
    }

    if (isCompany) {
      return (
        <div className="cardBody">
          <Company closePopup={this.props.closePopup.bind(this)} />
        </div>
      );
    } else if (isDashboard) {
      return (
        <div className="cardBody">
          <Dashboard closePopup={this.props.closePopup.bind(this)} />
        </div>
      );
    } else {
      return <div>ERror!</div>;
    }
  }
}
export default PopupBody;
