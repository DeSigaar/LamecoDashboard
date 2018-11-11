import React from "react";
import PropTypes from "prop-types";
import PopupImage from "./PopupImage";

const PopupHeader = ({ title }) => {
  return (
    <div className="cardHeader">
      <PopupImage title={title} />
    </div>
  );
};

PopupHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PopupHeader;
