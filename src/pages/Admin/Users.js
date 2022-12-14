import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { users_get_users, users_delete_user } from "../../actions/users";

import classes from "./Users.module.css";

//fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.getUsers);

  const { status: deleteUserStatus } = useSelector((state) => state.deleteUser);

  const history = useHistory();

  useEffect(() => {
    dispatch(users_get_users());
  }, []);

  useEffect(() => {
    if (deleteUserStatus === "success") {
      dispatch(users_get_users());
    }
  }, [deleteUserStatus]);

  //open user edit page
  const openUserPageHandler = (userId) => {
    history.push(`/admin/users/${userId}/edit`);
  };

  const deleteUserHandler = (userId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(users_delete_user(userId));
    }
  };
  return (
    <div>
      <h1 className={classes.header}>Users</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <div>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={classes.green}
                      />
                    </div>
                  ) : (
                    <div>
                      <FontAwesomeIcon icon={faXmark} className={classes.red} />
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="btn-alt"
                    onClick={openUserPageHandler.bind(this, user._id)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="btn-alt dng"
                    onClick={deleteUserHandler.bind(this, user._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
