import React from "react";
import PropTypes from "prop-types";

const SideNavContainer = ({ children }) => {
  return <div className="sideNav">{children}</div>;
};

SideNavContainer.propTypes = {
  children: PropTypes.object.isRequired
};

export default SideNavContainer;
