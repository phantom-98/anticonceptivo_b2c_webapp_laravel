import React, {useContext} from 'react';
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";

const SetNewPassword = () => {

    const {showModalAuth} = useContext(AppContext)

    return (
        <div className="row">
            <div className="col-md-12">
                <h3 className="modal-title lh-34">NUEVA<br/>
                    CONTRASEÑA</h3>
            </div>
            <div className="col-md-12 mb-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password"
                                   className="form-control form-control-custom"
                                   id="password"
                                   name="password"
                                   placeholder="*********"
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Repetir Contraseña</label>
                            <input type="password"
                                   className="form-control form-control-custom"
                                   id="password_confirmation"
                                   name="password_confirmation"
                                   placeholder="*********"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 py-2 text-center mb-3">
                <button type="button" className="btn btn-bicolor btn-block btn-auth"
                        onClick={() => alert('Iniciar Sesión')}>
                    <span>INICIAR SESIÓN</span>
                </button>
            </div>
        </div>
    );
};

export default SetNewPassword
