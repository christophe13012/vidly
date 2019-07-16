import React from "react";

const Select = ({ label, id, selectItems, value, onSelect }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        className="form-control"
        id={id}
        value={value}
        onChange={onSelect}
      >
        {selectItems.map(item => {
          return (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
