import React, {useState, useContext} from 'react';
// import ReactDOM from 'react-dom';
// import Step from "../../../components/shopping/Step";
// import {Link} from "react-router-dom";
// import PUBLIC_ROUTES from "../../../routes/publicRoutes";
// import {ModalAuthMode} from "../../../Globals";
import {AuthContext} from "../../../context/AuthProvider";
import {setCleanInputError} from "../../../helpers/GlobalUtils";

const GrantUser = ({setView}) =>{

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
        login(data, true);
    }

    return (
        <div className="panel panel-cart mb-3">
            <div className="panel-body">
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-6 pb-5">
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
                                           onChange={handleData}
                                           onFocus={setCleanInputError}
                                    />
                                    <div className="invalid-feedback"/>
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
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>
                        </div>
                        <div className="py-3">
                            <button className="btn btn-bicolor btn-block" onClick={() => doLogin()}>
                                <span>INICIAR SESIÓN</span>
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-6 col-sm">
                                <button type="button" className="link" onClick={() => setView('user-form')}>
                                    <span className="font-12">Recuperar contraseña</span>
                                </button>
                            </div>
                            <div className="col-6 col-sm-auto text-right">
                                <button type="button" className="link" onClick={() => setView('user-form')}>
                                    <span className="font-12">Crear cuenta</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-12 col-lg-6">
                        <h3 className="font-poppins font-14 bold color-2A317F">Compra sin registro</h3>
                        <p className="font-poppins font-12 regular color-484848 mb-0">
                            Puedes compra sin guardar tus datos, registrarse es opcional.
                        </p>
                        <div className="py-3">
                            <button className="btn btn-bicolor btn-block" onClick={() => setView('user-form')}>
                                <span>CONTINUAR COMO INVITADO</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrantUser
