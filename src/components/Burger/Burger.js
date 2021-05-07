import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  //console.log(props)  //by using withRouter to inject routing objects to props ==>history,location,match

  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      // console.log(igKey)
      // console.log( [...Array(props.ingredients[igKey])]) //access the value
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    }) //flatten the array with reduce
    .reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
    }, []);

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please add ingredients &#128523; &#128523;</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
