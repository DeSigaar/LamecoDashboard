import React, { Component } from "react";
import PopupImage from "./PopupImage";

class Dashboard extends Component {
  render() {
    return (
      <div className="card">
        <div className="cardContent">
          <PopupImage title={"company"} />

          <div className="cardBody">
            <button /> <button />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
