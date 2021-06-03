import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART, UPDATE_QUANTITY
} from "./types";
import {LOCAL_STORAGE} from "../LocalStorage";

export default (state, action) => {

    switch (action.type) {

        case MINI_CART_OPEN:

            return {
                ...state,
                showingMiniCart: true,
            };

        case MINI_CART_CLOSE:
            return {
                ...state,
                showingMiniCart: false,
            };

        case ADD_TO_CART:

            let cartItems = state.cartItems;
            const item = action.payload
            const found = cartItems.findIndex(c => c.product_id == item.product.id)

            if (cartItems.length > 0 && cartItems[found]) {
                cartItems[found].quantity = cartItems[found].quantity + item.quantity
            } else {
                cartItems = [
                    ...cartItems,
                    item
                ]
            }

            localStorage.setItem(LOCAL_STORAGE.CART_ITEMS, JSON.stringify([...cartItems]));

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...cartItems]
            };
        case UPDATE_CART:
            let cart= JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART_ITEMS))
            console.log(cart,324234324)
            if (cart == null) {
                cart = []
            }
            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...cart]
            };

        case REMOVE_FROM_CART:
            const list = state.cartItems;
            const filtered = list.filter(c => c.product_id != action.payload)

            localStorage.setItem(LOCAL_STORAGE.CART_ITEMS, JSON.stringify(filtered));

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: filtered
            };

        case UPDATE_QUANTITY:

            let items = state.cartItems;
            const itemUpdate = action.payload
            const foundUpdate = items.findIndex(c => c.product_id == itemUpdate.product.id)

            if(!itemUpdate.quantity){
                items = items.filter(c => c.product_id != action.payload)
            }else{
                items[foundUpdate].quantity = itemUpdate.quantity
            }

            localStorage.setItem(LOCAL_STORAGE.CART_ITEMS, JSON.stringify([...items]));

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...items]
            };

        default:
            return state;
    }
}
