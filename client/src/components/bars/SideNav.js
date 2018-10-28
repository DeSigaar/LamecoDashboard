import React, { Component } from "react";
import Popup from "../popups/Popup";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          name: "Berkvens deursystemen",
          dashboards: ["Lobby", "Vergaderruimte", "Kantoor"]
        },
        {
          id: 2,
          name: "MAN - Truck & Bus",
          dashboards: ["Front desk", "Werkplaats"]
        }
      ],

      open: null,
      popupState: false
    };

    this.showPopup = this.showPopup.bind(this);
  }

  showPopup = () => {
    this.setState({ popupState: !this.state.popupState });
  };

  renderCompanyList = () => {
    return (
      <ul className="List">
        {this.state.list.map((company, i) => {
          return (
            <li key={i}>
              {company.name}
              {this.renderDashboardList(company)}
            </li>
          );
        })}
      </ul>
    );
  };

  renderDashboardList = company => {
    return (
      <ul className="subList">
        {company["dashboards"].map((dashboard, i) => {
          return <li key={i}>{dashboard}</li>;
        })}
      </ul>
    );
  };

  render() {
    let popupState;
    if (this.state.popupState) {
      popupState = <Popup />;
    }
    return (
      <div className="sideNav">
        {/* Top buttons */}
        <button className="btn icon" onClick={this.showPopup}>
          <i className="material-icons">add</i>
          <span>Add company</span>
        </button>
        <button className="btn icon" onClick={this.showPopup}>
          <i className="material-icons">add</i>
          <span>Add dashboard</span>
        </button>

        {/* List */}
        {this.renderCompanyList()}

        {popupState}
      </div>
    );
  }
}

export default SideNav;
