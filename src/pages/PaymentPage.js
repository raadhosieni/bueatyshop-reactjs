import { useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../components/UI/Input";

import classes from "./PaymentPage.module.css";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart";

const PaymentPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod);

  const paymentMethodChangeHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // save payment method
    dispatch(cartActions.savePaymentMethod(paymentMethod));

    //forward to placeorder page
    history.push("/placeorder");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1 className={classes.title}>Payment</h1>
      <p className={classes.label}>Select a payment method</p>
      <Input
        className={classes["form-control"]}
        id="paypal"
        label="PayPal"
        input={{
          type: "radio",
          name: "paymentmethod",
          value: "paypal",
          onChange: paymentMethodChangeHandler,
        }}
      />

      <Input
        className={classes["form-control"]}
        id="stripe"
        label="Stripe"
        input={{
          type: "radio",
          name: "paymentmethod",
          value: "stripe",
          onChange: paymentMethodChangeHandler,
        }}
      />
      <div className={classes.actions}>
        <button type="submit" className="btn">
          Continue
        </button>
      </div>
    </form>
  );
};

export default PaymentPage;
