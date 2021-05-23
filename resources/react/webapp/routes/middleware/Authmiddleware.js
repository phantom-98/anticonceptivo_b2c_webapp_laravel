import React, {useContext, useEffect, useState} from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import {AuthContext} from "../../context/AuthProvider";

const Authmiddleware = ({component: Component, layout: Layout}) => {

    const {auth} = useContext(AuthContext);

    return <Route render={(props) => {

        // console.log(auth);
        // here you can apply condition
        // if (!auth) {
        if (!true) {
            return (
                <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
            );
        }

        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    }}
    />
};

export default withRouter(Authmiddleware);

