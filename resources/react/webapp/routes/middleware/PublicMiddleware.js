import React from "react";
import {Route, withRouter} from "react-router-dom";

const PublicMiddleware = ({path: path, component: Component, layout: Layout, title, exact}) => {

    document.title = (title) + ' - Anticonceptivo';

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
