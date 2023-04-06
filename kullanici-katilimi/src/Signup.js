import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import Register from "./Register.js";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Must be at least 3 characters long"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
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
    terms: false,
    isValid: false,
  });
  const [registeredUser, setRegisteredUser] = useState([]);
  const [buttonOpen, setButtonOpen] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => setButtonOpen(!valid));
  }, [formState]);
  function checkErrors(name, value) {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors((prevState) => ({ ...prevState, [name]: "" }));
      })
      .catch((err) => {
        setErrors((prevState) => ({ ...prevState, [name]: err.errors[0] }));
      });
  }

  function handleChange(event) {
    const { name, value, checked } = event.target;
    const newValue = name === "terms" ? checked : value;
    checkErrors(name, newValue);
    setFormState((prevState) => ({ ...prevState, [name]: newValue }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    //console.log(formState);

    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => setRegisteredUser([...registeredUser, response.data]))
      .catch((err) => {
        console.log("err", err.message);
      });
  }
  function resetForm() {
    setFormState({
      name: "",
      email: "",
      password: "",
      terms: false,
      isValid: false,
    });
  }

  return (
    <div className="container">
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name, username</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Will Smith"
          value={formState.name}
          onChange={handleChange}
        ></input>
        {errors.name.length > 0 && <p className="error">{errors.name}</p>}
        <br />
        <label htmlFor="email">E-mail</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          value={formState.email}
          onChange={handleChange}
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
          onChange={handleChange}
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
          value={formState.terms}
          checked={formState.terms}
          onChange={handleChange}
        ></input>
        <br />
        <br />
        <div className="butonlar">
          <button type="submit" disabled={buttonOpen} onClick={handleSubmit}>
            Register
          </button>
          <button type="button" onClick={resetForm}>
            Formu sıfırla
          </button>
        </div>
        <Register registeredUser={registeredUser} />
      </form>
    </div>
  );
}

export default Signup;
