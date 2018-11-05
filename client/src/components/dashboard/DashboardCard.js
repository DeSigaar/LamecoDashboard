import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SnackBar from "react-material-snackbar";

class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      snackbar: false
    };
  }
  toggleSnackbar(snackbar) {
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
      snackbar = (
        <SnackBar
          show={true} //Boolean  - Required and Default - `false`
          timer={1000} //Number   - Optional and Default - `4000` (4 secs)
        >
          <p>Copied to clipboard</p>
        </SnackBar>
      );
      setTimeout(() => {
        this.setState(state => ({
          snackbar: false
        }));
      }, 3000);
    } else {
      snackbar = null;
    }

    return (
      <div>
        {snackbar}
        {console.log(snackbar)}
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
      </div>
    );
  }
}

export default DashboardCard;
