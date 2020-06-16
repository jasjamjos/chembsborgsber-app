import React from 'react';

import Control from './Control/Control';

import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => {
    const {addIngredient, removeIngredient, price, purchasable} = props;
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>${price.toFixed(2)}</strong></p>
            {controls.map(({label, type}) => {
                return (
                    <Control
                        key={label}
                        label={label}
                        added={() => addIngredient(type)}
                        removed={() => removeIngredient(type)}
                    />
                );
            })}

            <button onClick={props.purchasing} disabled={!purchasable} className={classes.OrderButton}> <span role="img" aria-label="cart">🛒️</span> Order Now</button>
        </div>
    );
}

export default BuildControls;