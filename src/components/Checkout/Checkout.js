import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import CheckoutInfo from './CheckoutInfo/CheckoutInfo';

const Checkout = (props) => {
  const [ingredients,setIngredients] = useState({
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0
  });
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const fetchQuery = () => {
      const data = {};
      for (let [key, value] of query.entries()) {
        key === 'price' ? setPrice(+value) : data[key] = +value;
      }

      return data;
    }
    
    setIngredients(fetchQuery());
  }, [])


  return (
    <div>
      <CheckoutSummary {...props} ingredients={ingredients}/>
      <Route path={`${props.match.path}/continue`} render={() => <CheckoutInfo {...props} price={price} ingredients={ingredients}/>}/>
    </div>
  );
}

export default Checkout