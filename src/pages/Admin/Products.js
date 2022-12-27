import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  products_get_products,
  products_delete_product,
  products_create_product,
} from "../../actions/products";

import { createProductActions } from "../../store/createProduct";
import { deleteProductActions } from "../../store/deleteProduct";

//fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import classes from "./Products.module.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.getProducts);
  const { status: deleteStatus } = useSelector((state) => state.deleteProduct);
  const { status: createStatus, product } = useSelector(
    (state) => state.createProduct
  );
  const history = useHistory();

  useEffect(() => {
    dispatch(products_get_products());
  }, []);

  useEffect(() => {
    dispatch(createProductActions.reset());
    dispatch(deleteProductActions.reset());

    if (deleteStatus === "success") {
      dispatch(products_get_products());
    }

    if (createStatus === "success") {
      // go to product edit page
      history.push(`/admin/products/${product._id}/edit`);
    }
  }, [deleteStatus, createStatus]);

  console.log(createStatus);

  const deleteProductHandler = (productId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(products_delete_product(productId));
    }
  };

  const createProductHandler = () => {
    dispatch(products_create_product());
  };

  const editProductHandler = (productId) => {
    history.push(`/admin/products/${productId}/edit`);
  };

  return (
    <div className={classes.products}>
      <h1 className={classes.header}>Products</h1>
      <button className="btn" onClick={createProductHandler}>
        Create Product
      </button>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price} JOD</td>
                <td>{product.category}</td>
                <td>{product.size}</td>

                <td>
                  <button
                    className="btn-alt"
                    onClick={editProductHandler.bind(this, product.id)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="btn-alt dng"
                    onClick={deleteProductHandler.bind(this, product.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
