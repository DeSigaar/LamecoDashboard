import React, { Component } from "react";
import Company from "./Company";
import Dashboard from "./Dashboard";
import PopupHeader from "./PopupHeader";
import PopupBody from "./PopupBody";

class Popup extends Component {
  constructor() {
    super();
    this.state = { title: "Add Company" };
  }

  handleClick(e) {
    this.props.closePopup();
  }

  render() {
    return (
      <div className="card">
        <div className="cardBackground" onClick={this.handleClick.bind(this)} />
        <div className="cardContent ">
          <PopupHeader title={this.state.title} />
          <PopupBody title={this.state.title} />
        </div>
      </div>
    );
  }
}

export default Popup;
