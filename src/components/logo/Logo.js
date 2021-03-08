import React from 'react';
import myBurgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={myBurgerLogo} alt="myBurger" />
    </div>
)

export default logo;