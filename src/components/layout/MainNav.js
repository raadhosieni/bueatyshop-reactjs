import { NavLink, Link } from "react-router-dom";

import classes from "./MainNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

const MainNav = () => {
  const user = useSelector((state) => state.user);

  const isLogin = !!user.token;
  const isAdmin = user.isAdmin;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">BueatyShop</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
              Cart
            </NavLink>
          </li>
          {!isLogin && (
            <li>
              <NavLink activeClassName={classes.active} to="/login">
                <FontAwesomeIcon icon={faUser} />
                Login
              </NavLink>
            </li>
          )}
          {isLogin && (
            <li>
              <UserMenu isAdmin={isAdmin} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNav;
