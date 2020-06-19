import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  const checkoutCancelled = () => {
    props.history.goBack();
  }
  const checkoutContinued = () => {
    props.history.replace('/checkout/continue');
  }

  return(
    <div className={classes.CheckoutSummary}>
      <h1>Checkout the best burger!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button clicked={checkoutCancelled} btnType="Danger">CANCEL</Button>
      <Button clicked={checkoutContinued} btnType="Success">CONTINUE</Button>
    </div>
  );
}

export default CheckoutSummary;