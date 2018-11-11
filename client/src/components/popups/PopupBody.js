import React, { Component } from "react";
import PropTypes from "prop-types";
import Company from "./Company";
import Dashboard from "./Dashboard";

class PopupBody extends Component {
  render() {
    const { companyList, title, closePopup } = this.props;

    switch (title) {
      case "Add Company":
        return (
          <div className="cardBody">
            <Company closePopup={closePopup.bind(this)} />
          </div>
        );
      case "Add Dashboard":
        return (
          <div className="cardBody">
            <Dashboard
              closePopup={closePopup.bind(this)}
              companyList={companyList}
            />
          </div>
        );
      default:
        return <div>Oops, something went wrong!</div>;
    }
  }
}

PopupBody.propTypes = {
  title: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
  companyList: PropTypes.array
};

export default PopupBody;
