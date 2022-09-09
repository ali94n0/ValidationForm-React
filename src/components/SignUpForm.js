import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import CheckBox from "./common/CheckBox";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import Select from "./common/SelectCompnent";
import TermsCheckBox from "./common/termsCheckBox";

const checkBoxOption = [
  { label: "React.Js", value: "React" },
  { label: "Vue.Js", value: "Vue" },
  { label: "Next.Js", value: "Next" },
];
const radioOption = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];
const selectOption = [
  { label: "Select Nationality...", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  experties: [],
  terms: false,
};
const onSubmit = (values) => {
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is Required")
    .min(3, "Name Length is not Valid"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Require"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/[0-9]{11}/, "Phone Number is not Valid"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters and Numbers"
    ),
  passwordConfirm: Yup.string()
    .required("Password Confirmation is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  gender: Yup.string().required("Gender is Required"),
  nationality: Yup.string().required("Nationality is Required"),
  experties: Yup.array().min(1).required("At least select One Experties!"),
  terms: Yup.bool()
    .oneOf([true], "You need to accept the terms and conditions")
    .required("term and conditons Required"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  //if you want replace your data on first load//
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => {
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name={"name"} label={"Name"} />
        <Input formik={formik} name={"email"} label={"Email"} />
        <Input formik={formik} name={"phoneNumber"} label={"Phone Number"} />
        <Input
          formik={formik}
          name={"password"}
          label={"Password"}
          type={"password"}
        />
        <Input
          formik={formik}
          name={"passwordConfirm"}
          label={"Password Confirmation"}
          type={"password"}
        />
        <RadioInput formik={formik} radioOption={radioOption} name={"gender"} />
        <Select
          formik={formik}
          selectOption={selectOption}
          name={"nationality"}
        />
        <CheckBox
          formik={formik}
          checkBoxOption={checkBoxOption}
          name={"experties"}
        />
        <TermsCheckBox formik={formik} name={"terms"} />
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
