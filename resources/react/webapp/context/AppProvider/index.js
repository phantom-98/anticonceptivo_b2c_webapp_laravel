import React, {createContext, useState} from 'react';
import {PUSHER} from "../../Globals";
import Pusher from 'pusher-js';

export const AppContext = createContext(null);

const AppProvider = (props) => {

    const pusher = new Pusher(PUSHER.APP_KEY, {
        cluster: PUSHER.APP_CLUSTER
    });
    const pusherNotifyChannel = pusher.subscribe('notify');

    return (
        <AppContext.Provider value={{
            pusherNotifyChannel
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
