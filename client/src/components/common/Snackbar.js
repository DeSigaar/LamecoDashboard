import React, { Component } from "react";

class Snackbar extends Component {
  render() {
    return (
      <div>
        <button onclick="myFunction()">Show Snackbar</button>
        <div id="snackbar">Some text some message..</div>
      </div>
    );
  }
}
export default Snackbar;
