import React, {createContext, useReducer, useEffect} from 'react';
import {LOCAL_STORAGE} from "../LocalStorage";
import AuthReducer from "./AuthReducer";
import * as Services from "../../Services";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {
    LOGIN,
    LOGOUT,
    UPDATE_AUTH,
    UPDATE_AUTH_TOKEN,
} from "./types";

export const AuthContext = createContext({})

const AuthProvider = (props) => {

    const initialState = {
        auth: null,
        authToken: '',
        logged: false
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {

        const auth = JSON.parse(localStorage.getItem(LOCAL_STORAGE.AUTH))
        const authToken = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN)

        if (auth && authToken) {

            dispatch({
                type: LOGIN,
                payload: {
                    auth: auth,
                    auth_token: authToken,
                }
            })
        }

    }, [])


    const login = (credentials) => {        
        console.log('dentro del do login');
        let url = Services.ENDPOINT.AUTH.LOGIN;

        // Services.DoPost(url, credentials).then(response => {
        //     Services.Response({
        //         response: response,
        //         success: () => {
        //             dispatch({
        //                 type: LOGIN,
        //                 payload: response.data
        //             })
                    
        //             window.location.href = PUBLIC_ROUTES.HOME.path;
                    
        //         },
        //         error: () => {
        //             dispatch({
        //                 type: LOGIN_FAILED,
        //                 payload: response.message
        //             })
        //         }
        //     });
        // }).catch(error => {
        //     Services.ErrorCatch(error)
        // });

    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
        window.location.href = PUBLIC_ROUTES.HOME.path;
    }

    const recoveryPassword = (credentials) => {
        console.log('dentro al recovery')
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
            recoveryPassword,
            updateAuth,
            updateAuthToken,
        }}>
            {props.children}

        </AuthContext.Provider>
    )
}

export default AuthProvider;
