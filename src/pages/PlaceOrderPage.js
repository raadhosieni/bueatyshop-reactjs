import { useSelector } from "react-redux";
import OrderDetails from "../components/order/OrderDetails";
import OrderSummary from "../components/order/OrderSummary";

import classes from "./PlaceOrderPage.module.css";

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress, paymentMethod, items, totalAmount } = cart;

  const shippingPrice = 30;
  const taxPrice = totalAmount * 0.1;

  const placeOrderHandler = () => {
    const order = {
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      shippingPrice,
      taxPrice,
    };

    console.log(order);
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
          onSaveOrder={placeOrderHandler}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPage;
