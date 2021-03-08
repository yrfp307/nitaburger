import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../backdrop/Backdrop';
import Hoc from '../../../hoc/hoc/Hoc';

const Modal = props => {
        return (
        <Hoc>
        <Backdrop show = {props.show} clicked={props.modalClosed} />
        <div className={classes.Modal}
         style={{
             transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
             opacity: props.show ? '1' : '0'
         }}>
        {props.children}
        </div>
        </Hoc>
        );
};

export default React.memo(
    Modal, (prevProps, nextProps) => 
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children);