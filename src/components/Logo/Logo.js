import React from 'react';

import classes from './Logo.module.css'
import image from '../assets/images/burger-logo.png';

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={image} alt="Logo"/>
        </div>
    )
}

export default Logo;