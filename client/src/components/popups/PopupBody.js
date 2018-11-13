import React, { Component } from "react";
import PropTypes from "prop-types";
import Company from "./Company";
import Dashboard from "./Dashboard";
import CompanyEdit from "./CompanyEdit";

class PopupBody extends Component {
  render() {
    const {
      companyList,
      title,
      companyId,
      id,
      name,
      handle,
      closePopup
    } = this.props;

    switch (title) {
      case "Add Company":
        return (
          <div className="cardBody">
            <Company closePopup={() => closePopup()} />
          </div>
        );
      case "Add Dashboard":
        return (
          <div className="cardBody">
            <Dashboard
              closePopup={() => closePopup()}
              companyList={companyList}
              companyId={companyId}
            />
          </div>
        );
      case "Edit Company":
        return (
          <div className="cardBody">
            <CompanyEdit
              closePopup={() => closePopup()}
              id={id}
              name={name}
              handle={handle}
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
  companyId: PropTypes.string,
  closePopup: PropTypes.func.isRequired,
  companyList: PropTypes.array
};

export default PopupBody;
