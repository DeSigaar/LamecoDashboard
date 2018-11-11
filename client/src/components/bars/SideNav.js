import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCompanies } from "../../actions/companyActions";
import Popup from "../popups/Popup";
import isEmpty from "../../validation/is-empty";

const portalContainer = document.getElementById("card");

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
  }

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.company.company !== null &&
      nextProps.company.company.companies
    ) {
      this.setState({
        list: nextProps.company.company.companies,
        loaded: true
      });
    }
  };

  addCompany = () => {
    this.setState({ popupState: !this.state.popupState });
  };

  togglePopupDashboard = title => {
    this.setState({ popupState: !this.state.popupState, title });
  };

  togglePopupCompany = title => {
    this.setState({
      popupState: !this.state.popupState,
      title
    });
  };

  renderCompanyList = () => {
    const { list } = this.state;

    return (
      <div className="listView">
        <ul className="list">
          {list.map((company, i) => {
            return (
              <li key={i}>
                <span>{company.name}</span>
                {this.renderDashboardList(company)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  renderDashboardList = company => {
    let elements;
    if (company["dashboards"].length <= 0) {
      elements = <li className="noDashboards">No dashboards</li>;
    } else {
      elements = company["dashboards"].map((dashboard, i) => {
        let link = `/dashboard-edit/${dashboard.handle}`;
        return (
          <li className="dashboardLink" key={i}>
            <Link to={link}>{dashboard.name}</Link>
          </li>
        );
      });
    }

    return <ul className="subList">{elements}</ul>;
  };

  render() {
    const { popupState, title, list } = this.state;

    let PopUpContent;
    if (popupState) {
      PopUpContent = ReactDOM.createPortal(
        <Popup
          title={title}
          closePopup={this.togglePopupCompany}
          companyList={list}
        />,
        portalContainer
      );
    }

    let companyList;
    if (isEmpty(list)) {
      companyList = (
        <ul className="list">
          <li>
            <div className="listTitle" />
            <ul className="subList">
              <li className="dashboardLink" />
              <li className="dashboardLink" />
              <li className="dashboardLink" />
            </ul>
          </li>
          <li>
            <div className="listTitle" />
            <ul className="subList">
              <li className="dashboardLink" />
              <li className="dashboardLink" />
            </ul>
          </li>
        </ul>
      );
    } else {
      companyList = this.renderCompanyList();
    }

    return (
      <div>
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

        {companyList}

        {PopUpContent}
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
