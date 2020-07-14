import * as actionTypes from './actionTypes';
import { BurgerBuilderAPI } from '../../components/api';

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredient
  }
}

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredient
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
    return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
  return (dispatch) => {
    BurgerBuilderAPI.get('/ingredients.json')
      .then(({data}) => {
          dispatch(setIngredients(data));
        }).catch((error) => {
          dispatch(fetchIngredientsFailed());
        });
  }
};