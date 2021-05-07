import React from 'react';
import ReactDOM from 'react-dom';
import Step from "../../../components/shopping/Step";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {ModalAuthMode} from "../../../Globals";

const GrantUser = ({setView}) =>{
    return (
        <div className="panel panel-cart mb-3">
            <div className="panel-body">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="font-poppins font-14 bold color-2A317F">Iniciar Sesión</h3>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="email">E-Mail</label>
                                    <input type="email"
                                           className="form-control form-control-custom"
                                           id="email"
                                           name="email"
                                           placeholder="hola@email.com"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-1">
                                    <label htmlFor="password">Contraseña</label>
                                    <input type="password"
                                           className="form-control form-control-custom"
                                           id="password"
                                           name="password"
                                           placeholder="*********"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="py-3">
                            <button className="btn btn-bicolor btn-block" onClick={() => setView('user-form')}>
                                <span>INICIAR SESIÓN</span>
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button type="button" className="link" onClick={() => setView('user-form')}>
                                    <span className="font-12">Recuperar contraseña</span>
                                </button>
                            </div>
                            <div className="col-md-6 text-right">
                                <button type="button" className="link" onClick={() => setView('user-form')}>
                                    <span className="font-12">Crear cuenta</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h3 className="font-poppins font-14 bold color-2A317F">Compra sin registro</h3>
                        <p className="font-poppins font-12 regular color-484848 mb-0">
                            Puedes compra sin guardar tus datos, registrarse es opcional.
                        </p>
                        <div className="py-3">
                            <button className="btn btn-bicolor btn-block" onClick={() => setView('user-form')}>
                                <span>CONTINUAR CÓMO INVITADO</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrantUser
