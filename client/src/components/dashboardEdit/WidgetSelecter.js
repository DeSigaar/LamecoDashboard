import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const WidgetSelecter = ({
  selectedOption,
  handleChange,
  onAddItem,
  onLayoutReset,
  onDashboardDelete
}) => {
  return (
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
          <button className="btn icon" onClick={onAddItem}>
            <i className="material-icons">add</i>
            <span>Add widget</span>
          </button>
        </div>
      </div>
      <div className="bottomButtonsEdit">
        <div className="reset">
          <button className="btn icon" onClick={onLayoutReset}>
            <i className="material-icons">cached</i>
            <span>Reset Layout</span>
          </button>
        </div>
        <div>
          <button className="btn icon" onClick={onDashboardDelete}>
            <i className="material-icons">delete</i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

WidgetSelecter.propTypes = {
  selectedOption: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onLayoutReset: PropTypes.func.isRequired,
  onDashboardDelete: PropTypes.func.isRequired
};

export default WidgetSelecter;
