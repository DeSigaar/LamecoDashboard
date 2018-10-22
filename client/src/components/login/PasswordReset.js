import React from "react";
import PropTypes from "prop-types";
const PasswordReset = ({
  email,
  newPassword1,
  newPassword2,
  onChange,
  onSubmit,
  errors
}) => {
  return (
    <form className="passwordReset" onSubmit={onSubmit}>
      <h3>Password reset</h3>
      <div className="middleForm">
        <p>Reset your password for {email}</p>
        <input type="hidden" name="email" value={email} />
        <div className="formField">
          <input
            type="password"
            name="newPassword1"
            placeholder="New password"
            onChange={onChange}
            value={newPassword1}
            autoComplete="new-password"
          />
          {errors.newPassword1 && (
            <div className="invalid"> {errors.newPassword1}</div>
          )}
        </div>
        <div className="formField">
          <input
            type="password"
            name="newPassword2"
            placeholder="Confirm new password"
            onChange={onChange}
            value={newPassword2}
            autoComplete="new-password"
          />
          {errors.newPassword2 && (
            <div className="invalid"> {errors.newPassword2}</div>
          )}
        </div>
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
  errors: PropTypes.object
};
export default PasswordReset;
