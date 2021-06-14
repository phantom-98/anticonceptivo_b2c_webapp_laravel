import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART, 
    UPDATE_QUANTITY,
    CLEAR_CART
} from "./types";
import { LOCAL_STORAGE } from "../LocalStorage";

export default (state, action) => {
    switch (action.type) {
        case MINI_CART_OPEN:
            return {
                ...state,
                showingMiniCart: true
            };

        case MINI_CART_CLOSE:
            return {
                ...state,
                showingMiniCart: false
            };

        case ADD_TO_CART:
            let cartItems = state.cartItems;

            const item = action.payload;
            const found = cartItems.findIndex(
                c =>
                    (c.product_id == item.product.id &&
                    (c.subscription == null ? null : c.subscription.id) ===
                        (item.subscription == null
                            ? null
                            : item.subscription.id))
            );

            if (cartItems.length > 0 && cartItems[found] ) {
                cartItems[found].quantity =
                    cartItems[found].quantity + item.quantity;
            } else {
                cartItems = [...cartItems, item];
            }

            localStorage.setItem(
                LOCAL_STORAGE.CART_ITEMS,
                JSON.stringify([...cartItems])
            );

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...cartItems]
            };
        case UPDATE_CART:
            let cart = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE.CART_ITEMS)
            );
            if (cart == null) {
                cart = [];
            }
            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...cart]
            };

        case REMOVE_FROM_CART:
            const list = state.cartItems;
            const filtered = list.filter(
                c =>
                c.product_id != action.payload.product.id ||
                (c.subscription == null ? null : c.subscription.id) !=
                    (action.payload.subscription == null
                        ? null
                        : action.payload.subscription.id)
            );
            localStorage.setItem(
                LOCAL_STORAGE.CART_ITEMS,
                JSON.stringify(filtered)
            );

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: filtered
            };

        case UPDATE_QUANTITY:
            let items = state.cartItems;
            const itemUpdate = action.payload;
            const foundUpdate = items.findIndex(
                c =>
                    (c.product_id == itemUpdate.product.id &&
                    (c.subscription == null ? null : c.subscription.id) ===
                        (itemUpdate.subscription == null
                            ? null
                            : itemUpdate.subscription.id))
            );

            if (!itemUpdate.quantity) {
                items = items.filter(c => c.product_id != action.payload);
            } else {
                items[foundUpdate].quantity = itemUpdate.quantity;
            }

            localStorage.setItem(
                LOCAL_STORAGE.CART_ITEMS,
                JSON.stringify([...items])
            );

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...items]
            };

        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state;
    }
};
