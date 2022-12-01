import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Products from "./pages/Admin/Products";
import Users from "./pages/Admin/Users";
import Orders from "./pages/Admin/Orders";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";

import { userActions } from "./store/user";
import { cartActions } from "./store/cart";

function App() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { expiresInDate } = user;

  useEffect(() => {
    const timeIndentifier = setInterval(() => {
      if (expiresInDate && expiresInDate < Date.now()) {
        localStorage.removeItem("userData");
        dispatch(userActions.logout());
        dispatch(dispatch(cartActions.clearCart()));
      }
    }, 1000);

    return () => {
      clearInterval(timeIndentifier);
    };
  }, [expiresInDate, dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(user.expiresInDate);

  const isLogin = !!user.token;

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/products/:productId">
          <ProductPage />
        </Route>

        <Route path="/login">
          {!isLogin && <LoginPage />}
          {isLogin && <Redirect to="/" />}
        </Route>

        {isLogin && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}

        <Route path="/cart">
          {isLogin && <CartPage />}
          {!isLogin && <Redirect to="/login" />}
        </Route>

        <Route path="/shipping">
          {isLogin && <ShippingPage />}
          {!isLogin && <Redirect to="/login" />}
        </Route>

        <Route path="/payment">
          {isLogin && <PaymentPage />}
          {!isLogin && <Redirect to="/login" />}
        </Route>

        <Route path="/placeorder">
          {isLogin && <PlaceOrderPage />}
          {!isLogin && <Redirect to="/login" />}
        </Route>

        {isLogin && user.isAdmin && (
          <Route path="/admin/products">
            <Products />
          </Route>
        )}

        {isLogin && user.isAdmin && (
          <Route path="/admin/users">
            <Users />
          </Route>
        )}

        {isLogin && user.isAdmin && (
          <Route path="/admin/orders">
            <Orders />
          </Route>
        )}

        <Route path="*">
          <div>Not Found</div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
