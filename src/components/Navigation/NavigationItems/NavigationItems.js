import React from 'react';

import Item from './Item/Item';

import classes from './NavigationItems.module.css'

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <Item exact link="/">Borgsber Builder</Item>
            <Item link="/orders">Orders</Item>
        </ul>
    );
}

export default NavigationItems;