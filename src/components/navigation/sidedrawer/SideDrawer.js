import React from 'react';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationitems/NavigationItems';
import Backdrop from '../../UI/backdrop/Backdrop';
import Hoc from '../../../hoc/hoc/Hoc';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Hoc>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </Hoc>
    )
}

export default sideDrawer;