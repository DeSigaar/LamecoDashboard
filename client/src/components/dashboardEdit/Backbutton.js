import React from "react";
import PropTypes from "prop-types";

const BackButton = ({ history }) => {
  return (
    <div className="backButton" onClick={() => history.push("/")}>
      <button className="btn icon red">
        <i className="material-icons">arrow_back</i>
        <span>Back</span>
      </button>
    </div>
  );
};

BackButton.propTypes = {
  history: PropTypes.object.isRequired
};

export default BackButton;
