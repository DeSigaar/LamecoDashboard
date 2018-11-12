import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
import { getCompanies, deleteDashboard } from "../../actions/companyActions";
import Snackbar from "../../components/common/Snackbar";

class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      active: false,
      active2: false
    };
  }

  toggleSnackbar = () => {
    const { active } = this.state;

    if (!active) {
      this.setState({
        active: true,
        active2: false
      });
      setTimeout(() => {
        this.setState({
          active: false
        });
      }, 5000);
    }
  };

  toggleSnackbar2 = () => {
    const { active2 } = this.state;

    if (!active2) {
      this.setState({
        active2: true,
        active: false
      });
      setTimeout(() => {
        this.setState({
          active2: false
        });
      }, 5000);
    }
  };

  onDashboardDelete = i => {
    const { deleteDashboard, getCompanies } = this.props;

    deleteDashboard(i);
    getCompanies();
    this.toggleSnackbar2();
  };

  render() {
    const { handle, companyhandle, name, id } = this.props;
    const { active, active2 } = this.state;
    const linkEdit = `/dashboard-edit/${handle}`;
    const linkShow = `/${companyhandle}/${handle}`;
    const linkShare = `${window.location.href}${companyhandle}/${handle}`;

    return (
      <div className="dashboardCard">
        <Link to={linkEdit}>{name}</Link>
        <span>{name}</span>
        <div className="editButtons">
          <Link to={linkEdit}>
            <i className="material-icons">edit</i>
          </Link>
          <Link to={linkShow}>
            <i className="material-icons">remove_red_eye</i>
          </Link>
          <CopyToClipboard
            text={linkShare}
            onCopy={() => this.setState({ copied: true })}
          >
            <i onClick={this.toggleSnackbar} className="material-icons">
              link
            </i>
          </CopyToClipboard>
          <i
            onClick={() => this.onDashboardDelete(id)}
            className="material-icons"
          >
            delete
          </i>
        </div>
        {active && <Snackbar text="Link Copied" />}
        {active2 && <Snackbar text="Dashboard deleted" />}
      </div>
    );
  }
}

DashboardCard.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  deleteDashboard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { getCompanies, deleteDashboard }
)(DashboardCard);
