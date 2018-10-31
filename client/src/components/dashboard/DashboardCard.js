import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

class DashboardCard extends Component {
  render() {
    const { handle } = this.props;
    const { companyhandle } = this.props;

    const linkEdit = `/dashboard-edit/${handle}`;
    const linkShow = `/${companyhandle}/${handle}`;
    const linkShare = `/${companyhandle}/${handle}`;
    return (
      <div>
        <span>{this.props.name}</span>
        <div className="editButtons">
          <Link to={linkEdit}>
            <i className="material-icons">edit</i>
          </Link>
          <Link to={linkShow}>
            <i className="material-icons">remove_red_eye</i>
          </Link>

          <i className="material-icons">share</i>
        </div>
      </div>
    );
  }
}

export default DashboardCard;
