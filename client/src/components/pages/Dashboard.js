import React, { Component } from "react";
import TitleBar from "../bars/TitleBar";
import SideNav from "../bars/SideNav";
import SideNavContainer from "../bars/SideNavContainer";
import DashboardCard from "../dashboard/DashboardCard";
import DashboardGrid from "../dashboard/DashboardGrid";
import { getCompanies, deleteCompany } from "../../actions/companyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../common/Loader";
import Snackbar from "../common/Snackbar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loaded: false,
      companyLoading: false,
      init: false,
      active: false
    };

    if (!this.state.init) {
      this.props.getCompanies();
    }
  }
  toggleSnackbar = () => {
    if (!this.state.active) {
      this.setState({
        active: true
      });
      setTimeout(() => {
        this.setState({
          active: false
        });
      }, 3000);
    }
  };
  onCompanyDelete = i => {
    this.props.deleteCompany(i);
    this.props.history.push("/");
    this.props.getCompanies();
    this.toggleSnackbar();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      init: true
    });
    if (nextProps.company.company === null) {
      if (!this.state.companyLoading) {
        this.setState({
          companyLoading: true
        });
        setTimeout(this.setState({ companyLoading: false }), 10000);
        this.props.getCompanies();
      }
    } else if (
      nextProps.company.company !== null &&
      nextProps.company.company.companies
    ) {
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
            id={dashboard.id}
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
              <div className="dashboardTitle">
                <h2>{company.name}</h2>
                <button
                  className="iconOnly"
                  onClick={() => this.onCompanyDelete(company.id)}
                >
                  <i className="material-icons">delete</i>
                </button>
              </div>
              <div key={i}>{this.renderDashboardList(company)}</div>
            </div>
          );
        })}
        {this.state.active && <Snackbar text="Company Deleted" />}
      </div>
    );
  };
  render() {
    document.title = "Dashboard | Laméco Dashboard";

    let dashboardContent;
    if (this.state.loaded) {
      dashboardContent = this.renderCompanyList();
    } else {
      dashboardContent = (
        <div className="loader-center">
          <Loader />
        </div>
      );
    }

    return (
      <div className="dashboard">
        <TitleBar />
        <div className="mainContainer">
          <SideNavContainer>
            <SideNav />
          </SideNavContainer>

          <DashboardGrid>{dashboardContent}</DashboardGrid>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  company: state.company
});
export default connect(
  mapStateToProps,
  { getCompanies, deleteCompany }
)(Dashboard);
