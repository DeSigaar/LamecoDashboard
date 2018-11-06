import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "../../components/common/Snackbar";

class DashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      active: false
    };
    let snackbar = <div />;
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
            <i onClick={this.toggleSnackbar} className="material-icons">
              share
            </i>
          </CopyToClipboard>
          <i className="material-icons">delete</i>
        </div>
        {this.state.active && <Snackbar text="Link Copied" />}
      </div>
    );
  }
}

export default DashboardCard;
