import React, { Component } from "react";
import Company from "./Company";
import Dashboard from "./Dashboard";
import PopupHeader from "./PopupHeader";
import PopupBody from "./PopupBody";

class Popup extends Component {
  constructor() {
    super();
    this.state = { title: "dszfdsz" };
  }

  handleClick(e) {
    this.props.closePopup();
  }
  componentDidMount() {
    console.log(this.props.title);
    this.setState({
      title: this.props.title
    });
  }
  render() {
    return (
      <div className="card">
        <div className="cardBackground" onClick={this.handleClick.bind(this)} />
        <div className="cardContent ">
          <PopupHeader title={this.state.title} />
          <PopupBody title={this.state} />
        </div>
      </div>
    );
  }
}

export default Popup;
