import React from 'react';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationitems/NavigationItems';
import DrawerToggle from '../sidedrawer/drawertoggle/DrawerToggle';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
        <Logo />
        </div>
    <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
    </header>
)

export default toolbar;