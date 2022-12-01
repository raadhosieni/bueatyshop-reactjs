import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  return (
    <li key={props.id} className={classes.item}>
      <img src={props.image} alt={props.name} />
      <div>{props.name}</div>
      <div>{props.quantity} * </div>
      <div>{props.price} JOD</div>
      <div>{props.quantity * props.price} JOD</div>
    </li>
  );
};

export default OrderItem;
