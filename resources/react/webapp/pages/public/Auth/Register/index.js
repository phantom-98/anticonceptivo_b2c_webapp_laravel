import React, {Fragment} from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";

const Register = () => {


    let urlRegisterCompany = PUBLIC_ROUTES.REGISTER_TYPE.path;
    urlRegisterCompany = urlRegisterCompany.replace(':type', 'empresa');

    let urlRegisterProfessional = PUBLIC_ROUTES.REGISTER_TYPE.path;
    urlRegisterProfessional = urlRegisterProfessional.replace(':type', 'profesional');

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="row">

                        <div className="col auto">
                            <Card style={{width: '367px', minHeight: '299px'}}>
                                <Card.Body>
                                    <div className="p-4">
                                        <div className="pb-3 text-center" style={{ height : "140px"}}>
                                            <img style={{ maxHeight : "130px"}} src="/themes/web/assets/images/auth/professional.svg" alt="Ikiru - Company"/>
                                        </div>
                                        <div className="d-flex" style={{
                                            minHeight: '98px'
                                        }}>
                                            <h2 className="font-signika font-25 bold text-primary my-auto">
                                                Regístrate como Profesional
                                            </h2>
                                        </div>
                                        <div>
                                            <Link to={urlRegisterProfessional} className="btn btn-secondary btn-rounded lh-19 mt-3 px-5">
                                                <span className="font-12 regular">Comienza ahora</span>
                                            </Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col auto">
                            <Card style={{width: '367px', minHeight: '299px'}}>
                                <Card.Body>
                                    <div className="p-4">
                                        <div className="pb-3 text-center" style={{ height : "140px"}}>
                                            <img style={{ maxHeight : "130px"}} src="/themes/web/assets/images/auth/company.svg" alt="Ikiru - Company"/>
                                        </div>
                                        <div className="d-flex" style={{
                                            minHeight: '98px'
                                        }}>
                                            <h2 className="font-signika font-25 bold text-primary my-auto">
                                                {/*¿Eres empresa y necesitas contratar a un profesional?*/}
                                                Regístrate como Empresa
                                            </h2>
                                        </div>
                                        <div>
                                            <Link to={urlRegisterCompany} className="btn btn-secondary btn-rounded lh-19 mt-3 px-5">
                                                <span className="font-12 regular">Comienza ahora</span>
                                            </Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col py-4 text-center">
                            <p className="font-epilogue font-14 light">¿Ya estás registrado? <Link to={PUBLIC_ROUTES.LOGIN.path} className="btn-link">Ingresa</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
