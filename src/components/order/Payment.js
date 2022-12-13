const Payment = (props) => {
  return (
    <div>
      <h1>Payment Method</h1>
      <p>
        <strong>Method:</strong> {props.paymentMethod}
      </p>
      {props.user ? (
        props.isPaid ? (
          <div className="success">
            Paid At: {props.paidAt.substring(0, 10)}
          </div>
        ) : (
          <div className="danger">Not Paid</div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Payment;
