import React, {Fragment} from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";

const Completed = () => {

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <Card style={{minHeight: '371px', maxWidth : '761px'}}>
                        <Card.Body>
                            <div className="row py-4 px-">
                                <div className="col-12 text-center mb-4">
                                    <img src="/themes/web/assets/images/short-profile/success.svg" alt="Ikiru"/>
                                </div>
                                <div className="col-12 text-center mb-4">
                                    <h3 className="font-signika font-24 bold text-primary">
                                        Tu perfil ha sido completado
                                    </h3>
                                    <p className="font-epilogue font-14 light color-3C3C3E">
                                        Te damos la bienvenida a Ikiru, ahora ya puedes acceder a tu panel de inicio.
                                    </p>
                                </div>
                                <div className="col-12 text-center">
                                    <Link to={PANEL_COMPANY_ROUTES.DASHBOARD.path}
                                          type="button"
                                          className="btn btn-form btn-primary btn-rounded px-4">
                                        <span>Continuar</span>
                                    </Link>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default Completed;
