import React, {createContext, useEffect, useReducer} from 'react';
import ModalAuth from "../../components/modals/ModalAuth";
import ModalSuccess from "../../components/modals/ModalAuth/ModalSuccess";
import ModalPasswordSuccess from "../../components/modals/ModalAuth/PasswordSuccess";
import AppReducer from "./AppReducer";
import {
    MODAL_AUTH_HIDE,
    MODAL_AUTH_SHOW,
    MODAL_AUTH_SHOW_SUCCESS_SHOW,
    MODAL_AUTH_SHOW_SUCCESS_HIDE,
    MODAL_PASSWORD_UPDATE_SUCCESS_SHOW,
    MODAL_PASSWORD_UPDATE_SUCCESS_HIDE,
    SET_TOKEN_MODAL_AUTH, SET_DIMENSION,
} from "./types";
import useDimension from "../../hooks/useDimension";

export const AppContext = createContext(null);

const AppProvider = (props) => {

    const {breakpoint} = useDimension();

    const initialState = {
        breakpoint: '',
        showingModalAuth: false,
        modalAuthType: '', // GLOBALS ModalAuthMode

        showingModalAuthSuccess: false,
        modalAuthSuccessType: '',

        showingModalPasswordUpdate: false,

        token: '',
    };


    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        setDimension(breakpoint);
    }, [breakpoint]);

    const showModalAuth = (mode) => {
        dispatch({
            type: MODAL_AUTH_SHOW,
            payload: mode
        })
    }

    const setDimension = (breakpoint) => {
        if (state.breakpoint != breakpoint) {
            dispatch({
                type: SET_DIMENSION,
                payload: breakpoint,
            });
        }
    };

    const hideModalAuth = () => {
        dispatch({
            type: MODAL_AUTH_HIDE,
        })
    }

    const showModalAuthSuccess = (mode) => {
        dispatch({
            type: MODAL_AUTH_SHOW_SUCCESS_SHOW,
            payload: mode
        })
    }

    const hideModalAuthSuccess = () => {
        dispatch({
            type: MODAL_AUTH_SHOW_SUCCESS_HIDE,
        })
    }

    const showModalPasswordSuccess = (mode) => {
        console.log('dentro de la función showModalPasswordSuccess');
        dispatch({
            type: MODAL_PASSWORD_UPDATE_SUCCESS_SHOW,
            payload: mode
        })
    }

    const hideModalPasswordSuccess = () => {
        console.log('dentro de la función hideModalPasswordSuccess');
        dispatch({
            type: MODAL_PASSWORD_UPDATE_SUCCESS_HIDE,
        })
    }

    const setTokenModalAuth = (token) => {
        dispatch({
            type: SET_TOKEN_MODAL_AUTH,
            payload: token
        });
    }

    const getTokenModalAuth = () => {
        return state.token;
    }

    return (
        <AppContext.Provider value={{

            breakpoint: state.breakpoint,

            showingModalAuth: state.showingModalAuth,
            modalAuthType: state.modalAuthType,
            showingModalAuthSuccess: state.showingModalAuthSuccess,
            modalAuthSuccessType: state.modalAuthSuccessType,
            showingModalPasswordUpdate: state.showingModalPasswordUpdate,

            showModalAuth: showModalAuth,
            hideModalAuth: hideModalAuth,

            showModalAuthSuccess: showModalAuthSuccess,
            hideModalAuthSuccess: hideModalAuthSuccess,

            showModalPasswordSuccess: showModalPasswordSuccess,
            hideModalPasswordSuccess: hideModalPasswordSuccess,

            setTokenModalAuth: setTokenModalAuth,
            getTokenModalAuth: getTokenModalAuth

        }}>
            {props.children}

            <ModalAuth/>
            <ModalSuccess/>
            <ModalPasswordSuccess/>

        </AppContext.Provider>
    );
};

export default AppProvider;
