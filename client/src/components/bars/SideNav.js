import React, { Component } from "react";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Popup from "../popups/Popup";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      open: null,
      popupState: false,
      title: "",
      loaded: false
    };

    this.togglePopupDashboard = this.togglePopupDashboard.bind(this);
    this.togglePopupCompany = this.togglePopupCompany.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.company.company !== null &&
      nextProps.company.company.companies
    ) {
      this.setState({
        list: nextProps.company.company.companies,
        loaded: true
      });
    }
  }

  addCompany = () => {
    this.setState({ popupState: !this.state.popupState });
  };
  togglePopupDashboard = title => {
    this.setState({ popupState: !this.state.popupState, title });
    var myElements = document.querySelectorAll(".titleBar");

    if (this.state.popupState === false) {
      for (var x = 0; x < myElements.length; x++) {
        myElements[x].style.backgroundColor = "rgb(178, 178, 178)";
      }
    } else {
      for (var x = 0; x < myElements.length; x++) {
        myElements[x].style.backgroundColor = "rgb(255, 255, 255)";
      }
    }
  };
  togglePopupCompany = title => {
    this.setState({
      popupState: !this.state.popupState,
      title
    });

    var myElements = document.querySelectorAll(".titleBar");

    if (this.state.popupState === false) {
      for (var i = 0; i < myElements.length; i++) {
        myElements[i].style.backgroundColor = "rgb(178, 178, 178)";
      }
    } else {
      for (var i = 0; i < myElements.length; i++) {
        myElements[i].style.backgroundColor = "rgb(255, 255, 255)";
      }
    }
  };
  renderCompanyList = () => {
    return (
      <ul className="list">
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
    let elements;
    if (company["dashboards"].length <= 0) {
      elements = <li>No dashboards</li>;
    } else {
      elements = company["dashboards"].map((dashboard, i) => {
        let link = `/dashboard-edit/${dashboard.handle}`;
        return (
          <li key={i}>
            <Link to={link}>{dashboard.name}</Link>
          </li>
        );
      });
    }

    return <ul className="subList">{elements}</ul>;
  };

  render() {
    let popupState;
    if (this.state.popupState) {
      popupState = (
        <Popup
          title={this.state.title}
          closePopup={this.togglePopupCompany}
          companyList={this.state.list}
        />
      );
    }

    let companyList;
    if (isEmpty(this.state.list)) {
      companyList = (
        <ul className="list">
          <li>
            <div className="listTitle" />
            <ul className="subList">
              <li />
              <li />
              <li />
            </ul>
          </li>
          <li>
            <div className="listTitle" />
            <ul className="subList">
              <li />
              <li />
            </ul>
          </li>
        </ul>
      );
    } else {
      companyList = this.renderCompanyList();
    }

    return (
      <div>
        {/* Top buttons */}
        <button
          className="btn icon"
          onClick={this.togglePopupCompany.bind(this, "Add Company")}
        >
          <i className="material-icons">add</i>
          <span>Add company</span>
        </button>
        <button
          className="btn icon"
          onClick={this.togglePopupDashboard.bind(this, "Add Dashboard")}
        >
          <i className="material-icons">add</i>
          <span>Add dashboard</span>
        </button>

        {/* List */}
        {companyList}

        {popupState}
      </div>
    );
  }
}
SideNav.propTypes = {
  getCompanies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  company: state.company
});
export default connect(
  mapStateToProps,
  { getCompanies }
)(SideNav);
