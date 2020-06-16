import React, { useState } from 'react';

import Aux from '../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawerHandler = () => setShowDrawer(!showDrawer);

    return (
        <Aux>
            <Toolbar toggle={toggleDrawerHandler} />
            <SideDrawer show={showDrawer} toggle={toggleDrawerHandler} />
            <main className={classes.content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;