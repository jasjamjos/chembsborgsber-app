import React from 'react';

import Item from './Item/Item';

import classes from './NavigationItems.module.css'

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <Item link="/" active>Borgsber Builder</Item>
            <Item link="/">Checkout</Item>
        </ul>
    );
}

export default NavigationItems;