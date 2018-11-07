import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "../../components/common/Snackbar";
import { getCompanies, deleteDashboard } from "../../actions/companyActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
    if (!this.state.active) {
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
    if (!this.state.active2) {
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
    this.props.deleteDashboard(i);
    this.props.getCompanies();
    this.toggleSnackbar2();
  };
  render() {
    const { handle } = this.props;
    const { companyhandle } = this.props;
    const linkEdit = `/dashboard-edit/${handle}`;
    const linkShow = `/${companyhandle}/${handle}`;
    const linkShare = `${window.location.href}${companyhandle}/${handle}`;
    return (
      <div className="dashboardCard">
        <span>{this.props.name}</span>
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
            <i onClick={this.toggleSnackbar} className="material-icons">link</i>
          </CopyToClipboard>
          <i
            onClick={() => this.onDashboardDelete(this.props.id)}
            className="material-icons"
          >
            delete
          </i>
        </div>
        {this.state.active && <Snackbar text="Link Copied" />}
        {this.state.active2 && <Snackbar text="Dashboard deleted" />}
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
