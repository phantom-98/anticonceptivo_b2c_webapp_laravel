import React from 'react';

import PublicMiddleware from "./middleware/PublicMiddleware";
import BaseTemplate from "../template";
import Home from '../pages/public/Home';

const PUBLIC_ROUTES = {
    HOME: {
        path: "/",
        title: "Inicio",
        component: Home,
        exact: true,
        layout: props => <BaseTemplate {...props} menu="public"/>,
        middleware: props => <PublicMiddleware {...props} />
    },
};


export default PUBLIC_ROUTES;
