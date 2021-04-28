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
        PRESENTATION: {
            GET_RESOURCES: GetBaseURL() + 'presentation/get-counters',
            GET_TESTIMONIALS: GetBaseURL() + 'presentation/get-testimonials'
        }
    },
    PANEL: {
        COMMON: {
            NOTIFIES: {
                GET_LIST: GetBaseURL() + 'panel/common/notifies/get-list',
                GET_NOT_VIEWED: GetBaseURL() + 'panel/common/notifies/get-not-viewed',
                SET_VIEWED: GetBaseURL() + 'panel/common/notifies/set-viewed',
            },
            PROJECT_STATUS: {
                CHANGE_STATUS: GetBaseURL() + 'panel/common/project-tasks/change-status'
            },
            QUOTATIONS: {
                CHANGE_STATUS: GetBaseURL() + 'panel/common/quotations/change-status',
                CHAT: {
                    GET_MESSAGES: GetBaseURL() + 'panel/common/quotations/chats/get-messages',
                    STORE: GetBaseURL() + 'panel/common/quotations/chats/store',
                    SET_VIEWED: GetBaseURL() + 'panel/common/quotations/chats/set-viewed',
                }
            },
            COMPLETE_PROFILE: {
                RESOURCES: {
                    ABILITIES: GetBaseURL() + 'panel/common/complete-profile/resources/abilities',
                    EXTRA_INFO: GetBaseURL() + 'panel/common/complete-profile/resources/extra-info',
                    BILLING_INFO: GetBaseURL() + 'panel/common/complete-profile/resources/billing-info',
                }
            },
        },
        COMPANY: {
            DASHBOARD: {
                GET_RESOURCES: GetBaseURL() + 'panel/company/dashboard/get-resources',
            },
            COMPLETE_PROFILE: {
                GET_PROFILE: GetBaseURL() + 'panel/company/complete-profile/get-profile',
                // TERMS: GetBaseURL() + 'panel/company/complete-profile/terms',
                // ABILITIES: GetBaseURL() + 'panel/company/complete-profile/abilities',
                PERSONAL_INFO: GetBaseURL() + 'panel/company/complete-profile/personal-info',
                BILLING_INFO: GetBaseURL() + 'panel/company/complete-profile/billing-info',
            },
            ACCOUNT: {
                UPDATE_PERSONAL_INFORMATION: GetBaseURL() + 'panel/company/account/update-personal-information',
                UPDATE_BILLING_INFORMATION: GetBaseURL() + 'panel/company/account/update-billing-information',
                UPDATE_PASSWORD: GetBaseURL() + 'panel/company/account/update-password',
                UPDATE_AGENT_INFORMATION: GetBaseURL() + 'panel/company/account/update-agent-information',
            },
            PROFESSIONALS: {
                GET_LIST: GetBaseURL() + 'panel/company/professionals/get-list',
                GET_RESOURCES: GetBaseURL() + 'panel/company/professionals/get-resources',
                GET_PROFESSIONAL: GetBaseURL() + 'panel/company/professionals/get-professional',
                GET_PROFESSIONAL_SCHEDULE: GetBaseURL() + 'panel/company/professionals/get-weekly-schedule',
                ADD_REVIEW: GetBaseURL() + 'panel/company/professionals/add-review',
            },
            PAYMENTS: {
                GET_LIST: GetBaseURL() + 'panel/company/payments/get-list',
                TASKS: {
                    GET: GetBaseURL() + 'panel/company/payments/tasks',
                    GET_TASKS: GetBaseURL() + 'panel/company/payments/get-tasks',
                }
            },
            PROJECTS: {
                GET_PROJECT: GetBaseURL() + 'panel/company/projects/get-project',
                GET_LIST: GetBaseURL() + 'panel/company/projects/get-list',
                CREATE: GetBaseURL() + 'panel/company/projects/create',
                DELETE: GetBaseURL() + 'panel/company/projects/delete',
                CREATE_WITH_TASKS: GetBaseURL() + 'panel/company/projects/create-with-tasks',
                TASK: {
                    GET_LIST: GetBaseURL() + 'panel/company/projects/tasks/get-list',
                    CREATE: GetBaseURL() + 'panel/company/projects/task/create',
                    DELETE: GetBaseURL() + 'panel/company/projects/task/delete',
                }
            },
            QUOTATIONS: {
                GET_QUOTATION: GetBaseURL() + 'panel/company/quotations/get-quotation',
                GET_LIST: GetBaseURL() + 'panel/company/quotations/get-list',
                CREATE: GetBaseURL() + 'panel/company/quotations/create',
                DELETE: GetBaseURL() + 'panel/company/quotations/delete',
                ASSIGNS: GetBaseURL() + 'panel/company/quotations/assigns',
            },
            OFFLINE_EVALUATIONS: {
                GET_EVALUATION: GetBaseURL() + 'panel/company/offline-evaluations/get-evaluation',
                SET_EVALUATION: GetBaseURL() + 'panel/company/offline-evaluations/set-evaluation',
            }
        },
        PROFESSIONAL: {
            DASHBOARD: {
                GET_RESOURCES: GetBaseURL() + 'panel/professional/dashboard/get-resources',
            },
            PROFILE: {
                GET_PROFILE: GetBaseURL() + 'panel/professional/profile/get-profile',
                GET_RESOURCES: GetBaseURL() + 'panel/professional/profile/get-resources',
                UPDATE_PROFILE: GetBaseURL() + 'panel/professional/profile/update-profile',
                UPDATE_ABOUT_ME: GetBaseURL() + 'panel/professional/profile/update-about-me',
                UPDATE_EMPLOYMENT_HISTORY: GetBaseURL() + 'panel/professional/profile/update-employment-history',
                UPDATE_PROFESSIONAL_TYPE: GetBaseURL() + 'panel/professional/profile/update-professional-type',
                UPDATE_PROFESIONAL_DESCRIPTION: GetBaseURL() + 'panel/professional/profile/update-profesional-description',
                UPDATE_AVATAR: GetBaseURL() + 'panel/professional/profile/update-avatar',
                SET_VISIBILITY: GetBaseURL() + 'panel/professional/profile/set-visibility',
            },
            COMPLETE_PROFILE: {
                GET_PROFILE: GetBaseURL() + 'panel/professional/complete-profile/get-profile',
                TERMS: GetBaseURL() + 'panel/professional/complete-profile/terms',
                ABILITIES: GetBaseURL() + 'panel/professional/complete-profile/abilities',
                BASIC_INFO: GetBaseURL() + 'panel/professional/complete-profile/basic-info',
                EXTRA_INFO: GetBaseURL() + 'panel/professional/complete-profile/extra-info',
            },
            ACCOUNT: {
                DATA_BANK_RESOURCES: GetBaseURL() + 'panel/professional/account/resources-data-bank',
                UPDATE_PERSONAL_INFORMATION: GetBaseURL() + 'panel/professional/account/update-personal-information',
                UPDATE_PASSWORD: GetBaseURL() + 'panel/professional/account/update-password',
                UPDATE_DATA_BANK: GetBaseURL() + 'panel/professional/account/update-data-bank',
                CLOSE_ACCOUNT: GetBaseURL() + 'panel/professional/account/close-account',
            },
            PAYMENTS: {
                GET_LIST: GetBaseURL() + 'panel/professional/payments/get-list',
                GET_PENDING_ORDERS: GetBaseURL() + 'panel/professional/payments/get-pending-orders',
                CREATE_LIQUIDATION: GetBaseURL() + 'panel/professional/payments/create-liquidation',
                GET_LIQUIDATION_ORDERS: GetBaseURL() + 'panel/professional/payments/get-liquidation-orders',
            },
            PROJECTS: {
                GET_PROJECT: GetBaseURL() + 'panel/professional/projects/get-project',
                GET_LIST: GetBaseURL() + 'panel/professional/projects/get-list',
                TASK: {
                    GET_LIST: GetBaseURL() + 'panel/professional/projects/tasks/get-list',
                }
            },
            QUOTATIONS: {
                GET_QUOTATION: GetBaseURL() + 'panel/professional/quotations/get-quotation',
                GET_LIST: GetBaseURL() + 'panel/professional/quotations/get-list',
                UPDATE_TASK: GetBaseURL() + 'panel/professional/quotations/update-task',
            },
            SCHEDULES: {
                GET_LIST: GetBaseURL() + 'panel/professional/schedules/get-list',
                UPDATE_SLOTS: GetBaseURL() + 'panel/professional/schedules/update-slots',
            },
            OFFLINE_EVALUATIONS: {
                GET_EVALUATION: GetBaseURL() + 'panel/professional/offline-evaluations/get-evaluation',
                SET_EVALUATION: GetBaseURL() + 'panel/professional/offline-evaluations/set-evaluation',
            },
            EVALUATIONS:{
                GET_EVALUATION: GetBaseURL() + 'panel/professional/professional-platform-evaluations/get-evaluation',
                ADD_REVIEW: GetBaseURL() + 'panel/professional/professional-platform-evaluations/add-review',
            }
        },
        GLOBAL_CHAT: {
            GET_CONTACTS_BY_COMPANY_ID: GetBaseURL() + 'panel/global-chat/get-contacts-by-company-id',
            GET_CONTACTS_BY_PROFESSIONAL_ID: GetBaseURL() + 'panel/global-chat/get-contacts-by-professional-id',
            GET_MESSAGES: GetBaseURL() + 'panel/global-chat/get-messages',
            STORE: GetBaseURL() + 'panel/global-chat/store',
            SET_VIEWED: GetBaseURL() + 'panel/global-chat/set-viewed',
        },
        PAYMENTS: {
            CREATE_ORDER: GetBaseURL() + 'payment/create-order',
            GET_ORDER_TO_PAY: GetBaseURL() + 'payment/get-order-to-pay',
            VERIFY: GetBaseURL() + 'payment/verify',
            WEBPAY: {
                CREATE_TRANSACTION: GetBaseURL() + 'payment/webpay/create-transaction',
            }
        }
    },
}
