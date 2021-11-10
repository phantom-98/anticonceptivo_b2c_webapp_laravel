import React, {Fragment} from 'react';
import LogoSvg from "../assets/images/logo-full.svg";

import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <Fragment>
            <div className="p-5">
                <div className="container d-flex" style={{ height : 'calc(100vh - 136px)'}}>
                    <div className="row my-auto">
                        <div className="col-12  text-center">
                            <img src={LogoSvg} rel="nofollow" alt="anticonceptivo.cl"/>
                        </div>
                        <div className="col-12 text-center mt-4">
                            <h1 className="font-32 text-primary black">
                                Página no encontrada
                            </h1>
                            <p className="font-16 light mt-4">
                                Lo sentimos, pero la página que buscas no existe o no se puede encontrar
                            </p>
                        </div>
                        <div className="col-12 text-center mt-4">
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
