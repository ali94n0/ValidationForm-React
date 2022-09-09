const TermsCheckBox = ({ formik, name }) => {
  return (
    <div className="radioFormControl">
      <input
        type="checkbox"
        name={name}
        id={name}
        value={true}
        onChange={formik.handleChange}
        checked={formik.values[name]}
      ></input>
      <label htmlFor={name}>Terms and Conditions</label>
      {formik.touched[name] && formik.errors[name] && (
        <p>{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default TermsCheckBox;
