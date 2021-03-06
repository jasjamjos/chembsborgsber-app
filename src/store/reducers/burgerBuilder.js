import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: {},
  totalPrice: 0,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 1.1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      }

    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.ingredient] < 1) return state;

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      }

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }

    default:
      return state;
  }
}

export default reducer;