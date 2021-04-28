import React, {useContext} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider";
import {AuthType, Routes} from "../../Globals";


const PublicMiddleware = ({path: path, component: Component, layout: Layout, title, exact}) => {

    // const {auth, authType} = useContext(AuthContext);
    document.title = 'Ikiru | ' + (title);

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
