import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const Shipping = (props) => {
  return (
    <div>
      <h1>Shipping</h1>
      {props.user && (
        <div>
          <p>
            <strong>Name: </strong>
            {props.user.name}
          </p>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${props.user.email}`}>{props.user.email}</a>
          </p>
        </div>
      )}
      <p>
        <strong>Address: </strong>
        {props.shippingAddress.address}, {props.shippingAddress.city}{" "}
        {props.shippingAddress.postalcode}, {props.shippingAddress.country}
      </p>
      {props.user ? (
        props.isDelivered ? (
          <div className="success">
            Delivered At: {props.deliveredAt.substring(0, 10)}
          </div>
        ) : (
          <div className="danger">Not Delivered</div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Shipping;
