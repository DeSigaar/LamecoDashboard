import React, { Component } from "react";

class PopupImage extends Component {
  render() {
    return (
      <div className="overlayImage">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

export default PopupImage;
