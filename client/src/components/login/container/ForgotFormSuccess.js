import React from "react";
import PropTypes from "prop-types";
const ForgotFormSuccess = ({ email, time, onForgot }) => {
  return (
    <div className="forgotSuccess">
      <h3>Password request sent</h3>
      <p>
        The request for a new password has been approved. An email with a link
        to create a new password has been sent to <strong>{email}</strong>. This
        link is valid until {time.toString()}.
      </p>
      <div className="bottomForm">
        <a href="/login" onClick={onForgot}>
          <i className="material-icons">arrow_back_ios</i>
          <span>Back to login</span>
        </a>
      </div>
    </div>
  );
};
ForgotFormSuccess.propTypes = {
  email: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
  onForgot: PropTypes.func.isRequired
};
export default ForgotFormSuccess;
