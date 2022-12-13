import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { orders_get_order, orders_update_payment } from "../actions/orders";
import { orders_update_delivered } from "../actions/orders";

import Shipping from "../components/order/Shipping";
import Payment from "../components/order/Payment";
import OrderItems from "../components/order/OrderItems";
import OrderSummary from "../components/order/OrderSummary";

import { PayPalButton } from "react-paypal-button-v2";

import classes from "./OrderPage.module.css";

const OrderPage = () => {
  const params = useParams();

  const order = useSelector((state) => state.getOrder);

  const user = useSelector((state) => state.user);

  const updatePayment = useSelector((state) => state.updatePayment);

  const updateDeliver = useSelector((state) => state.updateDelivered);

  const dispatch = useDispatch();

  const { orderId } = params;

  useEffect(() => {
    dispatch(orders_get_order(orderId));
  }, [orderId, dispatch]);

  useEffect(() => {
    if (updatePayment.status === "success") {
      dispatch(orders_get_order(orderId));
    }
  }, [updatePayment]);

  useEffect(() => {
    if (updateDeliver.status === "success") {
      dispatch(orders_get_order(orderId));
    }
  }, [updateDeliver]);

  const items =
    order &&
    order.orderDetails &&
    order.orderDetails.orderItems &&
    order.orderDetails.orderItems.map((item) => ({
      id: item._id,
      name: item.name,
      quantity: item.qty,
      price: item.price,
      image: item.image,
    }));

  const updatePaymentHandler = (details, data) => {
    const paymentDetails = {
      id: details.id,
      status: details.status,
      updatedTime: details.update_time,
      emailAddress: details.payer.email_address,
    };

    dispatch(orders_update_payment(orderId, paymentDetails));
  };

  const updateDeliverHandler = () => {
    dispatch(orders_update_delivered(orderId));
  };

  let content;

  if (order.status === "pending") {
    content = <div className="center">Loading...</div>;
  }

  if (order.status === "failed" && order.error) {
    content = <div className="error">{order.error}</div>;
  }

  if (order.status === "success" && !order.orderDetails) {
    content = <div className="center">Order not found</div>;
  }

  if (
    order.status === "success" &&
    order.orderDetails &&
    order.orderDetails.shippingAddress
  ) {
    content = (
      <div className={classes.order}>
        <section className={classes.details}>
          <div>
            <Shipping
              shippingAddress={order.orderDetails.shippingAddress}
              user={order.orderDetails.user}
              isDelivered={order.orderDetails.isDelivered}
              deliveredAt={order.orderDetails.deliveredAt}
            />
          </div>
          <div>
            <Payment
              paymentMethod={order.orderDetails.paymentMethod}
              isPaid={order.orderDetails.isPaid}
              paidAt={order.orderDetails.paidAt}
              user={order.orderDetails.user}
            />
          </div>
          <div>
            <OrderItems items={items} />
          </div>
        </section>
        <section className={classes.summary}>
          <OrderSummary
            totalAmount={order.orderDetails.orderItems.reduce(
              (sum, item) => sum + item.price * item.qty,
              0
            )}
            shippingPrice={order.orderDetails.shippingPrice}
            taxPrice={order.orderDetails.taxPrice}
          />
          <div className={classes.actions}>
            {!order.orderDetails.isPaid && (
              <PayPalButton
                amount={order.orderDetails.totalPrice}
                onSuccess={updatePaymentHandler}
              />
            )}
            {user.isAdmin && !order.orderDetails.isDelivered && (
              <button className="btn" onClick={updateDeliverHandler}>
                Mark As Delivered
              </button>
            )}
          </div>
        </section>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default OrderPage;
