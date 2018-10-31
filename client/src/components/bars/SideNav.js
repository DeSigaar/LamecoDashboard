import React, { Component } from "react";
import Company from "../popups/Company";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
      popupState: false,
      title: ""
    };

    this.togglePopupDashboard = this.togglePopupDashboard.bind(this);
    this.togglePopupCompany = this.togglePopupCompany.bind(this);
  }
  componentDidMount() {
    this.props.getCompanies();
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.state.list);
    console.log(nextProps.company.company);
    if (nextProps.company.company) {
      this.setState({ list: nextProps.company.company });
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
    return (
      <ul className="subList">
        {company["dashboards"].map((dashboard, i) => {
          return <li key={i}>{dashboard}</li>;
        })}
      </ul>
    );
  };

  render() {
    const { companies } = this.props.company;
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
