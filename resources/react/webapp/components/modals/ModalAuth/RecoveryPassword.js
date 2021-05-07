import React, {useContext} from 'react';
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";

const RecoveryPassword = () =>{

    const {showModalAuth} = useContext(AppContext)

    return (
        <div className="row">
            <div className="col-md-12">
                <h3 className="modal-title lh-34">RECUPERAR<br/>
                    CONTRASEÑA</h3>
            </div>
            <div className="col-md-12 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                           <div className="font-poppins font-14 regular color-6C6B6B mb-3">
                               Proporciona tu email para recuperar o <br/>
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
                            />
                        </div>
                    </div>
                    <div className="col-md-12 text-right">
                        <button type="button" className="link font-12"
                                onClick={() => showModalAuth(ModalAuthMode.SET_NEW_PASSWORD)}>
                            <span>Ya tengo el código</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 py-2 text-center">
                <button type="button" className="btn btn-bicolor btn-block btn-auth"
                        onClick={() => alert('Iniciar Sesión')}>
                    <span>CONFIRMAR</span>
                </button>
            </div>

            <div className="col-md-12 py-2 text-center">
                <button type="button" className="link" onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default RecoveryPassword
