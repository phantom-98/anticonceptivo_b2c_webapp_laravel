import React, {useContext, useState, Fragment} from 'react';
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";
import * as Services from "../../../Services";
import toastr from "toastr";

const RecoveryPassword = () =>{

    const {showModalAuth, hideModalAuth, showModalAuthSuccess} = useContext(AppContext)

    const [data, setData] = useState({
        email: ''
    });

    const handleData = (e) => {
        setData({...data,
            [e.target.name]: e.target.value
        })
    }

    const send = () => {
        let url = Services.ENDPOINT.AUTH.RECOVERY_PASSWORD;
        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    hideModalAuth(ModalAuthMode.RECOVERY_PASSWORD);
                    showModalAuthSuccess();
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
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="modal-title lh-34">RECUPERAR<br/>CONTRASEÑA</h3>
                </div>
                <div className="col-md-12 mb-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                            <div className="font-poppins font-14 regular color-6C6B6B mb-3">
                                Proporciona tu email para recuperar o<br/>
                                actualizar tu contraseña.
                            </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-1">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email"
                                    className="form-control form-control-custom"
                                    id="email"
                                    name="email"
                                    placeholder="hola@email.com"
                                    onChange={(e) => handleData(e)}
                                />
                                <div className="invalid-feedback"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 py-2 text-center">
                    <button type="button" className="btn btn-bicolor btn-block btn-auth"
                            onClick={() => send()}>
                        <span>CONFIRMAR</span>
                    </button>
                </div>

                <div className="col-md-12 py-2 text-center">
                    <button type="button" className="link" onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default RecoveryPassword
