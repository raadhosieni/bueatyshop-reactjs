import { useSelector } from "react-redux";
import CartList from "../components/cart/CartList";
import CartDetails from "../components/cart/CartDetails";
import classes from "./CartPage.module.css";
import { Fragment } from "react";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className={classes.cart}>
      {!cart.items || cart.items.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <Fragment>
          <section className={classes.list}>
            <CartList items={cart.items} />
          </section>
          <section className={classes.details}>
            <CartDetails />
          </section>
        </Fragment>
      )}
    </div>
  );
};

export default CartPage;
