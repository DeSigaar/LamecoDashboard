import React from "react";
import PropTypes from "prop-types";

const ForgotForm = ({ onSubmit, onChange, onForgot, email, error }) => {
  return (
    <form className="forgotForm" onSubmit={onSubmit}>
      <h3>Forgot password?</h3>
      <div className="middleForm">
        <p className="formText">
          Enter your email to request a password change
        </p>
        <div className="formField">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={onChange}
            value={email}
            autoComplete="email"
          />
          {error && <div className="invalid"> {error} </div>}
        </div>
      </div>
      <div className="bottomForm">
        <a href="/login" onClick={onForgot}>
          <i className="material-icons">arrow_back_ios</i>
          <span>I remember again</span>
        </a>
        <button type="submit" className="btn">
          Send request
        </button>
      </div>
    </form>
  );
};

ForgotForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onForgot: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default ForgotForm;
