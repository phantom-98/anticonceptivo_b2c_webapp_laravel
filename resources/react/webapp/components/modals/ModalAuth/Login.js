import React, {useContext, useState} from 'react';
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";
// import {LOCAL_STORAGE} from "../../../context/LocalStorage";
// import * as Services from "../../../Services";
// import PUBLIC_ROUTES from "../../../routes/publicRoutes";
// import toastr from "toastr";
import {AuthContext} from "../../../context/AuthProvider";
import {setCleanInputError} from "../../../helpers/GlobalUtils";

const Login = () => {

    const {showModalAuth} = useContext(AppContext);
    const {login} = useContext(AuthContext);

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleData = (e) => {
        setData({...data,
            [e.target.name]: e.target.value
        })
    }

    const doLogin = () => {
        login(data);
    }

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
                                   onChange={handleData}
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
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
                                   onChange={handleData}
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
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
                        onClick={() => doLogin()}>
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
