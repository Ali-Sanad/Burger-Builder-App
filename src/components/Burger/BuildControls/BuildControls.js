import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
// import faker from "faker";
const BuildControls = (props) => {
//   console.log(props.price);
  const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
  ];
  return (
    <div className={classes.BuildControls}>
      <h4>
        Current price : $ {/* {faker.finance.currencySymbol()} */}
        {props.price.toFixed(2)}
      </h4>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            Label={ctrl.label}
            addIngredientHandler={() => props.addIngredientHandler(ctrl.type)}
            removeIngredientHandler={() =>
              props.removeIngredientHandler(ctrl.type)
            }
            disabledInfo={props.disabledInfo[ctrl.type]}
          />
        );
      })}
      <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={()=>props.purchaseHandler()}
      >{props.isAuthenticated ?'Order Now' : 'Signup To Order'}</button>
    </div>
  );
};

export default BuildControls;
