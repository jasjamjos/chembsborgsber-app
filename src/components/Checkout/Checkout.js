import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import CheckoutInfo from './CheckoutInfo/CheckoutInfo';

const Checkout = (props) => {
  let summary = <Redirect to="/" />
  if (props.ingredients) { 
    summary = (
      <div>
        <CheckoutSummary {...props} ingredients={props.ingredients}/>
        <Route path={`${props.match.path}/continue`} component={CheckoutInfo}/>
      </div>
    )
  }

  return summary;
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)