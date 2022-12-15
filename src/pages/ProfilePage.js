import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { users_update_profile } from "../actions/users";

import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const { status: updateUserProfileStatus } = useSelector(
    (state) => state.updateUserProfile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const updateUserProfileHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(users_update_profile(userData));
  };

  return (
    <form className={classes.form} onSubmit={updateUserProfileHandler}>
      <div className={classes["form-control"]}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={nameChangeHandler}
          value={name}
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={emailChangeHandler}
          value={email}
        />
      </div>
      <div className={classes["form-control"]}>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={passwordChangeHandler}
          value={password}
        />
      </div>
      <div className={classes.actions}>
        <button type="submit" className="btn">
          {updateUserProfileStatus === "pending" ? "Sending..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ProfilePage;
