import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import classes from "./UserMenu.module.css";

import { user_logout } from "../../actions/users";

const UserMenu = (props) => {
  const [showMenu, setShowMenu] = useState();

  const dispatch = useDispatch();

  const toggleShowHandler = () => {
    setShowMenu((prevState) => !prevState);
  };

  const hideHandler = () => {
    setShowMenu(false);
  };

  const logoutHandler = () => {
    dispatch(user_logout());
  };

  return (
    <div className={classes.menu}>
      <button onClick={toggleShowHandler}>
        {props.isAdmin ? "Admin" : "User"}
      </button>
      {showMenu && (
        <ul onClick={hideHandler}>
          {props.isAdmin && (
            <Fragment>
              <li>
                <Link to="/admin/products">Products</Link>
              </li>
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
              <li>
                <Link to="/admin/orders">Orders</Link>
              </li>
            </Fragment>
          )}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
