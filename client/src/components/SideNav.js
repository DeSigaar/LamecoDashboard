import React, { Component } from "react";

export class SideNav extends Component {
  constructor() {
    super();
    this.state = {
      // arrayObject: {
      //   "Berkvens deursystemen": ["Lobby", "Vergaderruimte", "Werkplaats"],
      //   "MAN - Truck & Bus": ["test", "dashboard"]
      // },

      // arrayObject: [
      //   { id: 1, name: "Dave", dashboards: ["test", "asdfasdf"] },
      //   { id: 2, name: "Kellie", dashboards: ["test", "asdfasdf"] },
      //   { id: 3, name: "Max", dashboards: ["test", "asdfasdf"] },
      //   { id: 2, name: "Jack", dashboards: ["test", "asdfasdf"] }
      // ],

      open: null
    };

    // this.createSideNav = this.createSideNav.bind(this);
    // this.renderSideNav = this.renderSideNav.bind(this);
  }

  // createSideNav = callback => {
  //   return Object.keys(this.state.arrayObject).map(function(key) {
  //     return this.renderSideNav(key);
  //   });
  // };

  // renderSideNav = (key, arrayObject) => {
  //   return { key };
  // };

  // openList = () => {
  //   return (
  //     <ul style={{ listStyle: "none", border: "1px solid #000" }}>
  //       <li>User data </li>
  //       <li>Edit</li>
  //     </ul>
  //   );
  // };

  render() {
    return (
      <div className="sideNav shadow2">
        {/* Top buttons */}
        <button className="btn">
          <i className="material-icons">add</i>
          <span>Add company</span>
        </button>
        <button className="btn">
          <i className="material-icons">add</i>
          Add dashboard
        </button>

        {/* List */}

        {/* {this.createSideNav()} */}

        {/* {this.state.arrayList.map((name, index) => {
          return (
            <div key={`${name}-${index}`}>
              <span onClick={this.openDropDown}>{name}</span>
              {name === this.state.open ? this.openList() : null}
            </div>
          );
        })} */}

        <ul className="companyList">
          <li>
            Berkvens Deursystemen
            <ul className="subList">
              <li>Lobby</li>
              <li>Vergaderruimte</li>
              <li>Werkvloer</li>
            </ul>
          </li>

          <li>
            MAN - Truck &amp; Bus
            <ul className="subList">
              <li>Dashboard1</li>
              <li>Dashboard1</li>
              <li>Dashboard1</li>
            </ul>
          </li>

          <li>
            Simac
            <ul className="subList">
              <li>Dashboard1</li>
              <li>Dashboard1</li>
              <li>Dashboard1</li>
            </ul>
          </li>

          <li>
            Flow reizen
            <ul className="subList">
              <li>Dashboard1</li>
              <li>Dashboard1</li>
              <li>Dashboard1</li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideNav;
