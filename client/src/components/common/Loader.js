import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <div className="lds-dual-ring">
        <div className="logo" />
      </div>
    );
  }
}

export default Loader;
