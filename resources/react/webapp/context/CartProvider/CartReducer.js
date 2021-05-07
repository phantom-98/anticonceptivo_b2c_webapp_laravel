import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE,
    ADD_TO_CART,
    REMOVE_FROM_CART, UPDATE_QUANTITY
} from "./types";

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

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...cartItems]
            };

        case REMOVE_FROM_CART:
            const list = state.cartItems;
            const filtered = list.filter(c => c.product_id != action.payload)

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

            return {
                ...state,
                // showingMiniCart: false,
                cartItems: [...items]
            };

        default:
            return state;
    }
}
