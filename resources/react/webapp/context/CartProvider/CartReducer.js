import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE
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

        default:
            return state;
    }
}
