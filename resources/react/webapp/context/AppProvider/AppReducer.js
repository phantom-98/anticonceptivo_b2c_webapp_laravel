import {
    MODAL_AUTH_SHOW,
    MODAL_AUTH_HIDE
} from "./types";

export default (state, action) => {

    switch (action.type) {
        case MODAL_AUTH_SHOW:
            return {
                ...state,
                showingModalAuth: true,
                modalAuthType: action.payload,
            };

        case MODAL_AUTH_HIDE:
            return {
                ...state,
                showingModalAuth: false,
                modalAuthType: '',
            };

        default:
            return state;
    }
}
