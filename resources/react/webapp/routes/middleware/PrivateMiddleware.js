import React, {useContext, useEffect, useState} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider";
import PUBLIC_ROUTES from "../publicRoutes";

const PrivateMiddleware = ({path: path, component: Component, layout: Layout, title}) => {

    const {auth, authType} = useContext(AuthContext);
    const [load, setLoad] = useState(false);

    document.title = (title) + ' - Anticonceptivo';

    useEffect(() => {

        let chatIframeModified = false;

        document.addEventListener('DOMNodeInserted', function () {
            let chatIframe = document.getElementById('live-chat-widget');

            if (!chatIframeModified) {
                if (chatIframe) {
                    if (title == 'Inicio') {
                        chatIframe.style = 'display: flex;';
                    } else {
                        chatIframe.style = 'display: none';
                    }
                    chatIframeModified = true;
                }
            }
        });

    }, []);

    useEffect(() => {
        setLoad(true)
    }, [])

    return (
        load ?
            <Route path={path} render={(props) => {

                if (!auth) {
                    return (
                        <Redirect to={{pathname: PUBLIC_ROUTES.HOME.path, state: {from: props.location}}}/>
                    );
                }
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                );
            }}
            />
            : null
    )
};

export default withRouter(PrivateMiddleware);
