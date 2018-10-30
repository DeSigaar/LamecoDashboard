import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const DashboardEditSideNav = ({
  history,
  selectedOption,
  handleChange,
  onAddItem,
  onLayoutReset,
  company,
  dashboard
}) => {
  return (
    <div>
      {/* Back button */}
      <div className="backButton" onClick={() => history.push("/")}>
        <button className="btn icon red">
          <i className="material-icons">arrow_back</i>
          <span>Back</span>
        </button>
      </div>
      <div className="editDashboardTitle">
        <div className="companyName">
          <h3>{company.name}</h3>
        </div>
        <div className="dashboardName">
          <input className="dashboardEdit" type="text" placeholder={dashboard.name}/>
          <i className="material-icons">edit</i>
          <input className="dashboardEdit" type="text" placeholder={dashboard.handle}/>
          <i className="material-icons">edit</i>
        </div>
      </div>

      {/* Dropdown menu for widgets */}
      <div className="widgetselecter">
        <div className="widgetAdd">
          <Select
            className="dropdown"
            name="form-field-name"
            value={selectedOption}
            onChange={handleChange}
            isSearchable={false}
            options={[
              { value: "Text", label: "Text" },
              { value: "Clock", label: "Clock" },
              { value: "Photo", label: "Photo" },
              { value: "Weather", label: "Weather" }
            ]}
          />
          <div className="addWidget">
            <button className="btn icon red" onClick={onAddItem}>
              <i className="material-icons">add</i>
              <span>Add widget</span>
            </button>
          </div>
        </div>
        {/* Deleting everything from grid */}
        <div className="reset">
            <button className="btn" onClick={onLayoutReset}>
              Reset Layout
            </button>
        </div>
      </div>
    </div>
  );
};

DashboardEditSideNav.propTypes = {
  history: PropTypes.object.isRequired,
  selectedOption: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onLayoutReset: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired
};

export default DashboardEditSideNav;
