import React, {useContext, useState, useEffect} from 'react';
// import * as Services from "../../../Services";
import {AppContext} from "../../../context/AppProvider";
import {setCleanInputError} from "../../../helpers/GlobalUtils";
// import {LOCAL_STORAGE} from "../../../context/LocalStorage";
// import PUBLIC_ROUTES from "../../../routes/publicRoutes";
// import toastr from 'toastr';
import {AuthContext} from '../../../context/AuthProvider';

const SetNewPassword = () => {

    const {getTokenModalAuth, hideModalAuth, showModalPasswordSuccess} = useContext(AppContext);
    const {recoveryPassword} = useContext(AuthContext);

    useEffect(() => {
        setData({
            ...data,
            token: getTokenModalAuth()
        })
    },[])

    const defaultModel = {
        password: '',
        password_confirmation: '',
        token: ''
    };

    const [data, setData] = useState(defaultModel)

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

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
                                   onChange={handleData}
                                   value={data.password}
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback"></div>
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
                                   onChange={handleData}
                                   value={data.password_confirmation}
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 py-2 text-center mb-3">
                <button type="button" className="btn btn-bicolor btn-block btn-auth"
                        onClick={() => recoveryPassword(data, hideModalAuth, showModalPasswordSuccess)}>
                    <span>INICIAR SESIÓN</span>
                </button>
            </div>
        </div>
    );
};

export default SetNewPassword
