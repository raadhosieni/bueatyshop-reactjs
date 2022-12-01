import { Link, useHistory } from "react-router-dom";

import Card from "../UI/Card";

import classes from "./ProductCard.module.css";

const ProductCard = (props) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push(`/products/${props.id}`);
  };

  return (
    <Card className={classes.product} onClick={clickHandler}>
      <div className={classes.header}>
        <img src={props.image} alt={props.name} />
      </div>
      <div>
        <div className={classes.name}>{props.name}</div>
        <p className={classes.description}>{props.description}</p>
        <div className={classes.price}>{props.price} JOD</div>
      </div>
    </Card>
  );
};

export default ProductCard;
