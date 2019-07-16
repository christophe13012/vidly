import React from "react";

const Input = ({ type, label, value, onChange, error, id }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        autoFocus
        type={type}
        id={id}
        className="form-control"
        placeholder={label}
        onChange={onChange}
        value={value}
      />
      {error.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
