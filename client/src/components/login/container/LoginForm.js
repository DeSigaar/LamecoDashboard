import React from "react";
import PropTypes from "prop-types";
import TextField from "../../common/TextField";

const LoginForm = ({
  onSubmit,
  onChange,
  onTick,
  onForgot,
  info,
  password,
  remember_me,
  errors
}) => {
  return (
    <form noValidate className="loginForm" onSubmit={onSubmit}>
      <h3>Log in</h3>
      <div className="middleForm">
        <TextField
          name="info"
          placeholder="Email or Username"
          onChange={onChange}
          value={info}
          autoComplete="email"
          error={errors.info}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={password}
          autoComplete="current-password"
          error={errors.password}
        />
      </div>
      <div className="bottomForm">
        <div className="formBottom">
          <label className="rememberContainer">
            <span className="otherCheckmarkstuff">Remember me</span>
            <input type="checkbox" onClick={onTick} value={remember_me} />
            <span className="checkmark" />
          </label>
          <span>
            <a href="/forgot-password" onClick={onForgot}>
              Forgot password?
            </a>
          </span>
        </div>
        <button type="submit" className="btn">
          Log in
        </button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired,
  onForgot: PropTypes.func.isRequired,
  info: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  remember_me: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default LoginForm;
