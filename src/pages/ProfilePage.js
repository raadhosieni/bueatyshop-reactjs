import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <form className={classes.form}>
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
          Update
        </button>
      </div>
    </form>
  );
};

export default ProfilePage;
