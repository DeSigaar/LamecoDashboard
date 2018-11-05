import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "../../components/common/Snackbar";

class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      snackbar: false
    };
  }
  toggleSnackbar() {
    if (this.state.snackbar) {
      this.setState(state => ({
        snackbar: false
      }));
    } else {
      this.setState(state => ({
        snackbar: true
      }));
    }
  }
  render() {
    let snackbar = false;
    const { handle } = this.props;
    const { companyhandle } = this.props;
    const linkEdit = `/dashboard-edit/${handle}`;
    const linkShow = `/${companyhandle}/${handle}`;
    const linkShare = `${window.location.href}${companyhandle}/${handle}`;

    if (this.state.snackbar) {
      snackbar = <Snackbar text="Link copied" />;
      alert("Work");
      setTimeout(() => {
        this.setState(state => ({
          snackbar: false
        }));
      }, 3000);
    } else {
      snackbar = null;
    }

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
            <i
              onClick={() => this.setState({ snackbar: true })}
              className="material-icons"
            >
              share
            </i>
          </CopyToClipboard>
        </div>
        {snackbar}
      </div>
    );
  }
}

export default DashboardCard;
