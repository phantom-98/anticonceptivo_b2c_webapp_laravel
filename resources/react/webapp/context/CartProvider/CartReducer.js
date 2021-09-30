import {
    MINI_CART_OPEN,
    MINI_CART_CLOSE,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    CLEAR_CART,
    IS_CART_READY
} from "./types";
import { LOCAL_STORAGE } from "../LocalStorage";
import toastr from 'toastr';

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
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "4000",
                "hideDuration": "1000",
                "timeOut": "4000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

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


            //Se debe refactorizar
            if (cartItems.length > 0 && cartItems[found] ) {

                if((cartItems[found].quantity + item.quantity)> (item.product.subcategory.category.quantity_limit ?? 1)){
                    toastr.error(`<div>
                        <div>El limite de la categoría  <b>${item.product.subcategory.category.name}</b> es de ${item.product.subcategory.category.quantity_limit ?? 1} unidad</div>
                    </div>`)

                    return {
                        ...state,
                        cartItems: [...cartItems]
                    };
                }

                if(cartItems[found].subscription == null){
                    cartItems[found].quantity = cartItems[found].quantity + item.quantity;
                }

            } else {

                if((item.quantity)> (item.product.subcategory.category.quantity_limit ?? 1)){
                    toastr.error(`<div>
                        <div>El limite de la categoría  <b>${item.product.subcategory.category.name}</b> es de ${item.product.subcategory.category.quantity_limit ?? 1} unidad</div>
                    </div>`)
                    return {
                        ...state,
                        cartItems: [...cartItems]
                    };
                }

                cartItems = [...cartItems, item];
            }

            localStorage.setItem(
                LOCAL_STORAGE.CART_ITEMS,
                JSON.stringify([...cartItems])
            );


            toastr.info(`<div>
                <div>Producto <b>${item.product.name}</b> añadido al carrito</div>
            </div>`)

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
                cartItems: [...cart]
            };
        case REMOVE_FROM_CART:
            console.log(state);
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

        case IS_CART_READY:
            return {
                ...state,
                isCartReady: true
            }

        default:
            return state;
    }
};
