import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-white p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} Dev Connector
      </footer>
    );
  }
}
