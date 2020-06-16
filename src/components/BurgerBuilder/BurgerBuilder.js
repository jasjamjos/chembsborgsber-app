import React, { useState } from 'react';

import Burger from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls';
import Modal from '../UI/Modal/Modal';
import OrderSummary from '../Burger/OrderSummary/OrderSummary';

import Aux from '../hoc/Aux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.3,
    bacon: 1.1
}

const BurgerBuilder = () => {
    const [ingredients, setIngredients] = useState({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => {
                return sum + el;
            },0);

        setPurchasable(sum > 0);
    }

    const purchaseHandler = () => setPurchasing(!purchasing);

    const proceedPurchaseHandler = () => {
        alert('OKAYNAMS?!😂️')
    }

    const addIngredientHandler = (type) => {
        const allIngredients = {...ingredients};

        allIngredients[type] = allIngredients[type] + 1;

        setIngredients(allIngredients);
        updateTotalPrice(allIngredients);
        updatePurchaseState(allIngredients);
    }

    const removeIngredientHandler = (type) => {
        const allIngredients = {...ingredients};
        
        if (allIngredients[type] > 0) {
            allIngredients[type] = allIngredients[type] - 1;

            setIngredients(allIngredients);
            updateTotalPrice(allIngredients);
            updatePurchaseState(allIngredients);
        };
    }

    const updateTotalPrice = (ingredients) => {
        const totalPrice = Object.keys(ingredients)
            .map((ingredient) => {
                return INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
        }).reduce((sum, curr) => sum + curr);

        setTotalPrice(totalPrice);
    }

    return (
        <Aux>
            <Modal modalClosed={purchaseHandler} show={purchasing}>
                <OrderSummary 
                    purchaseCancelled={purchaseHandler} 
                    purchaseContinued={proceedPurchaseHandler} 
                    ingredients={ingredients}
                    price={totalPrice}
                />
            </Modal>
            <Burger ingredients={ingredients}/>
            <BuildControls
                addIngredient={addIngredientHandler}
                removeIngredient={removeIngredientHandler}
                price={totalPrice}
                purchasable={purchasable}
                purchasing={purchaseHandler}
            />
        </Aux>
    );
}

export default BurgerBuilder;