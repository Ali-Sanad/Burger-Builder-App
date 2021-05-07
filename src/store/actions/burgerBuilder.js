import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "https://react-burger-builder-e7a71-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
        );
        //setting ingredients on reload
        dispatch(setIngredient(response.data));
      } catch (error) {
        dispatch(fetchIngredientsFailed());
      }
    };
    fetchIngredients();
  };
};
