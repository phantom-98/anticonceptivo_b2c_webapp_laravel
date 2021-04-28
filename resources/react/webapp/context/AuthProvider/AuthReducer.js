import {
    LOGIN,
    LOGOUT,
    UPDATE_AUTH,
    UPDATE_AUTH_TOKEN,
} from "./types";
import {LOCAL_STORAGE} from "../LocalStorage";

export default (state, action) =>{

    switch (action.type) {

        case LOGIN:
            const auth = action.payload.auth;
            const auth_token = action.payload.auth_token;
            const auth_type = action.payload.auth_type;

            localStorage.setItem(LOCAL_STORAGE.AUTH, JSON.stringify(auth));
            localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, auth_token);
            localStorage.setItem(LOCAL_STORAGE.AUTH_TYPE, auth_type);

            return {
                ...state,
                auth : auth,
                authType : auth_type,
                authToken : auth_token,
                logged: true
            };

        case LOGOUT:

            localStorage.removeItem(LOCAL_STORAGE.AUTH);
            localStorage.removeItem(LOCAL_STORAGE.AUTH_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE.AUTH_TYPE);

            return {
                ...state,
                auth : null,
                authType : null,
                authToken : null,
                logged: false
            };

        case UPDATE_AUTH:

            localStorage.setItem(LOCAL_STORAGE.AUTH, JSON.stringify(action.payload));

            return {
                ...state,
                auth : action.payload,
            };

        case UPDATE_AUTH_TOKEN:

            localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, action.payload);

            return {
                ...state,
                authToken : action.payload,
            };

        default:
            return state;
    }
}
