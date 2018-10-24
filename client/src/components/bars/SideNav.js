import React, { Component } from "react";
import Company from "../popups/Company";

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

    this.addCompany = this.addCompany.bind(this);
  }

  addCompany = () => {
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
      popupState = <Company />;
    }
    return (
      <div className="sideNav">
        {/* Top buttons */}
        <button className="btn icon" onClick={this.addCompany}>
          <i className="material-icons">add</i>
          <span>Add company</span>
        </button>
        <button className="btn icon">
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
