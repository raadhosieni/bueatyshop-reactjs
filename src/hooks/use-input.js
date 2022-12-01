import { useState } from "react";

const useInput = (validateFunction, initialValue = "") => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFunction(enteredValue);
  const hasError = isTouched && !isValid;

  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  return {
    valid: isValid,
    value: enteredValue,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
