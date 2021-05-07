import React, {createContext, useReducer} from 'react';
import CartReducer from "./CartReducer";
import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE,
    ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY
} from "./types";

import MiniCart from "../../components/shopping/MiniCart";

export const CartContext = createContext(null);

const CartProvider = (props) => {

    const initialState = {
        showingMiniCart: false,
        cartItems: [{"quantity":5,"product":{"id":2,"image":"/themes/web/products/product-2.png","name":"ZOELY ESTRADIOL / NOMEGESTROL ACETATO","slug":"zoely-estradiol-nomegestrol-acetato","brand":{"id":2,"name":"MSD"},"category":{"id":2,"name":"Category 2"},"price":"19999"},"product_id":2},{"quantity":1,"product":{"id":3,"image":"/themes/web/products/product-3.png","name":"GYNERA 75/20 ETINILESTRADIOL / GESTODENO","slug":"gynera-75-20-etinilestradiol-gestodeno","brand":{"id":3,"name":"Bayer"},"category":{"id":3,"name":"Category 3"},"price":"9999"},"product_id":3},{"quantity":1,"product":{"id":4,"image":"/themes/web/products/product-4.png","name":"Ginemaxim Cimicifuga Racemosa 40 Mg","slug":"ginemaxim-cimicifuga-racemosa-40-mg","brand":{"id":4,"name":"Bayer"},"category":{"id":4,"name":"Category 4"},"price":"9999"},"product_id":4}]
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
