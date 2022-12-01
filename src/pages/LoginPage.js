import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../components/users/LoginForm";

import { user_login } from "../actions/users";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginHandler = (userData, isLogin) => {
    dispatch(user_login(userData, isLogin));
  };

  return <LoginForm onLogin={loginHandler} />;
};

export default LoginPage;
