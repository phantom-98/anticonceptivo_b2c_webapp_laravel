import React, {createContext, useState} from 'react';
import {PUSHER} from "../../Globals";
import Pusher from 'pusher-js';

export const AppContext = createContext(null);

const AppProvider = (props) => {

    const [data, setData] = useState(null);
    const [navbar, setNavbar] = useState('teal')

    const pusher = new Pusher(PUSHER.APP_KEY, {
        cluster: PUSHER.APP_CLUSTER
    });
    const pusherNotifyChannel = pusher.subscribe('notify');

    return (
        <AppContext.Provider value={{
            data,
            navbar,
            setNavbar,
            pusherNotifyChannel
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
