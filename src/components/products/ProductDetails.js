import classes from "./ProductDetails.module.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const ProductDetails = (props) => {
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
  return (
    <div className={classes.productDetails}>
      <div className={classes.image}>
        <img src={`http://localhost:5000${props.image}`} alt={props.name} />
      </div>
      <div className={classes.info}>
        <div>
          <h2 className={classes.name}>{props.name} </h2>
        </div>
        <div className={classes.price}>Price: {props.price} JOD</div>
        <div>
          <p>Description: {props.description}</p>
        </div>
      </div>
      <div className={classes.actions}>
        <div>Price: {props.price} JOD</div>
        <div>Status: {props.status}</div>
        <div>
          <button className="btn" onClick={addItemToCartHandler}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
