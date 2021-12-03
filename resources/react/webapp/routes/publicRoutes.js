import React from 'react';
import PublicMiddleware from "./middleware/PublicMiddleware";
import BaseTemplate from "../template";
import Home from '../pages/public/Home';
import AboutUs from "../pages/public/AboutUs";
import ContactUs from "../pages/public/ContactUs";
import Faq from "../pages/public/Faq";
import History from "../pages/public/History";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import CorporateResponsibility from "../pages/public/CorporateResponsibility";
import Shop from "../pages/public/Shop";
import ProductDetail from "../pages/public/ProductDetails";
import Cart from "../pages/public/Cart";
import CheckOut from "../pages/public/CheckOut";
import Blog from "../pages/public/Blog/Blog";
import BlogListByCategory from "../pages/public/Blog/BlogListByCategory";
import Claim from "../pages/public/Claim";
import Post from "../pages/public/Post";
import ShopSearch from '../pages/public/Shop/indexSearch';
// import Test from '../pages/public/Test';

const PUBLIC_ROUTES = {
    // TEST: {
    //     path: "/testing",
    //     title: "Pruebas",
    //     component: Test,
    //     exact: true,
    //     layout: props => <BaseTemplate {...props} />,
    //     middleware: props => <PublicMiddleware {...props} />
    // },

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

    TERMS_AND_CONDITIONS: {
        path: "/terminos-y-condiciones",
        title: "Términos y Condiciones",
        component: TermsAndConditions,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    CORPORATE_RESPONSIBILITY: {
        path: "/responsabilidad-empresarial/:section?",
        title: "Responsabilidad empresarial",
        component: CorporateResponsibility,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    SHOP: {
        path: "/tienda/:category?",
        title: "Tienda",
        component: Shop,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    SHOP_SEARCH: {
        path: "/tienda/buscar/:search?",
        title: "Tienda",
        component: ShopSearch,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    SHOP_SUBCATEGORY: {
        path: "/tienda/:category?/:subcategory?",
        title: "Tienda",
        component: Shop,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    SHOP_FILTER: {
        path: "/tienda/:category?/:type?/:filter?",
        title: "Tienda",
        component: Shop,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    PRODUCT_DETAIL: {
        path: "/producto/:slug?",
        title: "Producto",
        component: ProductDetail,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    CART: {
        path: "/carrito/",
        title: "Carrito",
        component: Cart,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    CHECKOUT: {
        path: "/checkout/",
        title: "Checkout",
        component: CheckOut,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    CLAIM: {
        path: "/libro-de-reclamos",
        title: "Libro de Reclamos",
        component: Claim,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    HISTORY: {
        path: "/historia-anticonceptivo",
        title: "Historia de los Anticonceptivos",
        component: History,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    POST: {
        path: "/blog/:post_type_slug?/post/:post_slug?",
        title: "Post",
        component: Post,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    BLOG_LIST_BY_CATEGORY: {
        path: "/blog/:post_type_slug",
        title: "Blog",
        component: BlogListByCategory,
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



    // BLOG_LIST: {
    //     path: "/blog/lista",
    //     title: "Blog Lista",
    //     component: BlogList,
    //     exact: true,
    //     layout: props => <BaseTemplate {...props} />,
    //     middleware: props => <PublicMiddleware {...props} />
    // },

    RECOVERY: {
        path: "/recuperar-contrasena/:token?",
        title: "Recuperar contraseña",
        component: Home,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },

    HOME: {
        path: "/",
        title: "Inicio",
        component: Home,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PublicMiddleware {...props} />
    },
};


export default PUBLIC_ROUTES;
