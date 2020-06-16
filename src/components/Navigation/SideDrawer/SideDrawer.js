import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux';

import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
    let attached = [classes.SideDrawer, classes.Close];

    if (props.show) {
        attached = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.show} clicked={props.toggle}/>
            <div className={attached.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;