import classes from "./CartDetails.module.css";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CartDetails = () => {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();

  const checkoutHandler = () => {
    history.push("/shipping");
  };

  return (
    <div className={classes.cartDetails}>
      <div className={classes.item}>
        <div className={classes.title}>SubTotal</div>
        <div className={classes.value}>{cart.totalAmount} JOD</div>
      </div>
      <div className={classes.item}>
        <div className={classes.title}></div>
        <div className={classes.value}>
          <button className="btn" onClick={checkoutHandler}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
