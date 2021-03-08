import React, { useState } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/sidedrawer/SideDrawer';
import Hoc from '../hoc/Hoc';
import classes from './Layout.module.css';

const Layout = props => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const sideDrawerClosedHandler = () => {
        setDrawerVisible(false);
    }
    const sideDrawerToggleHandler = () => {
        setDrawerVisible(!drawerVisible);
    }

    return (
        <Hoc>
        <Toolbar
            isAuth={props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer 
            isAuth={props.isAuthenticated}
            open={drawerVisible} 
            closed={sideDrawerClosedHandler}/>
          <main className={classes.Content}>
              {props.children}
          </main>
      </Hoc>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};
  
export default connect(mapStateToProps)(Layout);