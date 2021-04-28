import React from 'react';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";

const WhatCanDo = () => {

    let urlRegisterCompany = PUBLIC_ROUTES.REGISTER_TYPE.path;
    urlRegisterCompany = urlRegisterCompany.replace(':type', 'empresa');

    let urlRegisterProfessional = PUBLIC_ROUTES.REGISTER_TYPE.path;
    urlRegisterProfessional = urlRegisterProfessional.replace(':type', 'profesional');

    return (
        <section className="py-5 my-5">
            <div className="container" style={{maxWidth: '1014px'}}>
                <div className="row">

                    <div className="col-12">
                        <h2 className="font-35 bold text-secondary text-center">
                            ¿Qué puedes hacer en ikiru?
                        </h2>
                    </div>
                </div>

                <div className="row justify-content-center pb-4 pt-5">
                    <div className="col-6">
                        <div className="card-what-can-do">
                            <div className="row my-auto">
                                <div className="col-6 d-flex">
                                    <img className="w-100 my-auto"
                                         src="/themes/web/assets/images/home/what-do-professional.svg" alt="Ikiru"/>
                                </div>
                                <div className="col-6 d-flex">
                                    <div className="mt-auto">
                                        <h3 className="font-signika font-35 bold mb-0">ikiru para <span className="d-block">profesionales</span></h3>
                                        {/*<p className="font-epilogue font-12 light">*/}
                                        {/*    Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho.*/}
                                        {/*</p>*/}
                                        <Link to={urlRegisterProfessional} className="btn btn-primary btn-rounded lh-19 mt-3 px-5">
                                            <span className="font-12 regular">Comienza ahora</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card-what-can-do">
                            <div className="row my-auto">
                                <div className="col-6 d-flex">
                                    <img className="w-100 my-auto"
                                         src="/themes/web/assets/images/home/what-do-company.svg" alt="Ikiru"/>
                                </div>
                                <div className="col-6 d-flex">
                                    <div className="mt-auto">
                                        <h3 className="font-signika font-35 bold mb-0">ikiru para <span className="d-block">empresa</span></h3>
                                        {/*<p className="font-epilogue font-12 light">*/}
                                        {/*    Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho.*/}
                                        {/*</p>*/}
                                        <Link to={urlRegisterCompany} className="btn btn-primary btn-rounded lh-19 mt-3 px-5">
                                            <span className="font-12 regular">Comienza ahora</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatCanDo;
