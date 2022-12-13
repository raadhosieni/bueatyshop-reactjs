import OrderItem from "./OrderItem";

const OrderItems = (props) => {
  return (
    <div>
      <h1>Order Items</h1>
      <ul>
        {props.items.map((item) => (
          <OrderItem
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderItems;
