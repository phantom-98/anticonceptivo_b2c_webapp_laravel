import React from 'react';

import PublicMiddleware from "./middleware/PublicMiddleware";
import BaseTemplate from "../template";

import Home from '../pages/public/Home';
import Contact from "../pages/public/Contact";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import PaymentConditions from "../pages/public/PaymentConditions";
import Faq from "../pages/public/Faq";
import AboutUs from "../pages/public/AboutUs";
import Login from "../pages/public/Auth/Login";
import Register from "../pages/public/Auth/Register";
import BaseNoLayout from "../template/BaseNoLayout";
import RegisterSelectType from "../pages/public/Auth/Register/RegisterSelectType";
import HowItsWork from "../pages/public/HowItsWork";
import Verify from "../pages/public/Auth/Verify";
import LoginByToken from "../pages/public/Auth/LoginByToken";


const PUBLIC_ROUTES = {
    HOME: {
        path: "/",
        title: "Inicio",
        component: Home,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    CONTACT: {
        path: "/contacto",
        title: "Contáctanos",
        component: Contact,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    TERMS_AND_CONDITIONS: {
        path: "/terminos-y-condiciones",
        title: "Términos y condiciones",
        component: TermsAndConditions,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    PAYMENT_CONDITIONS: {
        path: "/condiciones-de-pago",
        title: "Condiciones de pago",
        component: PaymentConditions,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    FAQ: {
        path: "/preguntas-frecuentes",
        title: "Preguntas frecuentes",
        component: Faq,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    ABOUT_US: {
        path: "/quienes-somos",
        title: "Quiénes somos",
        component: AboutUs,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    HOW_ITS_WORK: {
        path: "/como-funciona",
        title: "Como funciona",
        component: HowItsWork,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    LOGIN: {
        path: "/acceso",
        title: "Acceso Usuarios",
        component: Login,
        exact: true,
        layout: props => <BaseNoLayout {...props} bg="one"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    LOGIN_BY_TOKEN: {
        path: "/validate-login/:token/:email",
        title: "Acceso usuarios",
        component: LoginByToken,
        exact: true,
        layout: props => <BaseNoLayout {...props} bg="two"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    VERIFY: {
        path: "/verificar/:token/:email",
        title: "Verificar",
        component: Verify,
        exact: true,
        layout: props => <BaseNoLayout {...props} bg="two"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    REGISTER: {
        path: "/registro",
        title: "Registro",
        component: Register,
        exact: true,
        layout: props => <BaseNoLayout {...props} bg="none"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
    REGISTER_TYPE: {
        path: "/registro/:type?",
        title: "Registro",
        component: RegisterSelectType,
        exact: true,
        layout: props => <BaseNoLayout {...props} bg="one"/>,
        middleware: props => <PublicMiddleware {...props} />
    },

    // SOCIAL_MEDIA_AUTH: {
    //     path: "/social-media-auth/:token",
    //     title: "Comprobando Social Media Network",
    //     component: SocialMediaAuth,
    //     exact: true,
    //     layout: props => <BaseNoLayout {...props} bg="none"/>,
    //     middleware: props => <PublicMiddleware {...props} />
    // },

    // REGISTER_PROFESSIONAL: {
    //     path: "/registro",
    //     title: "Registro de Profesionales",
    //     component: Index,
    //     exact: true,
    //     layout: props => <BaseNoLayout {...props} bg="one"/>,
    //     middleware: props => <PublicMiddleware {...props} />
    // },
    // REGISTER_PROFESSIONAL_STEPS: {
    //     path: "/registro/steps",
    //     title: "Registro de Profesionales",
    //     component: ProfessionalSteps,
    //     exact: true,
    //     layout: props => <BaseNoLayout {...props} bg="none"/>,
    //     middleware: props => <PublicMiddleware {...props} />
    // }
};


export default PUBLIC_ROUTES;
