import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orders_create_order } from "../actions/orders";
import OrderDetails from "../components/order/OrderDetails";
import OrderSummary from "../components/order/OrderSummary";

import classes from "./PlaceOrderPage.module.css";

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.createOrder);

  const history = useHistory();

  const dispatch = useDispatch();

  const { status, orderId } = order;

  useEffect(() => {
    if (status === "success") {
      history.push(`/orders/${orderId}`);
    }
  }, [status, orderId]);

  const { shippingAddress, paymentMethod, items, totalAmount } = cart;

  const shippingPrice = 30;
  const taxPrice = totalAmount * 0.1;

  const placeOrderHandler = () => {
    const orderData = {
      user: user.id,
      items,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice: totalAmount + shippingPrice + taxPrice,
    };

    dispatch(orders_create_order(orderData));
  };

  return (
    <div className={classes.order}>
      <div className={classes.details}>
        <OrderDetails
          shippingAddress={shippingAddress}
          paymentMethod={paymentMethod}
          items={items}
        />
      </div>
      <div className={classes.summary}>
        <OrderSummary
          totalAmount={totalAmount}
          shippingPrice={shippingPrice}
          taxPrice={taxPrice}
        />
        <div className={classes.actions}>
          <button className="btn" onClick={placeOrderHandler}>
            {order.status === "pending" ? "Sending..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
