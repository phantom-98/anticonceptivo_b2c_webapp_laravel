import React, {createContext, useReducer} from 'react';
import CartReducer from "./CartReducer";
import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE
} from "./types";

import MiniCart from "../../components/shopping/MiniCart";

export const CartContext = createContext(null);

const CartProvider = (props) => {

    const initialState = {
        showingMiniCart: false,
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

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
    return (
        <CartContext.Provider value={{
            showingMiniCart: state.showingMiniCart,
            showMiniCart: showMiniCart,
            hideMiniCart: hideMiniCart
        }}>
            {props.children}
            <MiniCart/>
        </CartContext.Provider>
    );
};

export default CartProvider;
