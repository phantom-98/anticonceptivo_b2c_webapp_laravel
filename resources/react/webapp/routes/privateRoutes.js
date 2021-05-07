import React from 'react';
import BaseTemplate from "../template";
import PrivateMiddleware from "./middleware/PrivateMiddleware";
import Account from "../pages/private/Account";

const PRIVATE_ROUTES = {

    // VIDEO_CALL: {
    //     path: '/video-llamada/:token',
    //     title: 'Video Llamada',
    //     component: VideoCall,
    //     exact: true,
    //     // template: Template.PUBLIC,
    //     layout: props => <VideoCallTemplate {...props} />,
    //     middleware: props => <PrivateMiddleware {...props} />
    // }

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
