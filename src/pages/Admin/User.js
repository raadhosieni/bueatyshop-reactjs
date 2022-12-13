import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { users_get_user, users_update_user } from "../../actions/users";

import classes from "./User.module.css";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const params = useParams();

  const dispatch = useDispatch();

  const { userId } = params;

  const { user } = useSelector((state) => state.getUser);

  const { status: updateUserStatus } = useSelector((state) => state.updateUser);

  useEffect(() => {
    if (!user || !user.name || userId !== user._id) {
      dispatch(users_get_user(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId]);

  useEffect(() => {
    if (updateUserStatus === "success") {
      dispatch(users_get_user(userId));
    }
  }, [updateUserStatus]);

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changeIsAdminHandler = (e) => {
    setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      isAdmin,
    };

    dispatch(users_update_user(userId, userData));
  };

  return (
    <div>
      <Link to="/admin/users">Go Back</Link>
      <form className={classes.form} onSubmit={updateUserHandler}>
        <h2 className={classes["form-header"]}>Edit User</h2>
        <div className={classes["form-control"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={changeNameHandler}
            value={name}
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={changeEmailHandler}
          />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="admin">Admin</label>
          <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={isAdmin}
            onChange={changeIsAdminHandler}
          />
        </div>
        <div className={classes.actions}>
          <button className="btn" type="submit">
            {updateUserStatus === "pending" ? "Sending..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default User;
