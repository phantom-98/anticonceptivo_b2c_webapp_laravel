import React, {createContext, useReducer, useState} from 'react';
import {PUSHER} from "../../Globals";
import Pusher from 'pusher-js';
import ModalAuth from "../../components/modals/ModalAuth";
import AppReducer from "./AppReducer";
import {
    MODAL_AUTH_HIDE,
    MODAL_AUTH_SHOW
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

    return (
        <AppContext.Provider value={{
            pusherNotifyChannel,

            showingModalAuth : state.showingModalAuth,
            modalAuthType : state.modalAuthType,
            showModalAuth : showModalAuth,
            hideModalAuth : hideModalAuth,

        }}>
            {props.children}

            <ModalAuth/>

        </AppContext.Provider>
    );
};

export default AppProvider;
