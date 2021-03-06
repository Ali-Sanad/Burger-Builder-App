import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.Label}</div>
      <button 
      className={classes.Less}
      onClick={()=>props.removeIngredientHandler()}
      disabled={props.disabledInfo}
      >Less</button>
      <button 
      className={classes.More}
      onClick={()=>props.addIngredientHandler()}
      >More</button>
    </div>
  );
};

export default BuildControl;
