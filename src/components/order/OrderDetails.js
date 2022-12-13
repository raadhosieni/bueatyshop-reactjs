import Shipping from "./Shipping";
import Payment from "./Payment";
import OrderItems from "./OrderItems";

import classes from "./OrderDetails.module.css";

const OrderDetails = (props) => {
  return (
    <section className={classes.orderDetails}>
      <Shipping shippingAddress={props.shippingAddress} />
      <Payment paymentMethod={props.paymentMethod} />
      <OrderItems items={props.items} />
    </section>
  );
};

export default OrderDetails;
