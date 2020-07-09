import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Burger from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls';
import Modal from '../UI/Modal/Modal';
import OrderSummary from '../Burger/OrderSummary/OrderSummary';
import Aux from '../hoc/Aux';
import { BurgerBuilderAPI } from '../api';
import errorHandler from '../hoc/ErrorHandler/ErrorHandler';

import Spinner from '../UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  bacon: 1.1
}

const BurgerBuilder = (props) => {
  const [ingredients, setIngredients] = useState(null);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(false);
  
  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => {
    return sum + el;
    },0);
    
    return sum > 0;
  }
  
  const purchaseHandler = () => setPurchasing(!purchasing);
  
  const proceedPurchaseHandler = () => {
    props.history.push('/checkout');
  }
  
  let burger = error ? <p style={{textAlign: 'center'}}>Ingredients can be loaded!</p> : <Spinner />
  let orderSummary;
  
  if(props.ingredients) {
    orderSummary = (
      <OrderSummary 
      purchaseCancelled={purchaseHandler} 
        purchaseContinued={proceedPurchaseHandler} 
        ingredients={props.ingredients}
        price={props.totalPrice}
        />
        )
        
        burger = (
        <Aux>
          <Burger ingredients={props.ingredients}/>,
          <BuildControls
              addIngredient={props.onAddIngredient}
              removeIngredient={props.onRemoveIngredient}
            price={props.totalPrice}
            purchasable={updatePurchaseState(props.ingredients)}
            purchasing={purchaseHandler}
          />
        </Aux>
      );
  }

  return (
    <Aux>
      <Modal modalClosed={purchaseHandler} show={purchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
    );

}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredient}),
    onRemoveIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient})
  }
}

  
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, BurgerBuilderAPI));