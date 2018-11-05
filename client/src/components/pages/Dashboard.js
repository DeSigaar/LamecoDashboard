import React, { Component } from "react";
import TitleBar from "../bars/TitleBar";
import SideNav from "../bars/SideNav";
import SideNavContainer from "../bars/SideNavContainer";
import DashboardCard from "../dashboard/DashboardCard";
import DashboardGrid from "../dashboard/DashboardGrid";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loaded: false
    };

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
  renderDashboardList = company => {
    let elements;
    if (company["dashboards"].length <= 0) {
      elements = <div>No dashboards</div>;
    } else {
      elements = company["dashboards"].map((dashboard, i) => {
        return (
          <DashboardCard
            key={i}
            name={dashboard.name}
            companyhandle={company.handle}
            handle={dashboard.handle}
          />
        );
      });
    }
    return <div className="cardHolder">{elements}</div>;
  };
  renderCompanyList = () => {
    return (
      <div>
        {this.state.list.map((company, i) => {
          return (
            <div key={i}>
              <h2>{company.name}</h2>
              <div key={i}>{this.renderDashboardList(company)}</div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    document.title = "Dashboard | Laméco Dashboard";
    return (
      <div className="dashboard">
        <TitleBar />
        <div className="mainContainer">
          <SideNavContainer>
            <SideNav />
          </SideNavContainer>

          <DashboardGrid>{this.renderCompanyList()}</DashboardGrid>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCompanies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  company: state.company
});
export default connect(
  mapStateToProps,
  { getCompanies }
)(Dashboard);
