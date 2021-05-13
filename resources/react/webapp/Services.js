import axios from "axios";
import {setInputError} from "./helpers/GlobalUtils";


// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.post['Content-Type'] ='application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] ='*';

const URL_BASE = window.location.origin;
const API_PATH = 'api'
const API_VERSION = 'v1';

export const GetService = (endpoint, action) => {
    return `${URL_BASE}/${API_PATH}/${API_VERSION}/${route}`
}

export const DoPost = async (url, data = {}, config = {}) => {
    const response = await axios.post(url, data, config);
    return await response.data;
};

export const DoGet = async (url, data = {}) => {
    const response = await axios.get(url, data);
    return await response.data;
};

export const Response = (params) => {

    let {status, data, title, message} = params.response;

    if (status === 'success') {
        'success' in params ? params.success() : null;
    }

    if (status === 'error') {
        'error' in params ? params.error() : null;
    }

    if (status === 'warning') {
        'warning' in params ? params.warning() : null;
    }

    if (status === 'validate' || status === 'fields_validation') {

        for (const error in data) {
            setInputError(error, data[error][0])
        }
        'validate' in params ? params.validate() : null;
    }

}

export const ErrorCatch = (error) => {
    console.log('Service.ErrorCatch', error);
    // const httpErrors = [
    //     200, 400, 401, 402, 403, 404, 500, 503
    // ];
    // if (httpErrors.includes(error.response.status)) {
    //     console.log(error.response.data.message)
    // } else {
    //     console.log('Ha ocurrido un error inesperado, por favor comuníquese con el administrador. ' + error)
    // }
}

const GetBaseURL = () => {
    return `${URL_BASE}/${API_PATH}/${API_VERSION}/app/`
}

export const ENDPOINT = {
    AUTH: {
        LOGIN: GetBaseURL() + 'auth/login',
        LOGIN_BY_TOKEN: GetBaseURL() + 'auth/login-by-token',
        REGISTER: GetBaseURL() + 'auth/register',
        VERIFY: GetBaseURL() + 'auth/verify',
        GET_AUTH: GetBaseURL() + 'auth/get-auth',
        SOCIAL_MEDIA : {
            REDIRECT : GetBaseURL() + 'auth/social-media/redirect',
        }
    },
    NO_AUTH: {
        CONTACT: {
            SEND: GetBaseURL() + 'contact/send'
        },
        HOME: {
            GET_CATEGORY: GetBaseURL() + 'public-area/get-categories',
        }
    },
    PAYMENTS: {
        CREATE_ORDER: GetBaseURL() + 'payment/create-order',
        GET_ORDER_TO_PAY: GetBaseURL() + 'payment/get-order-to-pay',
        VERIFY: GetBaseURL() + 'payment/verify',
        WEBPAY: {
            CREATE_TRANSACTION: GetBaseURL() + 'payment/webpay/create-transaction',
        }
    },
}
