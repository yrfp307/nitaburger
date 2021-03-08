import React from 'react';
import Button from '../../UI/button/Button';
import Hoc from '../../../hoc/hoc/Hoc';

const OrderSummary = props => {
        const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)
        });
        
        return (
            <Hoc>
            <h3>Your Order</h3>
            <p>Ingredients of your burger:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
            </Hoc>  
        )
}

export default OrderSummary;