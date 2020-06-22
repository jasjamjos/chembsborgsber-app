import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Item.module.css'

const Item = (props) => {
    return (
        <li className={classes.Item}>
            <NavLink
                exact={props.exact}
                to={props.link} 
                activeClassName={classes.active}
            >
                {props.children}
            </NavLink>
        </li>
    );
}

export default Item;