import React from "react";
import PropTypes from "prop-types";

const EditDashboardTitle = ({
  onChange,
  company,
  onChangeFocusName,
  onChangeFocusHandle,
  onBlur,
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
        <input
          className="dashboardEdit"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <i className="material-icons" onClick={onChangeFocusName}>
          edit
        </i>
        <h5>Dashboard handle:</h5>
        <input
          className="dashboardEdit"
          type="text"
          name="handle"
          value={handle}
          onChange={onChange}
          onBlur={onBlur}
        />
        <i className="material-icons" onClick={onChangeFocusHandle}>
          edit
        </i>
      </div>
    </div>
  );
};

EditDashboardTitle.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeFocusName: PropTypes.func.isRequired,
  onChangeFocusHandle: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired
};

export default EditDashboardTitle;
