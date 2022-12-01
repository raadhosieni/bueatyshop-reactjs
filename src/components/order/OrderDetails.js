import OrderItem from "./OrderItem";

import classes from "./OrderDetails.module.css";

const OrderDetails = (props) => {
  return (
    <section className={classes.orderDetails}>
      <div>
        <h1>Shipping</h1>
        <p>
          Address: {props.shippingAddress.address}, {props.shippingAddress.city}{" "}
          {props.shippingAddress.postalcode}, {props.shippingAddress.country}
        </p>
      </div>
      <div>
        <h1>Payment Method</h1>
        <p>Method: {props.paymentMethod}</p>
      </div>
      <div>
        <h1>Order Items</h1>
        <ul>
          {props.items.map((item) => (
            <OrderItem
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OrderDetails;
