import React from "react";
import PropTypes from "prop-types";
import M from "materialize-css";

const Dropdown = (props) => {
  const { label, data } = props;

  const dropdown = document.querySelectorAll("select");
  M.FormSelect.init(dropdown, {});

  return (
    <div className="input-field">
      <select disabled={props.disabled} {...props}>
        <option value="" disabled={props.disabled}>
          {label}
        </option>
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label>{label}</label>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Dropdown;
