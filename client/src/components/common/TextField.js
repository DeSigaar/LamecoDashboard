import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  autoComplete
}) => {
  return (
    <div className="formField">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
      />
      {error && <div className="invalid"> {error}</div>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
