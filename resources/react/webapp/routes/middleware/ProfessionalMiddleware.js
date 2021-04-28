import React, {useContext, useEffect, useState} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider";
import {AuthType} from "../../Globals";
import PUBLIC_ROUTES from "../publicRoutes";


const ProfessionalMiddleware = ({path: path, component: Component, layout: Layout, title, exact}) => {

    const {auth, authType} = useContext(AuthContext);
    const [load, setLoad] = useState(false);

    document.title = 'Ikiru | ' + (title);

    useEffect(() =>{
        setLoad(true)
    }, [])

    return (
        load ?
            <Route exact={exact} path={path} render={(props) => {

                if (authType !== AuthType.PROFESSIONAL || !auth) {
                    return (
                        <Redirect to={{pathname: PUBLIC_ROUTES.LOGIN.path, state: {from: props.location}}}/>
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

export default withRouter(ProfessionalMiddleware);
