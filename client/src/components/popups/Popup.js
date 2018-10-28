import React, { Component } from "react";
import Company from "./Company";
import Dashboard from "./Dashboard";
import PopupHeader from "./PopupHeader";
import PopupBody from "./PopupBody";

class Popup extends Component {
  constructor() {
    super();
    this.state = { title: "company" };
  }

  render() {
    return (
      <div className="card">
        <div className="cardContent">
          <PopupHeader title={this.state.title} />
          <PopupBody />
        </div>
      </div>
    );
  }
}

export default Popup;
