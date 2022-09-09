import React from "react";

const RadioInput = ({ formik, radioOption, name }) => {
  return (
    <div className="radioFormControl">
      {radioOption.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
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

export default RadioInput;
