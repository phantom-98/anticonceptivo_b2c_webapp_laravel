import React, { createContext, useReducer, useEffect } from 'react';
import CartReducer from "./CartReducer";
import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE,
    UPDATE_CART,
    ADD_TO_CART,
    REPEAT_ORDER,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    CLEAR_CART,
    IS_CART_READY,
    SAVE_DATA_FOR_STEP_TWO
} from "./types";

export const CartContext = createContext(null);

const CartProvider = (props) => {

    const initialState = {
        showingMiniCart: false,
        cartItems: [],
        isCartReady: false,
        dataForStepTwo: null,
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    useEffect(() => {
        updateCart()
    }, [])

    const showMiniCart = () => {
        dispatch({
            type: MINI_CART_OPEN,
        })
    }

    const hideMiniCart = () => {
        dispatch({
            type: MINI_CART_CLOSE,
        })
    }

    const updateCart = () => {
        dispatch({
            type: UPDATE_CART
        })
    }

    const repeatOrder = (orderItem) => {
        dispatch({
            type: REPEAT_ORDER,
            payload: {
                orderItem: orderItem,
            }
        })
    }

    const addToCart = (quantity, product, subscription) => {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                quantity: quantity,
                product: product,
                product_id: product.id,
                subscription: subscription
            }
        })
    }

    const removeFromCart = (item) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: item
        })
    }

    const updateQuantity = (quantity, product, subscription) => {
        dispatch({
            type: UPDATE_QUANTITY,
            payload: {
                quantity: quantity,
                product: product,
                product_id: product.id,
                subscription: subscription
            }
        })
    }

    const clearCart = () => {
        dispatch({
            type: CLEAR_CART,
        })
        return true;
    }

    const checkCart = () => {
        dispatch({
            type: IS_CART_READY
        })
    }

    const saveDataForStepTwo = (data) => {
        console.log('saving data for step two')
        dispatch({
            type: SAVE_DATA_FOR_STEP_TWO,
            payload: data
        })
    }

    return (
        <CartContext.Provider value={{
            showingMiniCart: state.showingMiniCart,
            containsSubscriptions: state.containsSubscriptions,

            cartItems: state.cartItems,
            isCartReady: state.isCartReady,

            dataForStepTwo: state.dataForStepTwo,

            showMiniCart: showMiniCart,
            hideMiniCart: hideMiniCart,
            updateCart: updateCart,
            repeatOrder: repeatOrder,

            clearCart: clearCart,
            checkCart: checkCart,

            addToCart: addToCart,
            removeFromCart: removeFromCart,
            updateQuantity: updateQuantity,

            saveDataForStepTwo: saveDataForStepTwo,
        }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
