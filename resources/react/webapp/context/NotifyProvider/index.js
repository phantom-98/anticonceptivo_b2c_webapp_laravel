import React, {createContext, useContext, useEffect, useReducer} from 'react';
import NotifyReducer from "./NotifyReducer";
import {AuthContext} from "../AuthProvider";
import * as Services from "../../Services";
import {NOTIFIES_GET_LIST} from "./types";
import {PUSHER, AuthType} from "../../Globals";
import Pusher from 'pusher-js';

export const NotifyContext = createContext(null);

const NotifyProvider = (props) => {

    const {auth, authType} = useContext(AuthContext);

    const pusher = new Pusher(PUSHER.APP_KEY, {
        cluster: PUSHER.APP_CLUSTER
    });

    const initialState = {
        notifies: [],
        notifiesCount : 0,
    }

    useEffect(() => {
        if (authType) {
            getNotifyNotViewed()

            const channelPublic = pusher.subscribe('notify-public');

            channelPublic.bind('notify-public', function (data) {
                if (data.command === 'notify-not-viewed') {
                    getNotifyNotViewed();
                }
            });
        }
    }, [auth, authType])

    const getNotifyNotViewed = () => {
        let url = Services.ENDPOINT.PANEL.COMMON.NOTIFIES.GET_NOT_VIEWED;
            let data = {
                auth_type : authType,
                auth_id : authType == AuthType.PROFESSIONAL ? auth.professional_id : auth.company_id
            }
            Services.DoPost(url, data)
                .then(response => {
                    Services.Response({
                        response: response,
                        success: () => {
                            getNotifies(response.data.notifies)
                        },
                        error: () => {
                            getNotifies([])
                        },
                    });
                })
                .catch(error => {
                    getNotifies([])
                    Services.ErrorCatch(error);
                });
    }



    const [state, dispatch] = useReducer(NotifyReducer, initialState);

    const getNotifies = (notifies) => {
        dispatch({
            type: NOTIFIES_GET_LIST,
            payload: notifies,
        })
    }

    return (
        <NotifyContext.Provider value={{
            notifies : state.notifies,
            notifiesCount: state.notifiesCount
        }}>
            {props.children}
        </NotifyContext.Provider>
    );
};

export default NotifyProvider;

