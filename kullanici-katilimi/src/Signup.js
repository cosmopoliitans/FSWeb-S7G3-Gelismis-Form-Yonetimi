import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup.string()
    .required("Password is Required")
    .min(6, "Passwords must be at least 6 characters long."),
  terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});

function Signup() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
    isValid: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setFormState((prevState) => ({ ...prevState, isValid: valid }));
    });
  }, [formState]);
  const checkboxChange = (e) => {
    const { name, checked } = e.target;

    Yup.reach(formSchema, name)
      .validate(checked)
      .then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: err.message,
        }));
      });

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: checked,
    }));
  };

  const inputChange = (e) => {
    const { name, value } = e.target;

    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: err.message,
        }));
      });

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");

    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log("success", res);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };
  return (
    <div className="container">
      <h2>SIGN UP</h2>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">Name, username</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Will Smith"
          value={formState.name}
          onChange={inputChange}
        ></input>
        <br />
        <label htmlFor="email">E-mail</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          value={formState.email}
          onChange={inputChange}
        ></input>
        {errors.email.length > 0 && <p className="error">{errors.email}</p>}
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={inputChange}
        ></input>
        {errors.password.length > 0 && (
          <p className="error">{errors.password}</p>
        )}
        <br />
        <br />
        <label htmlFor="checkbox">
          I accept the terms of service and privacy policy.
        </label>
        <input
          type="checkbox"
          id="checkbox"
          name="terms"
          checked={formState.terms}
          onChange={checkboxChange}
        ></input>
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;
