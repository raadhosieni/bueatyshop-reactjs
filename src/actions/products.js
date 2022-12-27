import { getProductsActions } from "../store/getProducts";
import { deleteProductActions } from "../store/deleteProduct";
import { createProductActions } from "../store/createProduct";
import { getProductActions } from "../store/getProduct";
import { updateProductActions } from "../store/updateProduct";

export const products_get_products = () => async (dispatch, getState) => {
  dispatch(getProductsActions.request());

  const { token } = getState().user;

  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "GET",
      headers: {
        Authentication: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Get products failed");
    }

    const data = await response.json();

    dispatch(getProductsActions.success(data.products));
  } catch (err) {
    dispatch(getProductsActions.fail(err));
  }
};

export const products_get_product = (productId) => async (dispatch) => {
  dispatch(getProductActions.request());

  try {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`
    );

    if (!response.ok) {
      throw new Error("Get product failed");
    }

    const data = await response.json();

    dispatch(getProductActions.success(data));
  } catch (err) {
    dispatch(getProductActions.fail(err));
  }
};

export const products_delete_product =
  (productId) => async (dispatch, getState) => {
    console.log("delete product action", productId);

    dispatch(deleteProductActions.request());

    const { token } = getState().user;

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Delete product failed");
      }

      dispatch(deleteProductActions.success());
    } catch (err) {
      dispatch(deleteProductActions.fail(err));
    }
  };

export const products_create_product = () => async (dispatch, getState) => {
  dispatch(createProductActions.request());

  const { token } = getState().user;

  try {
    const response = await fetch("http://localhost:5000/api/products/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Create product failed");
    }

    const data = await response.json();

    dispatch(createProductActions.success(data));
  } catch (err) {
    dispatch(createProductActions.fail(err));
  }
};

export const products_update_product =
  (productId, productData) => async (dispatch, getState) => {
    dispatch(updateProductActions.request());

    const { token } = getState().user;

    try {
      const config = {
        method: "PUT",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(config);
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        config
      );

      if (!response.ok) {
        throw new Error("Update product failed");
      }

      const data = await response.json();

      console.log(data);

      dispatch(updateProductActions.success());
    } catch (err) {
      dispatch(updateProductActions.fail(err));
    }
  };
