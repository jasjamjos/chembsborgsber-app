import React from 'react';

import classes from './Control.module.css';

const Control = (props) => {
    return (
        <div className={classes.Control}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.removed} className={classes.Less}> - </button>
            <button onClick={props.added} className={classes.More}> + </button>
        </div>
    );
}

export default Control;