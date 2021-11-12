import React, {useContext, useState} from 'react';
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";
import {Form} from 'react-bootstrap';
import * as Services from "../../../Services";
import {setCleanInputError, setInputError, setCleanInputErrorById} from "../../../helpers/GlobalUtils";
import RutValidator from "w2-rut-validator";
import {LOCAL_STORAGE} from "../../../context/LocalStorage";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";

const Register = () => {

    const {showModalAuth} = useContext(AppContext)

    const defaultData = {
        register_first_name: '',
        register_last_name: '',
        register_email: '',
        register_id_type: 'RUT',
        register_id_number: '',
        register_phone_code: '+56',
        register_phone: '',
        password: '',
        accept_terms: false
    }

    const [data, setData] = useState(defaultData);
    const [rutFlag, setRutFlag] = useState(false);

    const handleCheckBox = (e) => {
        if (e.target.id == 'custom-inline-radio-rut') {
            if ((data.register_id_number).length > 0) {
                if (!RutValidator.validate(data.register_id_number)) {
                    setRutFlag(true);
                    setInputError('register_id_number', 'El formato del RUT no es correcto.')
                }else{
                    setRutFlag(false);
                }
            }
            setData({
                ...data,
                [e.target.name]: 'RUT'
            })
        }

        if (e.target.id == 'custom-inline-radio-dni') {
            if ((data.register_id_number).length > 0) {
                if (!RutValidator.validate(data.register_id_number)) {
                    setCleanInputErrorById('register_id_number')
                }
            }
            setRutFlag(false);
            setData({
                ...data,
                [e.target.name]: 'DNI'
            })
        }
    }

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleTerms = (e) => {
        setData({...data,
            [e.target.name]: data.accept_terms ? false : true
        })
    }

    const save = () => {
        if (rutFlag) {
        toastr.warning('El formato del rut es incorrecto.','Perfil no actualizado.');
        } else {
            let url = Services.ENDPOINT.AUTH.REGISTER;
            let formData = data;
            
            Services.DoPost(url, formData).then(response => {
                Services.Response({
                response: response,
                    success: () => {
                        localStorage.setItem(LOCAL_STORAGE.AUTH, JSON.stringify(response.data.auth));
                        localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, response.data.auth_token);

                        window.location.href = PUBLIC_ROUTES.HOME.path;
                    },
                });
            }).catch(error => {
                Services.ErrorCatch(error)
            });
        }
    }

    const RutFormat = e => {
        let clean = (e.target.value).replace(/[^0-9Kk]/g, '');
        clean = clean.toString().toUpperCase();

        if (clean.length < 14) {
            setData({
                ...data,
                [e.target.name]: RutValidator.format(clean)
            });
        }
    }

    const RutValidate = e => {
        if ((e.target.value).length > 0) {
            if (!RutValidator.validate(e.target.value)) {
                setRutFlag(true);
                setInputError(e.target.id, 'El formato del RUT no es correcto.')
            }else{
                setRutFlag(false);
            }
        }
    }

    var inputProps =  {};

    if (data.register_id_type === 'RUT') {
        inputProps.onKeyUp = RutFormat;
        inputProps.onBlur = RutValidate;
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <h3 className="modal-title">Regístrate</h3>
            </div>
            <div className="col-md-12 mb-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="register_first_name">Nombres</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="register_first_name"
                                   name="register_first_name"
                                   onChange={(e) => handleData(e)}
                                   value={data.register_first_name}
                                   placeholder="Nombres"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="register_last_name">Apellidos</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="register_last_name"
                                   name="register_last_name"
                                   onChange={(e) => handleData(e)}
                                   value={data.register_last_name}
                                   placeholder="Apellidos"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="register_email">E-Mail</label>
                            <input type="email"
                                   className="form-control form-control-custom"
                                   id="register_email"
                                   name="register_email"
                                   onChange={(e) => handleData(e)}
                                   value={data.register_email}
                                   placeholder="E-Mail"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            {/*<label htmlFor="id_number">RUT</label>*/}
                            <div className="">
                                <Form.Check
                                    custom
                                    inline
                                    label="RUT"
                                    type="radio"
                                    name="register_id_type"
                                    onClick={(e) => handleCheckBox(e)}
                                    checked={data.register_id_type === 'RUT' ? true : false}
                                    id={`custom-inline-radio-rut`}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label="DNI"
                                    type="radio"
                                    name="register_id_type"
                                    onClick={(e) => handleCheckBox(e)}
                                    checked={data.register_id_type === 'DNI' ? true : false}
                                    id={`custom-inline-radio-dni`}
                                />
                            </div>
                            <input type="text"
                                className="form-control form-control-custom"
                                id="register_id_number"
                                name="register_id_number"
                                placeholder=""
                                onChange={(e) => handleData(e)}
                                value={data.register_id_number}
                                onFocus={setCleanInputError}
                                {...inputProps}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="register_phone_code">Código</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="register_phone_code"
                                name="register_phone_code"
                                onChange={(e) => handleData(e)}
                                value={data.register_phone_code}
                                onFocus={setCleanInputError}
                            >
                                <option defaultValue value="+56">+56</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="register_phone">Teléfono</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="register_phone"
                                   name="register_phone"
                                   maxLength="15"
                                   onChange={(e) => handleData(e)}
                                   value={data.register_phone}
                                   placeholder="9 5643 2653"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password"
                                   className="form-control form-control-custom"
                                   id="password"
                                   name="password"
                                   onChange={(e) => handleData(e)}
                                   value={data.password}
                                   placeholder="****"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="">
                            <Form.Check
                                custom
                                type="checkbox"
                                id="accept_terms"
                                name="accept_terms"
                                onClick={handleTerms}
                                checked={data.accept_terms}
                                onFocus={setCleanInputError}
                                label={<span className="font-inter font-12 regular color-707070">Aceptar <span className="link pointer" onClick={() => alert('Términos y condiciones')}>Términos y condiciones</span> y <span className="link pointer" onClick={() => alert('Políticas de privacidad')}>Políticas de privacidad</span> </span>}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 py-2 text-center">
                <button type="button" className="btn btn-bicolor btn-block btn-auth"
                        onClick={() => save()}>
                    <span>Registrarme</span>
                </button>
            </div>

            <div className="col-md-12 py-2 text-center">
                <button type="button" className="link" onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                    Ya tengo cuenta
                </button>
            </div>
        </div>
    );
};

export default Register
