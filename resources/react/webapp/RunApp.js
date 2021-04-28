import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppProvider from "./context/AppProvider";
import AuthProvider from "./context/AuthProvider";
import BaseTemplate from "./template";

// 404
import Page404 from "./template/Page404";

import ScrollToTop from "./ScrollToTop";
import {AuthType, Template} from "./Globals";
import TitleApp from "./TitleApp";
import PUBLIC_ROUTES from "./routes/publicRoutes";
import PANEL_COMPANY_ROUTES from "./routes/companyRoutes";
import PANEL_PROFESSIONAL_ROUTES from "./routes/professionalRoutes";
import PRIVATE_ROUTES from "./routes/privateRoutes";
import LazyLoading from "./components/LazyLoading";
import NotifyProvider from "./context/NotifyProvider";


const ProcessTemplate = (template) => {

    switch (template) {
        case Template.PUBLIC:
            return props => <BaseTemplate {...props} />
        case Template.PRIVATE:
            return props => <BaseTemplate {...props} />
        case Template.PANEL_COMPANY:
            return props => <BaseTemplate {...props} />
        case Template.PANEL_PROFESSIONAL:
            return props => <BaseTemplate {...props} />
        default :
            return null;
        // break;
    }
}

const renderRoute = (route, index) => {

    const Middleware = route.middleware;

    return <Middleware
        key={index}
        layout={route.layout}
        path={route.path}
        component={route.component}
        title={route.title}
        exact={route.exact}
    />
}


const RunApp = () => {
    return (
        <AppProvider>
            <AuthProvider>
                <NotifyProvider>
                    <Router>
                        <TitleApp>
                            <ScrollToTop>
                                {/*<React.Suspense fallback={<LazyLoading />}>*/}
                                <Switch>

                                    {

                                        Object.keys(PANEL_COMPANY_ROUTES).map((key, index) => (renderRoute(PANEL_COMPANY_ROUTES[key], index)))

                                    }

                                    {

                                        Object.keys(PANEL_PROFESSIONAL_ROUTES).map((key, index) => (renderRoute(PANEL_PROFESSIONAL_ROUTES[key], index)))

                                    }

                                    {

                                        Object.keys(PRIVATE_ROUTES).map((key, index) => (renderRoute(PRIVATE_ROUTES[key], index)))

                                    }

                                    {

                                        Object.keys(PUBLIC_ROUTES).map((key, index) => (renderRoute(PUBLIC_ROUTES[key], index)))

                                    }
                                    <Route component={Page404}/>

                                </Switch>
                                {/*</React.Suspense>*/}
                            </ScrollToTop>
                        </TitleApp>
                    </Router>
                </NotifyProvider>
            </AuthProvider>
        </AppProvider>
    );
};

export default RunApp;

if (document.getElementById('app')) {
    ReactDOM.render(<RunApp/>, document.getElementById('app'));
}
