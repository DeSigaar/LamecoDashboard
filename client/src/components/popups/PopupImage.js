import React from "react";
import PropTypes from "prop-types";

const PopupImage = ({ title }) => {
  return (
    <div className="overlayImage">
      <h2>{title}</h2>
    </div>
  );
};

PopupImage.propTypes = {
  title: PropTypes.string.isRequired
};

export default PopupImage;
