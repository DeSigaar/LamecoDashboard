import React, { Component } from "react";
import Company from "./Company";
import Dashboard from "./Dashboard";

class PopupBody extends Component {
  render() {
    return (
      <div className="cardBody">
        <Company />
      </div>
    );
  }
}
export default PopupBody;
