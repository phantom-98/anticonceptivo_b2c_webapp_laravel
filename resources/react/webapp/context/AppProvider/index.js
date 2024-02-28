import React, { createContext, useEffect, useReducer } from "react";
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
    SET_TOKEN_MODAL_AUTH,
    SET_DIMENSION,
    SET_MODE,
    CHANGE_THEME,
    MODAL_CHANGE_STORE,
    RECOVER_STORE,
} from "./types";
import useDimension from "../../hooks/useDimension";
import ModalStore from "../../components/modals/ModalStore";

export const AppContext = createContext(null);

const AppProvider = (props) => {
    const { breakpoint } = useDimension();

    const initialState = {
        breakpoint: "",
        theme: "anticonceptivo",
        showingModalAuth: false,
        modalAuthType: "", // GLOBALS ModalAuthMode
        currentStore: "anticonceptivo",
        showingModalAuthSuccess: false,
        modalAuthSuccessType: "",
        showingModalStoreChange: false,
        showingModalPasswordUpdate: false,

        token: "",
    };
    const recoverStore = () => {
        dispatch({
            type: RECOVER_STORE,
        });
    };
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(() => {
        document.documentElement.className = state.currentStore;
    }, [state.currentStore]);
    useEffect(() => {
        recoverStore();
    }, []);
    const toggleTheme = (themeName) => {
        dispatch({
            type: CHANGE_THEME,
            payload: themeName,
        });
    };
    useEffect(() => {
        setDimension(breakpoint);
    }, [breakpoint]);

    const showModalAuth = (mode) => {
        dispatch({
            type: MODAL_AUTH_SHOW,
            payload: mode,
        });
    };
    const setStore = (store) => {
        dispatch({
            type: SET_MODE,
            payload: store,
        });
    };

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
        });
    };

    const showModalAuthSuccess = (mode) => {
        dispatch({
            type: MODAL_AUTH_SHOW_SUCCESS_SHOW,
            payload: mode,
        });
    };

    const hideModalAuthSuccess = () => {
        dispatch({
            type: MODAL_AUTH_SHOW_SUCCESS_HIDE,
        });
    };

    const showModalPasswordSuccess = (mode) => {
        console.log("dentro de la función showModalPasswordSuccess");
        dispatch({
            type: MODAL_PASSWORD_UPDATE_SUCCESS_SHOW,
            payload: mode,
        });
    };
    const showModalStoreChange = (mode) => {
        dispatch({
            type: MODAL_CHANGE_STORE,
            payload: mode,
        });
    };

    const hideModalPasswordSuccess = () => {
        console.log("dentro de la función hideModalPasswordSuccess");
        dispatch({
            type: MODAL_PASSWORD_UPDATE_SUCCESS_HIDE,
        });
    };

    const setTokenModalAuth = (token) => {
        dispatch({
            type: SET_TOKEN_MODAL_AUTH,
            payload: token,
        });
    };

    const getTokenModalAuth = () => {
        return state.token;
    };

    return (
        <AppContext.Provider
            value={{
                breakpoint: state.breakpoint,
                theme: state.theme,
                showingModalAuth: state.showingModalAuth,
                modalAuthType: state.modalAuthType,
                showingModalStoreChange: state.showingModalStoreChange,
                showingModalAuthSuccess: state.showingModalAuthSuccess,
                modalAuthSuccessType: state.modalAuthSuccessType,
                showingModalPasswordUpdate: state.showingModalPasswordUpdate,
                currentStore: state.currentStore,
                showModalAuth: showModalAuth,
                hideModalAuth: hideModalAuth,
                setStore: setStore,
                showModalAuthSuccess: showModalAuthSuccess,
                hideModalAuthSuccess: hideModalAuthSuccess,
                toggleTheme: toggleTheme,
                showModalPasswordSuccess: showModalPasswordSuccess,
                hideModalPasswordSuccess: hideModalPasswordSuccess,
                showModalStoreChange: showModalStoreChange,
                setTokenModalAuth: setTokenModalAuth,
                getTokenModalAuth: getTokenModalAuth,
            }}
        >
            {props.children}
            <ModalStore />
            <ModalAuth />
            <ModalSuccess />
            <ModalPasswordSuccess />
        </AppContext.Provider>
    );
};

export default AppProvider;
