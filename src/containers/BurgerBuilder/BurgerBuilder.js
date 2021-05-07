import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as allActions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredient } = props;
  useEffect(() => {
    onInitIngredient();
  }, [onInitIngredient]);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      //showing the modal
      setPurchasing(true);
    } else {
      //storing that user will be redirected to checkout page after being authenticated
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchased();
    props.history.push("/checkout");
  };

  const updatePurchasable = (orderedIngredients) => {
    const sum = Object.keys(orderedIngredients)
      .map((igKey) => {
        return orderedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
    //{salad:true, bacon:false}
    // console.log(disabledInfo);
  }

  let orderSummary = null;
  //showing spinner if get request interrupted
  let burger = props.error ? (
    <p className="text-center mt-5 h3 text-danger">
      ingredients cant be loaded .....!!!
    </p>
  ) : (
    <Spinner />
  );

  if (props.ings) {
    burger = (
      <>
        <Burger ingredients={props.ings} />
        <BuildControls
          addIngredientHandler={props.onIngredientAdded}
          removeIngredientHandler={props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          price={props.price}
          purchasable={updatePurchasable(props.ings)}
          purchaseHandler={purchaseHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </>
    );

    ////
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancelHandler={purchaseCancelHandler}
        purchaseContinueHandler={purchaseContinueHandler}
      />
    );
  }

  //render!!!!!!!
  return (
    <>
      <Modal show={purchasing} purchaseCancelHandler={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(allActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(allActions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(allActions.initIngredient()),
    onInitPurchased: () => dispatch(allActions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(allActions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
