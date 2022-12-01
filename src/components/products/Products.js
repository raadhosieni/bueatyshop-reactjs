import { Fragment } from "react";
import ProductCard from "./ProductCard";

import classes from "./Products.module.css";

const Products = (props) => {
  return (
    <Fragment>
      <h2 className={classes.title}>Latest Products</h2>
      <div className={classes.grid}>
        {props.products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default Products;
