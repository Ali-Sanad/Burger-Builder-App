import classes from "./Order.module.css";
const Order = (props) => {
  let ingredient = Object.keys(props.ingredients).map((ig, idx) => {
    return (
      <li
        key={idx + ig}
        style={{
          listStyle: "none",
          display: "inline-block",
          textTransform: "capitalize",
          border: "1px solid lightgray",
          padding: "5px",
          margin: "0 8px",
        }}
      >
        {ig}: {props.ingredients[ig]}
      </li>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredient} </p>

     <div className="d-flex justify-content-between mt-4">
     <div className="align-content-center">
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(1)}</strong>
      </div>

      <button className="btn btn-danger btn-sm d-block " onClick={props.deleteOrder}>
        Delete Order
      </button>
     </div>
    </div>
  );
};

export default Order;
