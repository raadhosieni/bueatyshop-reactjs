import classes from "./OrderSummary.module.css";

const OrderSummary = (props) => {
  const total = props.totalAmount + props.shippingPrice + props.taxPrice;

  return (
    <table className={classes.table}>
      <caption>Order Summary</caption>
      <tr>
        <th>Items:</th>
        <td>{props.totalAmount} JOD</td>
      </tr>
      <tr>
        <th>Shipping:</th>
        <td>{props.shippingPrice} JOD</td>
      </tr>
      <tr>
        <th>Tax:</th>
        <td>{props.taxPrice} JOD</td>
      </tr>
      <tr>
        <th>Total:</th>
        <td>{total} JOD</td>
      </tr>
    </table>
  );
};

export default OrderSummary;
