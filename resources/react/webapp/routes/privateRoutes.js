import React from 'react';
import BaseTemplate from "../template";
import PrivateMiddleware from "./middleware/PrivateMiddleware";
const Account = React.lazy(() => import('../pages/private/Account'));


const PRIVATE_ROUTES = {

    ACCOUNT: {
        path: "/mi-cuenta/:section?",
        title: "Mi Cuenta",
        component: Account,
        exact: true,
        layout: props => <BaseTemplate {...props} />,
        middleware: props => <PrivateMiddleware {...props} />
    },
}

export default PRIVATE_ROUTES;
