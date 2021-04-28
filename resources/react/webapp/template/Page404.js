import React, {Fragment} from 'react';

import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <Fragment>

            <div className="p-5">
                <div style={{ height : '40px'}}>
                    <img id="logo-navbar" src="/themes/web/assets/images/logo.svg" rel="nofollow"/>
                </div>
                <div className="container d-flex" style={{ height : 'calc(100vh - 136px)'}}>
                    <div className="row my-auto">
                        <div className="col-12  text-center">
                            <img src="/themes/web/assets/images/404.svg" rel="nofollow"/>
                        </div>
                        <div className="col-12 text-center">
                            <h1 className="font-62 text-secondary black">
                                Página no encontrada
                            </h1>
                            <p className="font-20 light">
                                Lo sentimos, pero la página que buscas no existe o no se puede encontrar
                            </p>
                        </div>
                        <div className="col-12 text-center">
                            <Link to="/" className="btn btn-primary btn-rounded px-3 px-5">
                            <span className="text-uppercase font-12 medium">
                                volver al inicio
                            </span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default Page404;
