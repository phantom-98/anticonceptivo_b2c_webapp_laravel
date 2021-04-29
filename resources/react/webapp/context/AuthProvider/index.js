import React, {useState, createContext, useReducer, useEffect} from 'react';
import {LOCAL_STORAGE} from "../LocalStorage";
import AuthReducer from "./AuthReducer";
import {
    LOGIN,
    LOGOUT,
    UPDATE_AUTH,
    UPDATE_AUTH_TOKEN,
} from "./types";
import * as Services from "../../Services";
import {AuthType} from "../../Globals";
import PUBLIC_ROUTES from "../../routes/publicRoutes";

export const AuthContext = createContext({})

const AuthProvider = (props) => {

    const initialState = {
        auth: null,
        authType: '',
        authToken: '',
        logged: false
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {

        const auth = JSON.parse(localStorage.getItem(LOCAL_STORAGE.AUTH))
        const authToken = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN)
        const authType = localStorage.getItem(LOCAL_STORAGE.AUTH_TYPE)


        if (auth && authToken && authType) {

            dispatch({
                type: LOGIN,
                payload: {
                    auth: auth,
                    auth_token: authToken,
                    auth_type: authType,
                }
            })
        }

    }, [])


    const login = (authType, credentials) => {
        let url = '';

        if (authType === AuthType.PROFESSIONAL) {
            // url = Services.ENDPOINT.AUTH.LOGIN.PROFESSIONAL;
        } else if (authType === AuthType.COMPANY) {
            url = Services.ENDPOINT.AUTH.LOGIN.DOCTOR;
        }

        Services.DoPost(url, credentials).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    dispatch({
                        type: LOGIN,
                        payload: response.data
                    })
                    if (response.data.auth_type === AuthType.PROFESSIONAL) {
                        window.location.href = PUBLIC_ROUTES.HOME.path;
                    } else {
                        window.location.href = '/';
                    }

                    // history.push('profesionales-online');
                    // window.location.href = '/profesionales-online';
                },
                error: () => {
                    dispatch({
                        type: LOGIN_FAILED,
                        payload: response.message
                    })
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });

    }

    const recoveryPassword = (authType, credentials) => {
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
        window.location.href = '/';
    }


    const updateAuth = (auth) => {
        dispatch({
            type: UPDATE_AUTH,
            payload: auth
        })
    }

    const updateAuthToken = (authToken) => {
        dispatch({
            type: UPDATE_AUTH_TOKEN,
            payload: authToken
        })
    }


    return (
        <AuthContext.Provider value={{
            auth: state.auth,
            authType: state.authType,
            authToken: state.authToken,
            logged: state.logged,
            login,
            logout,
            updateAuth,
            updateAuthToken,
            recoveryPassword,

        }}>
            {props.children}


        </AuthContext.Provider>
    )
}

export default AuthProvider;
