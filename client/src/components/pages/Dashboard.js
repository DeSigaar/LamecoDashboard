import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCompanies, deleteCompany } from "../../actions/companyActions";
import TitleBar from "../bars/TitleBar";
import SideNav from "../bars/SideNav";
import SideNavContainer from "../bars/SideNavContainer";
import DashboardCard from "../dashboard/DashboardCard";
import DashboardGrid from "../dashboard/DashboardGrid";
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

    const { init } = this.state;
    const { getCompanies } = this.props;

    if (!init) {
      getCompanies();
    }
  }

  componentDidMount = () => {
    const { getCompanies } = this.props;
    this.interval = setInterval(() => {
      getCompanies();
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  toggleSnackbar = () => {
    const { active } = this.state;
    if (!active) {
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
    const { deleteCompany, history, getCompanies } = this.props;

    deleteCompany(i);
    history.push("/");
    getCompanies();
    this.toggleSnackbar();
  };

  componentWillReceiveProps = nextProps => {
    const { companyLoading } = this.state;
    const { getCompanies } = this.props;

    this.setState({
      init: true
    });
    if (nextProps.company.company === null) {
      if (!companyLoading) {
        this.setState({
          companyLoading: true
        });
        setTimeout(this.setState({ companyLoading: false }), 10000);
        getCompanies();
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
  };

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
    const { list, active } = this.state;

    return (
      <div>
        {list.map((company, i) => {
          return (
            <div key={i}>
              <div className="dashboardTitle">
                <input
                  className="companyNEdit"
                  id="companyNinput"
                  type="text"
                  name="name"
                  value={company.name}
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onKeyDown={onKeyDown}
                />
                <button className="iconOnly">
                  <i className="material-icons">edit</i>
                </button>
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
        {active && <Snackbar text="Company Deleted" />}
      </div>
    );
  };

  render() {
    const { loaded } = this.state;

    document.title = "Dashboard | Laméco Dashboard";

    let dashboardContent;
    if (loaded) {
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
