import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const DashboardEditSideNav = ({
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
      <div className="backButton" onClick={() => this.props.history.push("/")}>
        <button className="btn icon red">
          <i className="material-icons">arrow_back</i>
          <span>Back</span>
        </button>
      </div>
      <div>
        {company.name} (/
        {company.handle})
      </div>
      <div>
        {dashboard.name} (/
        {dashboard.handle})
      </div>

      {/* Dropdown menu for widgets */}
      <div className="widgetselecter">
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
        <button className="btn icon red" onClick={onAddItem}>
          <i className="material-icons">add</i>
          <span>Add widget</span>
        </button>
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
  selectedOption: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onLayoutReset: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired
};

export default DashboardEditSideNav;
