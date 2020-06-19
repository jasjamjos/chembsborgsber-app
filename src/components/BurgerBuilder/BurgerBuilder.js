import React, { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  
  useEffect(() => {
    const fetchIngredients = () => {
      BurgerBuilderAPI.get('/ingredients.json')
      .then(({data}) => {
          setIngredients(data);
          updateTotalPrice(data);
        }).catch((error) => {
          setError(true);
        });
      }
      
      fetchIngredients();
    }, [])
  
    const updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => {
      return sum + el;
    },0);
    
    setPurchasable(sum > 0);
  }
  
  const purchaseHandler = () => setPurchasing(!purchasing);
  
  const proceedPurchaseHandler = () => {
    // setLoading(true);
    // const order = {
    //   ingredients: ingredients,
    //   price: totalPrice,
    //   customer: {
    //     name: 'Jasper Jose',
    //     email: 'jasjamjos@gmail.com',
    //     address: {
    //       street: 'Test Street 69',
    //       zipcode: '8000',
    //       country: 'Finland'
    //     }
    //   },
    //   deliveryMethod: 'fastest'
    // }

    // BurgerBuilderAPI.post('/orders.json', order)
    // .then((response) => {
    //   setPurchasing(false)
    //   setLoading(false)
    // }).catch((error) => {
    //   setLoading(false)
    //   setPurchasing(false)
    // });
    const params = Object.entries(ingredients)
      .map(([key, val]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
      }).join('&');

    props.history.push({
      pathname: '/checkout',
      search: `?${params}`
    });
  }
  
  const addIngredientHandler = (type) => {
    const allIngredients = {...ingredients};
    
    allIngredients[type] = allIngredients[type] + 1;
    
    setIngredients(allIngredients);
    updateTotalPrice(allIngredients);
    updatePurchaseState(allIngredients);
  }
  
  const removeIngredientHandler = (type) => {
    const allIngredients = {...ingredients};
    
    if (allIngredients[type] > 0) {
      allIngredients[type] = allIngredients[type] - 1;
      
      setIngredients(allIngredients);
      updateTotalPrice(allIngredients);
      updatePurchaseState(allIngredients);
    };
  }
  
  const updateTotalPrice = (ingredients) => {
    const totalPrice = Object.keys(ingredients)
    .map((ingredient) => {
      return INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
    }).reduce((sum, curr) => sum + curr);
    
    setTotalPrice(totalPrice);
  }
  
  let burger = error ? <p style={{textAlign: 'center'}}>Ingredients can be loaded!</p> : <Spinner />
  let orderSummary;
  
  if(ingredients) {
    orderSummary = (
      <OrderSummary 
      purchaseCancelled={purchaseHandler} 
        purchaseContinued={proceedPurchaseHandler} 
        ingredients={ingredients}
        price={totalPrice}
        />
        )
        
        burger = (
        <Aux>
          <Burger ingredients={ingredients}/>,
          <BuildControls
              addIngredient={addIngredientHandler}
              removeIngredient={removeIngredientHandler}
            price={totalPrice}
            purchasable={purchasable}
            purchasing={purchaseHandler}
          />
        </Aux>
      );
  }

  loading && (orderSummary = <Spinner />);

  return (
    <Aux>
      <Modal modalClosed={purchaseHandler} show={purchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
    );
  }
  
  export default errorHandler(BurgerBuilder, BurgerBuilderAPI);