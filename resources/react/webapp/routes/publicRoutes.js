import React from 'react';

import PublicMiddleware from "./middleware/PublicMiddleware";
import BaseTemplate from "../template";
import Home from '../pages/public/Home';
import AboutUs from "../pages/public/AboutUs";
import ContactUs from "../pages/public/ContactUs";
import Faq from "../pages/public/Faq";
import Blog from "../pages/public/Blog";
import TermsAndConditions from "../pages/public/TermsAndConditions";

const PUBLIC_ROUTES = {
    HOME: {
        path: "/",
        title: "Inicio",
        component: Home,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    ABOUT_US: {
        path: "/sobre-nosotros",
        title: "Sobre Nosotros",
        component: AboutUs,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    CONTACT_US: {
        path: "/contactanos",
        title: "Contáctanos",
        component: ContactUs,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    FAQ: {
        path: "/preguntas-frecuentes",
        title: "Preguntas Frecuentes",
        component: Faq,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    BLOG: {
        path: "/blog",
        title: "Blog",
        component: Blog,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
    TERMS_AND_CONDITIONS: {
        path: "/terminos-y-condiciones",
        title: "Términos y Condiciones",
        component: TermsAndConditions,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
};


export default PUBLIC_ROUTES;
