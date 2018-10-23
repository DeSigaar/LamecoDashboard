import React from "react";
import PropTypes from "prop-types";
import TextField from "../../common/TextField";

const ForgotForm = ({
  onSubmit,
  onChange,
  onForgot,
  reverse,
  email,
  error
}) => {
  return (
    <form noValidate className={`forgotForm ${reverse}`} onSubmit={onSubmit}>
      <h3>Forgot password?</h3>
      <div className="middleForm">
        <p className="formText">
          Enter your email to request a password change
        </p>
        <TextField
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
          value={email}
          autoComplete="email"
          error={error}
        />
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
  reverse: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default ForgotForm;
