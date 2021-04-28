import React, {useContext, useEffect, useState} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider";
import {AuthType} from "../../Globals";
import PUBLIC_ROUTES from "../publicRoutes";


const PrivateMiddleware = ({path: path, component: Component, layout: Layout}) => {

    const {auth, authType} = useContext(AuthContext);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true)
    }, [])

    return (
        load ?
            <Route path={path} render={(props) => {

                // if ((authType !== AuthType.DOCTOR && authType !== AuthType.PATIENT) || !auth) {
                //     return (
                //         <Redirect to={{pathname: PUBLIC_ROUTES.HOME.path, state: {from: props.location}}}/>
                //     );
                // }
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
