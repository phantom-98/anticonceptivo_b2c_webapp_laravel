import React, {useEffect} from "react";
import {Route, withRouter} from "react-router-dom";

const PublicMiddleware = ({path: path, component: Component, layout: Layout, title, exact}) => {

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

    return <Route exact={exact} path={path} render={(props) => {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    }}
    />

};

export default withRouter(PublicMiddleware);
