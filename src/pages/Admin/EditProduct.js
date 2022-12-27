import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {
  products_get_product,
  products_update_product,
} from "../../actions/products";

import { updateProductActions } from "../../store/updateProduct";

import classes from "./EditProduct.module.css";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  const { productId } = useParams();

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.getProduct);
  const { status: updateProductStatus } = useSelector(
    (state) => state.updateProduct
  );

  useEffect(() => {
    dispatch(updateProductActions.reset());

    if (!product || product._id !== productId) {
      dispatch(products_get_product(productId));
    } else {
      setName(product.name);
      setCategory(product.category);
      setBrand(product.brand);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setImage(product.image);
      setSize(product.size);
    }
  }, [productId, product]);

  useEffect(() => {
    if (updateProductStatus === "success") {
      dispatch(products_get_product(productId));
    }
  }, [updateProductStatus, productId]);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const brandChangeHandler = (e) => {
    setBrand(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const CountInStockChangeHandler = (e) => {
    setCountInStock(e.target.value);
  };

  const sizeChangeHandler = (e) => {
    setSize(e.target.value);
  };

  const imageChangeHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.text();

      setImage(data);
    } catch (err) {}
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const product = {
      name,
      category,
      brand,
      description,
      price,
      countInStock,
      size,
      image,
    };

    dispatch(products_update_product(productId, product));
  };

  return (
    <div>
      <Link to="/admin/products">Go Back</Link>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1 className={classes["form-header"]}>Edit Product</h1>
        <div className={classes["form-control"]}>
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={nameChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={categoryChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={brandChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Price</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={0}
            value={price}
            onChange={priceChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Count In Stock</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={0}
            value={countInStock}
            onChange={CountInStockChangeHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label>Size</label>
          <select value={size} onChange={sizeChangeHandler}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className={classes["form-control"]}>
          <label>Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={imageChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <button className="btn" type="submit">
            {updateProductStatus === "pending"
              ? "Sending..."
              : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
