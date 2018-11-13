import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "2px solid RGBA(207, 31, 61, 0.35)" : ""
  }),

  option: (provided, state) => ({
    background: state.isFocused ? "RGBA(207, 31, 61, 0.35)" : "transparent",
    padding: "10px",
    cursor: "pointer"
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  }
};

const WidgetSelecter = ({
  selectedOption,
  handleChange,
  onAddItem,
  onLayoutReset,
  onDashboardDelete
}) => {
  let status = (
    <button className="btn icon" onClick={onAddItem} disabled>
      <i className="material-icons">add</i>
      <span>Add widget</span>
    </button>
  );
  if (selectedOption.value !== "") {
    status = (
      <button className="btn icon" onClick={onAddItem}>
        <i className="material-icons">add</i>
        <span>Add widget</span>
      </button>
    );
  }
  return (
    <div className="widgetselecter">
      <div className="widgetAdd">
        <h5>Select a widget</h5>
        <Select
          className="dropdown"
          name="form-field-name"
          value={selectedOption}
          onChange={handleChange}
          isSearchable={false}
          styles={customStyles}
          options={[
            { value: "Text", label: "Text" },
            { value: "Clock", label: "Clock" },
            { value: "Photo", label: "Photo" },
            { value: "Weather", label: "Weather" }
          ]}
        />
        <div className="addWidget">{status}</div>
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
