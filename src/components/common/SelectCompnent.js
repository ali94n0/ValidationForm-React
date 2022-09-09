const Select = ({ formik, selectOption, name }) => {
  return (
    <div className="formControl">
      <select
        {...formik.getFieldProps({ name })}
        name={name}
        placeholder={"hello"}
      >
        {selectOption.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] && (
        <p>{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default Select;
