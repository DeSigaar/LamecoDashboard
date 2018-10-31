import React, { Component } from "react";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Popup from "../popups/Popup";
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

    if (!this.state.loaded) {
      this.props.getCompanies();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.company.company.companies) {
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
  };
  togglePopupCompany = title => {
    this.setState({
      popupState: !this.state.popupState,
      title
    });
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
        {this.renderCompanyList()}

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
