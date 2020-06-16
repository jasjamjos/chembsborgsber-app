import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate

    render() {
        const summary = Object.keys(this.props.ingredients)
            .map(key => {
                return (
                    <li key={key}>
                        <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                    </li>
                )
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>The best burger in town made by our customer!</p>
                <ul>
                    {summary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">Cancel</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;