import CartItem from "./CartItem";

const CartList = (props) => {
  return (
    <ul>
      {props.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            quantity={item.quantity}
            price={item.price}
          />
        );
      })}
    </ul>
  );
};

export default CartList;
