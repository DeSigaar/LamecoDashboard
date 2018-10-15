import React from "react";
import PropTypes from "prop-types";
import TextField from "../../common/TextField";

const PasswordReset = ({
  email,
  newPassword1,
  newPassword2,
  reverse,
  onChange,
  onSubmit,
  errors
}) => {
  return (
    <form noValidate className={`passwordReset ${reverse}`} onSubmit={onSubmit}>
      <h3>Password reset</h3>
      <div className="middleForm">
        <p>Reset your password for {email}</p>
        <input type="hidden" name="email" value={email} />
        <TextField
          type="password"
          name="newPassword1"
          placeholder="New password"
          onChange={onChange}
          value={newPassword1}
          autoComplete="new-password"
          error={errors.newPassword1}
        />
        <TextField
          type="password"
          name="newPassword2"
          placeholder="Confirm new password"
          onChange={onChange}
          value={newPassword2}
          autoComplete="new-password"
          error={errors.newPassword2}
        />
      </div>
      <div className="bottomForm">
        <button type="submit" className="btn">
          Change password
        </button>
      </div>
    </form>
  );
};

PasswordReset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  newPassword1: PropTypes.string.isRequired,
  newPassword2: PropTypes.string.isRequired,
  reverse: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default PasswordReset;
