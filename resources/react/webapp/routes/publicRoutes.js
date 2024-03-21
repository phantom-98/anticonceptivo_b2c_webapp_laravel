import React from "react";
import PublicMiddleware from "./middleware/PublicMiddleware";
import BaseTemplate from "../template";
import BaseNoLayout from "../template/BaseNoLayout";
import GetnetTransaction from "../pages/public/CheckOut/FinishPaymentTransaction/Getnet";

// import Home from '../pages/public/Home';
// import AboutUs from "../pages/public/AboutUs";
// import ContactUs from "../pages/public/ContactUs";
// import Faq from "../pages/public/Faq";
// import History from "../pages/public/History";
// import TermsAndConditions from "../pages/public/TermsAndConditions";
// import CorporateResponsibility from "../pages/public/CorporateResponsibility";
// import Cart from "../pages/public/Cart";
// import Blog from "../pages/public/Blog/Blog";
// import BlogListByCategory from "../pages/public/Blog/BlogListByCategory";
// import Post from "../pages/public/Post";
// import FinishPaymentTransaction from "../pages/public/CheckOut/FinishPaymentTransaction";

// const BaseTemplate = React.lazy(() => import("../template"));

// change the above line import route for any testing page
const Test = React.lazy(() => import("../pages/testing/Home"));
const Oxfar = React.lazy(() => import("../pages/public/Home/OxfarLanding"));
const Cardio = React.lazy(() => import("../pages/public/Home/CardioLanding"));
const Bio = React.lazy(() =>
    import("../pages/public/Home/BioequivalenteLanding")
);

const Home = React.lazy(() => import("../pages/public/Home"));
const AboutUs = React.lazy(() => import("../pages/public/AboutUs"));
const ContactUs = React.lazy(() => import("../pages/public/ContactUs"));
const Faq = React.lazy(() => import("../pages/public/Faq"));
const History = React.lazy(() => import("../pages/public/History"));
const TermsAndConditions = React.lazy(() =>
    import("../pages/public/TermsAndConditions")
);
const CorporateResponsibility = React.lazy(() =>
    import("../pages/public/CorporateResponsibility")
);
const Cart = React.lazy(() => import("../pages/public/Cart"));
const Blog = React.lazy(() => import("../pages/public/Blog/Blog"));
const BlogListByCategory = React.lazy(() =>
    import("../pages/public/Blog/BlogListByCategory")
);
const Post = React.lazy(() => import("../pages/public/Post"));
const FinishPaymentTransaction = React.lazy(() =>
    import("../pages/public/CheckOut/FinishPaymentTransaction")
);
const Shop = React.lazy(() => import("../pages/public/Shop"));
const ProductDetail = React.lazy(() =>
    import("../pages/public/ProductDetails")
);
const CheckOut = React.lazy(() => import("../pages/public/CheckOut"));
const Claim = React.lazy(() => import("../pages/public/Claim"));
const ShopSearch = React.lazy(() => import("../pages/public/Shop/indexSearch"));

const PUBLIC_ROUTES = {
    TEST: {
        path: "/testing",
        title: "Testing",
        component: Test,
        exact: true,
        layout: (props) => <BaseNoLayout {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },
    ABOUT_US: {
        path: "/sobre-nosotros",
        title: "Sobre Nosotros",
        component: AboutUs,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    CONTACT_US: {
        path: "/contactanos",
        title: "Contáctanos",
        component: ContactUs,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    FAQ: {
        path: "/preguntas-frecuentes",
        title: "Preguntas Frecuentes",
        component: Faq,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    TERMS_AND_CONDITIONS: {
        path: "/terminos-y-condiciones",
        title: "Términos y Condiciones",
        component: TermsAndConditions,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    CORPORATE_RESPONSIBILITY: {
        path: "/responsabilidad-empresarial/:section?",
        title: "Responsabilidad empresarial",
        component: CorporateResponsibility,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    SHOP: {
        path: "/tienda/:category?",
        title: "Tienda",
        component: Shop,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    SHOP_SEARCH: {
        path: "/tienda/buscar/:search?",
        title: "Tienda",
        component: ShopSearch,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    SHOP_SUBCATEGORY: {
        path: "/tienda/:category?/:subcategory?",
        title: "Tienda",
        component: Shop,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    SHOP_FILTER: {
        path: "/tienda/:category?/:type?/:filter?",
        title: "Tienda",
        component: Shop,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    PRODUCT_DETAIL: {
        path: "/producto/:slug?",
        title: "Producto",
        component: ProductDetail,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    CART: {
        path: "/carrito/",
        title: "Carrito",
        component: Cart,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    CHECKOUT_VERIFY: {
        path: "/checkout-verify/:token",
        title: "Checkout",
        component: FinishPaymentTransaction,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },
    CHECKOUT_VERIFY_NEW: {
        path: "/checkout-verify-test/:orderId",
        title: "Checkout",
        component: GetnetTransaction,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    CHECKOUT: {
        path: "/checkout/",
        title: "Checkout",
        component: CheckOut,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    CLAIM: {
        path: "/libro-de-reclamos",
        title: "Libro de Reclamos",
        component: Claim,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    HISTORY: {
        path: "/historia-anticonceptivo",
        title: "Historia de los Anticonceptivos",
        component: History,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    POST: {
        path: "/blog/:post_type_slug?/post/:post_slug?",
        title: "Post",
        component: Post,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    BLOG_LIST_BY_CATEGORY: {
        path: "/blog/:post_type_slug",
        title: "Blog",
        component: BlogListByCategory,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    BLOG: {
        path: "/blog",
        title: "Blog",
        component: Blog,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
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
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },

    HOME: {
        path: "/",
        title: "Inicio",
        component: Home,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },
    OXFAR: {
        path: "/oxfar",
        title: "Oxfar",
        component: Oxfar,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },
    CARDIO: {
        path: "/cardio",
        title: "Cardio",
        component: Cardio,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },
    BIO: {
        path: "/bioequivalente",
        title: "Bioequivalente",
        component: Bio,
        exact: true,
        layout: (props) => <BaseTemplate {...props} />,
        middleware: (props) => <PublicMiddleware {...props} />,
    },
};

export default PUBLIC_ROUTES;
