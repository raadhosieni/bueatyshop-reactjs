import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orders_get_orders } from "../../actions/orders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classes from "./Orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { status, error, orders } = useSelector((state) => state.getOrders);

  useEffect(() => {
    dispatch(orders_get_orders());
  }, []);

  const detailsHandler = (orderId) => {
    history.push(`/orders/${orderId}`);
  };

  return (
    <div>
      <h1 className={classes.header}>Orders</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} JOD</td>
                <td>
                  {order.isPaid ? (
                    <div>{order.paidAt.substring(0, 10)}</div>
                  ) : (
                    <div>
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <div>{order.deliveredAt.substring(0, 10)}</div>
                  ) : (
                    <div>
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={detailsHandler.bind(this, order._id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
