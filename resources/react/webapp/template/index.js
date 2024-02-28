import React from "react";

import { withRouter } from "react-router-dom";
import LazyLoading from "../components/LazyLoading";

// import Header from "./layouts/Header";
// import Footer from "./layouts/Footer";
// import {FloatingWhatsApp} from 'react-floating-whatsapp-button'
// import 'react-floating-whatsapp-button/dist/index.css'

const Header = React.lazy(() => import("./layouts/Header"));
const Footer = React.lazy(() => import("./layouts/Footer"));

const BaseTemplate = (props) => {
    return (
        <div className={`bg-app`}>
            <React.Suspense fallback={<LazyLoading />}>
                <Header />
            </React.Suspense>
            <div className="app-margin-top">{props.children}</div>
            <React.Suspense fallback={<LazyLoading />}>
                <Footer />
            </React.Suspense>
        </div>
    );
};

export default withRouter(BaseTemplate);
