import { useEffect, Fragment } from "react";
import Products from "../components/products/Products";
import { getAllProducts } from "../helpers/api";
import useHttp from "../hooks/use-http";

const HomePage = () => {
  const {
    isLoading,
    error,
    data: loadingProducts,
    requestData,
  } = useHttp(getAllProducts);

  useEffect(() => {
    requestData();
  }, []);

  let content;
  if (isLoading) {
    content = <div className="spinner">Loading...</div>;
  }
  if (error) {
    content = <div className="error">{error}</div>;
  }

  if (loadingProducts && loadingProducts.length > 0) {
    content = <Products products={loadingProducts} />;
  }

  return content;
};

export default HomePage;
