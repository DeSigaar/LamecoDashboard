import React from "react";
import PropTypes from "prop-types";

const EditDashboardTitle = ({
  onChange,
  company,
  onFocus,
  onClick,
  onBlur,
  onKeyDown,
  name,
  handle
}) => {
  return (
    <div className="editDashboardTitle">
      <div className="companyName">
        <h3>{company.name}</h3>
      </div>
      <div className="dashboardName">
        <h5>Dashboard name:</h5>
        <div>
          <input
            className="dashboardEdit"
            id="dashboardNinput"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
          <i className="material-icons" id="dashboardNicon" onClick={onClick}>
            edit
          </i>
        </div>
      </div>
      <div className="dashboardHandle">
        <h5>Dashboard handle:</h5>
        <div>
          <input
            className="dashboardEdit"
            id="dashboardHinput"
            type="text"
            name="handle"
            value={handle}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
          <i className="material-icons" id="dashboardHicon" onClick={onClick}>
            edit
          </i>
        </div>
      </div>
    </div>
  );
};

EditDashboardTitle.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired
};

export default EditDashboardTitle;
