import React, { Component } from "react";
import PopupHeader from "./PopupHeader";
import PopupBody from "./PopupBody";

class Popup extends Component {
  constructor() {
    super();
    this.state = { title: "" };
  }

  componentDidMount = () => {
    this.setState({
      title: this.props.title
    });
    document.addEventListener("keydown", this.typeFunction, false);
  };

  componentWillMount = () => {
    document.removeEventListener("keydown", this.typeFunction, false);
  };

  typeFunction = e => {
    if (e.key === "Escape") {
      this.props.closePopup();
    }
  };

  handleClick = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <div className="card">
        <div className="cardBackground" onClick={this.handleClick.bind(this)} />
        <div className="cardContent ">
          <PopupHeader title={this.state.title} />
          <PopupBody
            title={this.state.title}
            closePopup={this.props.closePopup.bind(this)}
            companyList={this.props.companyList}
          />
        </div>
      </div>
    );
  }
}

export default Popup;
