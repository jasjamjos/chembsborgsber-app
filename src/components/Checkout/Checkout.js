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

  useEffect(() => {
    const fetchQuery = () => {
      const query = new URLSearchParams(props.location.search);
      const data = {};
      for (let [key, value] of query.entries()) {
        data[key] = +value;
      }

      return data;
    }
    
    setIngredients(fetchQuery());
  }, [props.location.search])


  return (
    <div>
      <CheckoutSummary {...props} ingredients={ingredients}/>
      <Route path={`${props.match.path}/continue`} component={CheckoutInfo}/>
    </div>
  );
}

export default Checkout