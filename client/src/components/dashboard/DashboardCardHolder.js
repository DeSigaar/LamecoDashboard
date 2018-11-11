import React from "react";
import PropTypes from "prop-types";

const DashboarddCardHolder = children => {
  return <div className="cardHolder">{children}</div>;
};

DashboarddCardHolder.propTypes = {
  children: PropTypes.object.isRequired
};

export default DashboardCardHolder;
