import React, { Component } from "react";

class PopupImage extends Component {
  render() {
    return (
      <div className="overlayImage">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default PopupImage;
