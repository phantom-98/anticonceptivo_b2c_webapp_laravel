import React, {Fragment} from 'react';
import Form from "./Form";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";

const Login = () => {

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <Form />
                </div>
                <div className="col-12 py-4 text-center">
                    <p className="font-epilogue font-14 light">¿No tienes cuenta? <Link to={PUBLIC_ROUTES.REGISTER.path} className="btn-link">Registrate</Link></p>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
