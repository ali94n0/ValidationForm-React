import React from "react";

const CheckBox = ({ formik, checkBoxOption, name }) => {
  return (
    <div className="radioFormControl">
      {checkBoxOption.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="checkbox"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          ></input>
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
      {formik.touched[name] && formik.errors[name] && (
        <p>{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default CheckBox;
