import { createOrderActions } from "../store/createOrder";
import { getOrderActions } from "../store/getOrder";
import { cartActions } from "../store/cart";
import { updatePaymentActions } from "../store/updatePayment";
import { getOrdersActions } from "../store/getOrders";
import { updateDeliveredActions } from "../store/updateDelivered";

export const orders_create_order = (order) => async (dispatch, getState) => {
  dispatch(createOrderActions.createOrderRequest());

  const token = getState().user.token;

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Order creation failed");
    }

    const data = await response.json();

    dispatch(cartActions.clearCart());

    dispatch(createOrderActions.createOrderSuccess(data.order._id));
  } catch (err) {
    dispatch(createOrderActions.createOrderFailed(err.message));
  }
};

export const orders_get_order = (orderId) => async (dispatch, getState) => {
  dispatch(getOrderActions.getOrderRequest());

  const token = getState().user.token;
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Get order data failed");
    }

    const data = await response.json();
    console.log(data);

    dispatch(getOrderActions.getOrderSuccess(data));
  } catch (err) {
    dispatch(getOrderActions.getOrderFailed(err.message));
  }
};

export const orders_get_orders = () => async (dispatch, getState) => {
  dispatch(getOrdersActions.request());

  const token = getState().user.token;

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fetch orders failed");
    }

    const data = await response.json();

    dispatch(getOrdersActions.success(data.orders));
  } catch (err) {
    dispatch(getOrdersActions.fail(err));
  }
};

export const orders_update_payment =
  (orderId, paymentDetails) => async (dispatch, getState) => {
    dispatch(updatePaymentActions.updatePaymentRequest());

    const token = getState().user.token;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/pay`,
        {
          method: "PATCH",
          body: JSON.stringify({ paymentDetails }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Update payment failed");
      }

      const data = await response.json();

      dispatch(updatePaymentActions.updatePaymentSuccess());
    } catch (err) {
      dispatch(updatePaymentActions.updatePaymentFailed(err));
    }
  };

export const orders_update_delivered =
  (orderId) => async (dispatch, getState) => {
    dispatch(updateDeliveredActions.request());

    const { token } = getState().user;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/deliver`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Update order as delivered failed");
      }

      const data = await response.json();

      console.log(data);

      dispatch(updateDeliveredActions.success());
    } catch (err) {
      dispatch(updateDeliveredActions.fail(err));
    }
  };
