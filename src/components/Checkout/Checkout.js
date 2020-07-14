import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import CheckoutInfo from './CheckoutInfo/CheckoutInfo';

const Checkout = (props) => {
  return (
    <div>
      <CheckoutSummary {...props} ingredients={props.ingredients}/>
      <Route path={`${props.match.path}/continue`} component={CheckoutInfo}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)