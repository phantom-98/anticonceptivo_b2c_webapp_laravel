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
    const httpErrors = [
        200, 400, 401, 402, 403, 404, 500, 503
    ];
    if (httpErrors.includes(error.response.status)) {
        console.log(error.response.data.message)
    } else {
        console.log('Ha ocurrido un error inesperado, por favor comuníquese con el administrador. ' + error)
    }
}

const GetBaseURL = () => {
    return `${URL_BASE}/${API_PATH}/${API_VERSION}/app/`
}

export const ENDPOINT = {
    AUTH: {
        LOGIN: GetBaseURL() + 'auth/login',
        RECOVERY_PASSWORD: GetBaseURL() + 'auth/recovery-password',
        SET_NEW_PASSWORD: GetBaseURL() + 'auth/set-new-password',
        REGISTER: GetBaseURL() + 'auth/register',

    },

    PUBLIC_AREA: {
        FOOTER: GetBaseURL() + 'public-area/get-footer-resources',
        HEADER: GetBaseURL() + 'public-area/get-header-resources',
        HEADER_MENU: GetBaseURL() + 'public-area/get-header-navbar-resources',
        HEADER_BOX: GetBaseURL() + 'public-area/get-all-available',
        BANNERS:{
            HOME:{
                TOP: GetBaseURL() + 'public-area/get-home-top-banners',
                MIDDLE: GetBaseURL() + 'public-area/get-home-middle-banners',
                BOTTOM: GetBaseURL() + 'public-area/get-home-bottom-banners',
            },
        },
        CORPORATE_RESPONSIBILITY: GetBaseURL() + 'public-area/get-corporate-responsabilities',
        BLOG: {
            POSTS: GetBaseURL() + 'public-area/get-posts',
            POST: GetBaseURL() + 'public-area/get-post',
            CAROUSEL: GetBaseURL() + 'public-area/get-carousel-posts'
        },
        ABOUT_US: GetBaseURL() + 'public-area/get-about-us-resources',
        SUBSCRIBE: GetBaseURL() + 'public-area/subscribe',
        SHOP:{
            PRODUCTS:{
                CATEGORY: GetBaseURL() + 'public-area/get-product-by-categories',
                SUBCATEGORY: GetBaseURL() + 'public-area/get-product-by-subcategories',
                FILTER: GetBaseURL() + 'public-area/get-product-by-filters',
            }
        },
        CONTACT: {
            GET_RESOURCES: GetBaseURL() + 'public-area/contact/get-resources',
            SEND: GetBaseURL() + 'public-area/contact/send'
        },
    },
    NO_AUTH: {
        HOME: {
            GET_CATEGORY: GetBaseURL() + 'public-area/get-categories',
        },
        SHOP:{
            RESOURCES: GetBaseURL() + 'public-area/get-resources',
            PRODUCTS_FILTERED: GetBaseURL() + 'public-area/get-products-filtered',
        },
        PRODUCT:{
            GET: GetBaseURL() + 'public-area/get-products',
        },
        PRODUCT_BY_SLUG:{
            GET: GetBaseURL() + 'public-area/get-product-by-slug',
        },
        CHECKOUT:{
            GET_RESOURCES: GetBaseURL() + 'public-area/get-checkout-resources',
            VALIDATE_STEPS: GetBaseURL() + 'public-area/validate-steps',
            GET_ORDER: GetBaseURL() + 'public-area/get-order',
            SUBMIT_PRESCRIPTION: GetBaseURL() + 'public-area/submit-prescription',
            UPDATE_DISCOUNTS: GetBaseURL() + 'public-area/update-discounts'
        },
        TERMS_AND_CONDITIONS:{
            GET_DATA: GetBaseURL() + 'public-area/get-terms-and-conditions'
        },
        FAQS:{
            GET_DATA: GetBaseURL() + 'public-area/get-faqs'
        },
        CLAIM:{
            SUBMIT: GetBaseURL() + 'public-area/submit-claim',
            GET_DATA: GetBaseURL() + 'public-area/get-claims'
        }
    },
    CUSTOMER:{
        PROFILE:{
            GET: GetBaseURL() + 'customer/get-profile',
            UPDATE: GetBaseURL() + 'customer/update-profile',
        },
        ADDRESSES: {
            GET: GetBaseURL() + 'customer/get-addresses',
            UPDATE: GetBaseURL() + 'customer/update-addresses',
            SET_DEFAULT_ADDRESS: GetBaseURL() + 'customer/update-default-address',
            // REMOVE: GetBaseURL() + 'customer/remove-address'
        },
        SUBSCRIPTIONS: {
            GET: GetBaseURL() + 'customer/get-subscriptions',
            UPDATE: GetBaseURL() + 'customer/update-subscriptions',
            SET_DEFAULT_SUBSCRIPTION: GetBaseURL() + 'customer/update-default-subscription',
            DELETE: GetBaseURL() + 'customer/delete-subscription',
            GET_SUBSCRIPTIONS: GetBaseURL() + 'customer/get-subscriptions',
            GET_SUBSCRIPTIONS_ORDERS_ITEMS: GetBaseURL() + 'customer/get-subscriptions-orders_items',
            SET_ADDRESS_SUBSCRIPTION: GetBaseURL() + 'customer/set-address-subscription',
            SET_CARD_SUBSCRIPTION: GetBaseURL() + 'customer/set-card-subscription',
            SET_DISPATCH_DATE_SUBSCRIPTION: GetBaseURL() + 'customer/set-dispatch-date-subscription'

        },
        ORDERS:{
            GET: GetBaseURL() + 'customer/get-orders',
        },
        PRESCRIPTIONS:{
            GET: GetBaseURL() + 'customer/get-prescriptions',
            REMOVE: GetBaseURL() + 'customer/remove-prescriptions',
        },
        CUSTOMER_SERVICE: {
            SEND: GetBaseURL() + 'customer/send',
            GET: GetBaseURL() + 'customer/get-action'
        },

    },
    PAYMENTS: {
        CREATE_ORDER: GetBaseURL() + 'payment/create-order',
        GET_ORDER_TO_PAY: GetBaseURL() + 'payment/get-order-to-pay',
        DISCOUNT_CODE: GetBaseURL() + 'payment/discount-code',
        VERIFY: GetBaseURL() + 'payment/verify',
        VERIFY_SUBSCRIPTION: GetBaseURL() + 'payment/verify-subscription',

        WEBPAY: {
            CREATE_SUBSCRIPTION: GetBaseURL() + 'payment/webpay/create-subscription',
            CREATE_TRANSACTION: GetBaseURL() + 'payment/webpay/create-transaction',

        }
    },
}
