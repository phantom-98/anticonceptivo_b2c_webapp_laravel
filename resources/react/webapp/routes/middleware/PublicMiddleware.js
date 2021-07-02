import React, {useContext} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";

const PublicMiddleware = ({path: path, component: Component, layout: Layout, title, exact}) => {

    // const {auth, authType} = useContext(AuthContext);
    document.title = 'Anticonceptivo | ' + (title);

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
