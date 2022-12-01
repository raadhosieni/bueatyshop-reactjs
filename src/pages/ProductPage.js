import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ProductDetails from "../components/products/ProductDetails";
import classes from "./ProductPage.module.css";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        "http://localhost:5000/api/products/" + params.productId
      );

      if (!response.ok) {
        throw new Error("Get product data failed");
      }

      const data = await response.json();

      setProduct(data);
    };

    try {
      getProduct();
    } catch (err) {
      console.log(err);
    }
  }, [params]);

  return (
    <div className={classes.details}>
      <Link to="/">Go Back</Link>
      {product && (
        <ProductDetails
          id={params.productId}
          image={product.image}
          name={product.name}
          price={product.price}
          description={product.description}
          status={product.status}
        />
      )}
    </div>
  );
};

export default ProductPage;
