import React, { Component } from "react";
import PopupHeader from "./PopupHeader";
import PopupBody from "./PopupBody";

class Popup extends Component {
  constructor() {
    super();
    this.state = { title: "" };
  }

  handleClick = e => {
    this.props.closePopup();
  };
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
