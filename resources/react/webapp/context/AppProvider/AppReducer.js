import {
    MODAL_AUTH_SHOW,
    MODAL_AUTH_HIDE,
    MODAL_AUTH_SHOW_SUCCESS_SHOW,
    MODAL_AUTH_SHOW_SUCCESS_HIDE,
    SET_TOKEN_MODAL_AUTH,
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

        case MODAL_AUTH_SHOW_SUCCESS_SHOW:
            return {
                ...state,
                showingModalAuthSuccess: true,
                modalAuthSuccessType: action.payload,
            };

        case MODAL_AUTH_SHOW_SUCCESS_HIDE:
            return {
                ...state,
                showingModalAuthSuccess: false,
                modalAuthSuccessType: '',
            };

        case SET_TOKEN_MODAL_AUTH:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}
