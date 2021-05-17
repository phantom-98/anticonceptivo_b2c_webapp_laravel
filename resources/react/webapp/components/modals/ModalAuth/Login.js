import React, {useContext, useState} from 'react';
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";
import {LOCAL_STORAGE} from "../../../context/LocalStorage";
// import {AuthContext} from "../../../context/AuthProvider"
import * as Services from "../../../Services";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";

const Login = () => {

    const {showModalAuth} = useContext(AppContext)

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleData = (e) => {
        setData({...data,
            [e.target.name]: e.target.value
        })
    }

    const login = () => {
        let url = Services.ENDPOINT.AUTH.LOGIN;
        let dataForm = data;

        Services.DoPost(url, dataForm).then(response => {
            Services.Response({
                response: response,
                success: () => {

                    localStorage.setItem(LOCAL_STORAGE.AUTH, JSON.stringify(response.data.auth));
                    localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, response.data.auth_token);

                    window.location.href = PUBLIC_ROUTES.HOME.path;
                },
                error: () => {
                    toastr.error(response.message);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
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
                                   onChange={(e) => handleData(e)}
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
                                   onChange={(e) => handleData(e)}
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
                        onClick={() => login()}>
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
