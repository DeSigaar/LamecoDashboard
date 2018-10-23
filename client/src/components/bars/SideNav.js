import React, { Component } from "react";

class SideNav extends Component {
  constructor() {
    super();
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

      open: null
    };
  }

  renderCompanyList = () => {
    return (
      <ul className="companyList">
        {this.state.list.map((company, index) => {
          return (
            <li>
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
          return <li>{dashboard}</li>;
        })}
      </ul>
    );
  };

  render() {
    return (
      <div className="sideNav shadow2">
        {/* Top buttons */}
        <button className="btn icon">
          <i className="material-icons">add</i>
          <span>Add company</span>
        </button>
        <button className="btn icon">
          <i className="material-icons">add</i>
          Add dashboard
        </button>

        {/* List */}
        {this.renderCompanyList()}
      </div>
    );
  }
}

export default SideNav;
