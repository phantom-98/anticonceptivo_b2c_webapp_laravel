import React, {createContext, useReducer, useEffect} from 'react';
import CartReducer from "./CartReducer";
import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE,
    ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY
} from "./types";
import {LOCAL_STORAGE} from "../LocalStorage";

import MiniCart from "../../components/shopping/MiniCart";

export const CartContext = createContext(null);

const CartProvider = (props) => {

    const initialState = {
        showingMiniCart: false,
        cartItems: []
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART_ITEMS))

        if (cart) {
            state.cartItems = cart;   
        }
    },[])

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

    const addToCart = (quantity, product) => {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                quantity : quantity,
                product : product,
                product_id : product.id
            }
        })
    }

    const removeFromCart = (product_id) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: product_id
        })
    }

    const updateQuantity = (quantity, product) => {
        dispatch({
            type: UPDATE_QUANTITY,
            payload: {
                quantity : quantity,
                product : product,
                product_id : product.id
            }
        })
    }

    return (
        <CartContext.Provider value={{
            showingMiniCart: state.showingMiniCart,
            cartItems: state.cartItems,
            
            showMiniCart: showMiniCart,
            hideMiniCart: hideMiniCart,

            addToCart: addToCart,
            removeFromCart: removeFromCart,
            updateQuantity : updateQuantity,
        }}>
            {props.children}
            <MiniCart/>
        </CartContext.Provider>
    );
};

export default CartProvider;
