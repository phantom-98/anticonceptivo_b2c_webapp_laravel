import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppProvider from "./context/AppProvider";
import AuthProvider from "./context/AuthProvider";
import BaseTemplate from "./template";

// 404
import Page404 from "./template/Page404";

import ScrollToTop from "./ScrollToTop";
import {Template} from "./Globals";
import TitleApp from "./TitleApp";
import PUBLIC_ROUTES from "./routes/publicRoutes";
import PRIVATE_ROUTES from "./routes/privateRoutes";

const ProcessTemplate = (template) => {

    switch (template) {
        case Template.PUBLIC:
            return props => <BaseTemplate {...props} />
        case Template.PRIVATE:
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
                <Router>
                    <TitleApp>
                        <ScrollToTop>
                            {/*<React.Suspense fallback={<LazyLoading />}>*/}
                            <Switch>

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
            </AuthProvider>
        </AppProvider>
    );
};

export default RunApp;

if (document.getElementById('app')) {
    ReactDOM.render(<RunApp/>, document.getElementById('app'));
}
