import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions';

import Burger from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls';
import Modal from '../UI/Modal/Modal';
import OrderSummary from '../Burger/OrderSummary/OrderSummary';
import Aux from '../hoc/Aux';
import { BurgerBuilderAPI } from '../api';
import errorHandler from '../hoc/ErrorHandler/ErrorHandler';

import Spinner from '../UI/Spinner/Spinner';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    let prevIngredients = {...props.ingredients}
    const setIngredients = async () => {
      await props.onInitIngredients();
    }

    if (prevIngredients !== props.ingredients) setIngredients();
  }, []);
  
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
  
  let burger = props.error ? <p style={{textAlign: 'center'}}>Ingredients can be loaded!</p> : <Spinner />
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) => dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) => dispatch(burgerBuilderActions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, BurgerBuilderAPI));