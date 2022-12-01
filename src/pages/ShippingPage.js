import { useHistory } from "react-router-dom";

import Input from "../components/UI/Input";
import useInput from "../hooks/use-input";

import classes from "./ShippingPage.module.css";

import { notEmpty } from "../helpers/validation";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);

  const history = useHistory();

  const { shippingAddress } = cart;

  console.log(cart);

  const dispatch = useDispatch();

  const {
    valid: enteredAddressValid,
    value: enteredAddress,
    hasError: addressInputHasError,
    inputChangeHandler: addressInputChangeHandler,
    inputBlurHandler: addressInputBlurHandler,
  } = useInput(notEmpty, shippingAddress.address);

  const {
    valid: enteredCityValid,
    value: enteredCity,
    hasError: cityInputHasError,
    inputChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
  } = useInput(notEmpty, shippingAddress.city);

  const {
    valid: enteredPostalcodeValid,
    value: enteredPostalcode,
    hasError: postalcodeInputHasError,
    inputChangeHandler: postalcodeInputChangeHandler,
    inputBlurHandler: postalcodeInputBlurHandler,
  } = useInput(notEmpty, shippingAddress.postalcode);

  const {
    valid: enteredCountryValid,
    value: enteredCountry,
    hasError: countryInputHasError,
    inputChangeHandler: countryInputChangeHandler,
    inputBlurHandler: countryInputBlurHandler,
  } = useInput(notEmpty, shippingAddress.country);

  const formIsValid =
    enteredAddressValid &&
    enteredCityValid &&
    enteredPostalcodeValid &&
    enteredCountryValid;

  const submitHandler = (e) => {
    e.preventDefault();

    //save shipping address
    dispatch(
      cartActions.saveShippingAddress({
        address: enteredAddress,
        city: enteredCity,
        postalcode: enteredPostalcode,
        country: enteredCountry,
      })
    );

    // forward to payment page
    history.push("/payment");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1 className={classes.title}>Shipping</h1>
      <Input
        className={`${classes["form-control"]} ${
          addressInputHasError ? classes.invalid : ""
        }`}
        id="address"
        label="Address"
        input={{
          type: "text",
          placeholder: "Enter Your Address",
          onChange: addressInputChangeHandler,
          onBlur: addressInputBlurHandler,
          value: enteredAddress,
        }}
      />
      <Input
        className={`${classes["form-control"]} ${
          cityInputHasError ? classes.invalid : ""
        }`}
        id="city"
        label="City"
        input={{
          type: "text",
          placeholder: "Enter Your City",
          onChange: cityInputChangeHandler,
          onBlur: cityInputBlurHandler,
          value: enteredCity,
        }}
      />
      <Input
        className={`${classes["form-control"]} ${
          postalcodeInputHasError ? classes.invalid : ""
        }`}
        id="postalcode"
        label="Postal Code"
        input={{
          type: "text",
          placeholder: "Enter Your Postal Code",
          onChange: postalcodeInputChangeHandler,
          onBlur: postalcodeInputBlurHandler,
          value: enteredPostalcode,
        }}
      />
      <Input
        className={`${classes["form-control"]} ${
          countryInputHasError ? classes.invalid : ""
        }`}
        id="country"
        label="Country"
        input={{
          type: "text",
          placeholder: "Enter Your Country",
          onChange: countryInputChangeHandler,
          onBlur: countryInputBlurHandler,
          value: enteredCountry,
        }}
      />
      <div className={classes.actions}>
        <button type="submit" className="btn" disabled={!formIsValid}>
          Continue
        </button>
      </div>
    </form>
  );
};

export default ShippingPage;
