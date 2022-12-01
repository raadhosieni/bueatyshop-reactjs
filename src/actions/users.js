import { userActions } from "../store/user";

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
