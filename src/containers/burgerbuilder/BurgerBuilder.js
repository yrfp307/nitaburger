import React, { useState, useEffect, useCallback } from  'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import instance from '../../axios-orders';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildcontrols/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/ordersummary/OrderSummary';
import Hoc from '../../hoc/hoc/Hoc';
import Spinner from '../../components/UI/spinner/Spinner';
import errorHandler from '../../hoc/errorhandler/ErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();
    const ingreds = useSelector (state => {
        return state.burgerBuilder.ingredients
    });
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    const onIngredientAdded = (ingredName) => dispatch(actions.addIngredient(ingredName));
    const onIngredientRemoved = (ingredName) => dispatch(actions.removeIngredient(ingredName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce ((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
        setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...ingreds
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (ingreds) {
        burger = (
                    <Hoc>
                    <Burger ingredients={ingreds} />
                    <BuildControls 
                        ingredientAdded = {onIngredientAdded} 
                        ingredientRemoved = {onIngredientRemoved} 
                        disabled = {disabledInfo}
                        purchasable = {updatePurchaseState(ingreds)}
                        ordered= {purchaseHandler}
                        isAuth= {isAuthenticated}
                        price= {price} />
                    </Hoc>
                );
                    orderSummary = <OrderSummary 
                    ingredients={ingreds}
                    price={price}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler} />;
                }
        return (
                <Hoc>
                    <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    {burger}
                </Hoc>
        );
}


export default errorHandler(BurgerBuilder, instance);