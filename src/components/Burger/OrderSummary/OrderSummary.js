import React from "react";
import Button from "../../UI/Button/Button";
import faker from 'faker'

const OrderSummary = (props) => {


  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>Order ingredients :</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {faker.finance.currencySymbol()} {props.price.toFixed(2)} </strong></p>
      <p>Continue to Checkout ??</p>
      <Button btnType='Danger' clicked={props.purchaseCancelHandler}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinueHandler}>CONTINUE</Button>
    </>
  );
};

export default OrderSummary;
