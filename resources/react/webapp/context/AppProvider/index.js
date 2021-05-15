import React, {createContext, useReducer} from 'react';
import {PUSHER} from "../../Globals";
import Pusher from 'pusher-js';
import ModalAuth from "../../components/modals/ModalAuth";
import ModalSuccess from "../../components/modals/ModalAuth/ModalSuccess";
import AppReducer from "./AppReducer";
import {
    MODAL_AUTH_HIDE,
    MODAL_AUTH_SHOW,
    MODAL_AUTH_SHOW_SUCCESS_SHOW,
    MODAL_AUTH_SHOW_SUCCESS_HIDE,
} from "./types";

export const AppContext = createContext(null);

const AppProvider = (props) => {

    const pusher = new Pusher(PUSHER.APP_KEY, {
        cluster: PUSHER.APP_CLUSTER
    });

    const pusherNotifyChannel = pusher.subscribe('notify');

    const initialState = {
        showingModalAuth: false,
        modalAuthType: '', // GLOBALS ModalAuthMode

        showingModalAuthSuccess: false,
        modalAuthSuccessType: '',
    };

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const showModalAuth = (mode) => {
        dispatch({
            type: MODAL_AUTH_SHOW,
            payload: mode
        })
    }

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

    return (
        <AppContext.Provider value={{
            pusherNotifyChannel,

            showingModalAuth : state.showingModalAuth,
            modalAuthType : state.modalAuthType,
            showingModalAuthSuccess : state.showingModalAuthSuccess,
            modalAuthSuccessType : state.modalAuthSuccessType,

            showModalAuth : showModalAuth,
            hideModalAuth : hideModalAuth,
            showModalAuthSuccess : showModalAuthSuccess,
            hideModalAuthSuccess : hideModalAuthSuccess,

        }}>
            {props.children}

            <ModalAuth/>
            <ModalSuccess/>

        </AppContext.Provider>
    );
};

export default AppProvider;
