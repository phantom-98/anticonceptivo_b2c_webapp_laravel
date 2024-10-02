import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";

import AppProvider from "./context/AppProvider";
import AuthProvider from "./context/AuthProvider";
import BaseTemplate from "./template";
import Page404 from "./template/Page404";
import ScrollToTop from "./ScrollToTop";
import { Template } from "./Globals";
import TitleApp from "./TitleApp";
import PUBLIC_ROUTES from "./routes/publicRoutes";
import PRIVATE_ROUTES from "./routes/privateRoutes";
import CartProvider from "./context/CartProvider";
import toastr from 'toastr';

// Custom hook to dynamically update the canonical URL
const CanonicalUrlUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        const canonicalLink = document.querySelector("link[rel='canonical']");
        const currentUrl = window.location.href;

        if (canonicalLink) {
            canonicalLink.setAttribute("href", currentUrl);
        } else {
            const link = document.createElement('link');
            link.setAttribute("rel", "canonical");
            link.setAttribute("href", currentUrl);
            document.head.appendChild(link);
        }
    }, [location]);

    return null;  // This is a hook; it does not render any JSX
};

const ProcessTemplate = (template) => {
    switch (template) {
        case Template.PUBLIC:
            return props => <BaseTemplate {...props} />;
        case Template.PRIVATE:
            return props => <BaseTemplate {...props} />;
        default:
            return null;
    }
};

const renderRoute = (route, index) => {
    const Middleware = route.middleware;

    return (
        <Middleware
            key={index}
            layout={route.layout}
            path={route.path}
            component={route.component}
            title={route.title}
            exact={route.exact}
        />
    );
};

const RunApp = () => {
    toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-bottom-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    };

    return (
        <AuthProvider>
            <AppProvider>
                <Router>
                    <CanonicalUrlUpdater /> {/* This hook is inside the Router */}
                    <CartProvider>
                        <TitleApp>
                            <ScrollToTop>
                                <Switch>
                                    {Object.keys(PRIVATE_ROUTES).map((key, index) => renderRoute(PRIVATE_ROUTES[key], index))}
                                    {Object.keys(PUBLIC_ROUTES).map((key, index) => renderRoute(PUBLIC_ROUTES[key], index))}
                                    <Route component={Page404} />
                                </Switch>
                            </ScrollToTop>
                        </TitleApp>
                    </CartProvider>
                </Router>
            </AppProvider>
        </AuthProvider>
    );
};

export default RunApp;

if (document.getElementById('app')) {
    ReactDOM.render(<RunApp />, document.getElementById('app'));
}
