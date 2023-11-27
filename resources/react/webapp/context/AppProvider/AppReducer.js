import {
    MODAL_AUTH_SHOW,
    MODAL_AUTH_HIDE,
    MODAL_AUTH_SHOW_SUCCESS_SHOW,
    MODAL_AUTH_SHOW_SUCCESS_HIDE,
    MODAL_PASSWORD_UPDATE_SUCCESS_SHOW,
    MODAL_PASSWORD_UPDATE_SUCCESS_HIDE,
    SET_TOKEN_MODAL_AUTH, SET_DIMENSION,
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
            };

        case MODAL_PASSWORD_UPDATE_SUCCESS_SHOW:
            return {
                ...state,
                showingModalPasswordUpdate: true
            }

        case MODAL_PASSWORD_UPDATE_SUCCESS_HIDE:
            return {
                ...state,
                showingModalPasswordUpdate: false
            }

        case SET_TOKEN_MODAL_AUTH:
            return {
                ...state,
                token: action.payload
            }

        case SET_DIMENSION:
            return {
                ...state,
                breakpoint: action.payload
            }
        default:
            return state;
    }
}
