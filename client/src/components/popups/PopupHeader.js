import React, { Component } from "react";
import PopupImage from "./PopupImage";

class PopupHeader extends Component {
  render() {
    return (
      <div className="cardHeader">
        <PopupImage title={this.props.title} />
      </div>
    );
  }
}
export default PopupHeader;
