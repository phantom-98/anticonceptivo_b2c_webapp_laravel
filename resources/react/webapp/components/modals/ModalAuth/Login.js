import React, {useContext} from 'react';
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";

const Login = () => {

    const {showModalAuth} = useContext(AppContext)

    return (
        <div className="row">
            <div className="col-md-12">
                <h3 className="modal-title">Iniciar sesión</h3>
            </div>
            <div className="col-md-12 mb-3">
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
                    <div className="col-md-12 text-right">
                        <button type="button" className="link font-12"
                                onClick={() => showModalAuth(ModalAuthMode.RECOVERY_PASSWORD)}>
                            <span>Recuperar contraseña</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 py-2 text-center">
                <button type="button" className="btn btn-bicolor btn-block btn-auth"
                        onClick={() => alert('Iniciar Sesión')}>
                    <span>INICIAR SESIÓN</span>
                </button>
            </div>

            <div className="col-md-12 py-2 text-center">
                <button type="button" className="link" onClick={() => showModalAuth(ModalAuthMode.REGISTER)}>Crear tu
                    cuenta aquí
                </button>
            </div>
        </div>
    );
};

export default Login
