import classes from "./CartItem.module.css";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    const item = {
      id: props.id,
      image: props.image,
      name: props.name,
      price: props.price,
      quantity: 1,
      amount: props.price,
    };
    dispatch(cartActions.addItem(item));
  };

  const removeItemFromCartHandler = () => {
    dispatch(cartActions.removeItem(props.id));
  };

  return (
    <li key={props.id} className={classes.item}>
      <img src={props.image} alt={props.name} />
      <div>{props.name}</div>
      <div>{props.quantity} * </div>
      <div>{props.price} JOD</div>
      <div>{props.quantity * props.price} JOD</div>
      <div className={classes.actions}>
        <button className={classes.btn} onClick={removeItemFromCartHandler}>
          -
        </button>
        <button className={classes.btn} onClick={addItemToCartHandler}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
