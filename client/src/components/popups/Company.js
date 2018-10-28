import React, { Component } from "react";
import PopupImage from "./PopupImage";

class Company extends Component {
  render() {
    return (
      <div>
        <div className="cardContent">
          <PopupImage title={this.props.title} />

          <div className="cardBody">
            <button /> <button />
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
