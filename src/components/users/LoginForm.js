import { useState } from "react";
import { useSelector } from "react-redux";

import Input from "../UI/Input";
import classes from "./LoginForm.module.css";
import useInput from "../../hooks/use-input";

import {
  notEmpty,
  validateEmail,
  eightCharacterLong,
  valueMatch,
} from "../../helpers/validation";

const LoginForm = (props) => {
  const [login, setLogin] = useState(true);

  const user = useSelector((state) => state.user);

  const {
    valid: enteredNameValid,
    value: enteredName,
    hasError: nameInputHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(notEmpty);

  const {
    valid: enteredEmailValid,
    value: enteredEmail,
    hasError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = useInput(validateEmail);

  const {
    valid: enteredPasswordValid,
    value: enteredPassword,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
  } = useInput(eightCharacterLong);

  const {
    valid: enteredConfirmPasswordValid,
    value: enteredConfirmPassword,
    hasError: confirmPasswordInputHasError,
    inputChangeHandler: confirmPasswordInputChangeHandler,
    inputBlurHandler: confirmPasswordInputBlurHandler,
  } = useInput(valueMatch.bind(null, enteredPassword));

  let formIsValid;

  if (login) {
    formIsValid = enteredEmailValid && enteredPasswordValid;
  } else {
    formIsValid =
      enteredNameValid &&
      enteredEmailValid &&
      enteredPasswordValid &&
      enteredConfirmPasswordValid;
  }

  const toggleLogin = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    let userData;
    if (login) {
      userData = {
        email: enteredEmail,
        password: enteredPassword,
      };
    } else {
      userData = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };
    }

    props.onLogin(userData, login);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {!login && (
        <Input
          id="name"
          className={`${classes["form-control"]} ${
            nameInputHasError ? classes.invalid : ""
          }`}
          label="Name"
          input={{
            type: "text",
            name: "name",
            placeholder: "Enter your name",
            onChange: nameInputChangeHandler,
            onBlur: nameInputBlurHandler,
            value: enteredName,
          }}
        />
      )}
      <Input
        id="email"
        className={`${classes["form-control"]} ${
          emailInputHasError ? classes.invalid : ""
        }`}
        label="Email"
        input={{
          type: "email",
          name: "email",
          placeholder: "Enter your email",
          onChange: emailInputChangeHandler,
          onBlur: emailInputBlurHandler,
          value: enteredEmail,
        }}
      />

      <Input
        id="password"
        className={`${classes["form-control"]} ${
          passwordInputHasError ? classes.invalid : ""
        }`}
        label="Password"
        input={{
          type: "password",
          name: "password",
          placeholder: "Enter your Password",
          onChange: passwordInputChangeHandler,
          onBlur: passwordInputBlurHandler,
          value: enteredPassword,
        }}
      />

      {!login && (
        <Input
          id="confirm-password"
          className={`${classes["form-control"]} ${
            confirmPasswordInputHasError ? classes.invalid : ""
          }`}
          label={"Confirm Password"}
          input={{
            type: "password",
            name: "confirm-password",
            placeholder: "Confirm your Password",
            onChange: confirmPasswordInputChangeHandler,
            onBlur: confirmPasswordInputBlurHandler,
            value: enteredConfirmPassword,
          }}
        />
      )}
      <div className={classes.actions}>
        <button type="submit" className="btn" disabled={!formIsValid}>
          {user.status === "pending"
            ? "sending..."
            : login
            ? "Login"
            : "Signup"}
        </button>
        <button type="button" className="btn-alt" onClick={toggleLogin}>
          {login ? "You do not have account" : "You already have account"}
        </button>
      </div>
      <div className={classes.message}>
        {user.error && <p>{user.error}</p>}
        {!login && user.status === "success" && (
          <p className="success">User Created</p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
