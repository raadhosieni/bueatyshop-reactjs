import { userActions } from "../store/user";
import { cartActions } from "../store/cart";
import { getOrderActions } from "../store/getOrder";
import { createOrderActions } from "../store/createOrder";
import { getUsersActions } from "../store/getUsers";
import { getUserActions } from "../store/getUser";
import { updateUserActions } from "../store/updateUser";
import { deleteUserActions } from "../store/deleteUser";
import { updateUserProfileActions } from "../store/updateUserProfile";

export const user_login = (userData, isLogin) => async (dispatch) => {
  dispatch(userActions.request());
  let url = isLogin
    ? "http://localhost:5000/api/users/login"
    : "http://localhost:5000/api/users/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();

    const loadedUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      token: data.token,
      isAdmin: data.isAdmin,
      expiresInDate: Date.now() + data.expiresIn * 1000,
    };

    localStorage.setItem("userData", JSON.stringify(loadedUser));

    if (isLogin) {
      dispatch(userActions.login(loadedUser));
    } else {
      dispatch(userActions.signup());
    }
  } catch (err) {
    dispatch(userActions.failed(err.message));
  }
};

export const user_logout = () => (dispatch) => {
  dispatch(userActions.logout());
  dispatch(cartActions.clearCart());
  dispatch(createOrderActions.createOrderClear());
  dispatch(getOrderActions.getOrderClear());
  localStorage.removeItem("userData");
};

export const users_get_users = () => async (dispatch, getState) => {
  dispatch(getUsersActions.request());

  const { token } = getState().user;

  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Get users failed");
    }

    const data = await response.json();

    dispatch(getUsersActions.success(data.users));
  } catch (err) {
    dispatch(getUsersActions.fail(err));
  }
};

export const users_get_user = (userId) => async (dispatch, getState) => {
  dispatch(getUserActions.request());

  const { token } = getState().user;

  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Get user data failed");
    }

    const data = await response.json();

    dispatch(getUserActions.success(data));
  } catch (err) {
    dispatch(getUserActions.fail(err));
  }
};

export const users_update_user =
  (userId, userData) => async (dispatch, getState) => {
    dispatch(updateUserActions.request());

    const { token } = getState().user;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Update user failed");
      }

      const data = await response.json();

      dispatch(updateUserActions.success(data));
    } catch (err) {
      dispatch(updateUserActions.fail(err));
    }
  };

export const users_delete_user = (userId) => async (dispatch, getState) => {
  dispatch(deleteUserActions.request());

  const { token } = getState().user;

  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Delete user failed");
    }

    dispatch(deleteUserActions.success());
  } catch (err) {
    dispatch(deleteUserActions.fail(err));
  }
};

export const users_update_profile =
  (userData) => async (dispatch, getState) => {
    dispatch(updateUserProfileActions.request());

    const { id, token } = getState().user;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${id}/profile`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Update profile failed");
      }

      dispatch(updateUserProfileActions.success());
    } catch (err) {
      dispatch(updateUserProfileActions.fail(err));
    }
  };
