import React, {useContext, useState} from 'react';
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";
import {Form} from 'react-bootstrap';
import * as Services from "../../../Services";
import {setCleanInputError} from "../../../helpers/GlobalUtils";

const Register = () => {

    const {showModalAuth} = useContext(AppContext)

    const defaultData = {
        first_name: '',
        last_name: '',
        email: '',
        id_type: 'RUT',
        id_number: '',
        phone_code: '+56',
        phone: '',
        password: '',
    }

    const [data, setData] = useState(defaultData);

    const handleCheckBox = (e) => {
        if (e.target.id == 'custom-inline-radio-rut') {
            setData({
                ...data,
                [e.target.name]: 'RUT'
            })
        }

        if (e.target.id == 'custom-inline-radio-dni') {
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

    const save = () => {
        let url = Services.ENDPOINT.AUTH.REGISTER;
        let formData = data;
        
        Services.DoPost(url, formData).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <h3 className="modal-title">Regístrate</h3>
            </div>
            <div className="col-md-12 mb-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="first_name">Nombres</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="first_name"
                                   name="first_name"
                                   onChange={(e) => handleData(e)}
                                   value={data.first_name}
                                   placeholder="Nombres"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="last_name">Apellidos</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="last_name"
                                   name="last_name"
                                   onChange={(e) => handleData(e)}
                                   value={data.last_name}
                                   placeholder="Apellidos"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="email">E-Mail</label>
                            <input type="email"
                                   className="form-control form-control-custom"
                                   id="email"
                                   name="email"
                                   onChange={(e) => handleData(e)}
                                   value={data.email}
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
                                    name="id_type"
                                    onClick={(e) => handleCheckBox(e)}
                                    checked={data.id_type === 'RUT' ? true : false}
                                    id={`custom-inline-radio-rut`}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label="DNI"
                                    type="radio"
                                    name="id_type"
                                    onClick={(e) => handleCheckBox(e)}
                                    checked={data.id_type === 'DNI' ? true : false}
                                    id={`custom-inline-radio-dni`}
                                />
                            </div>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="id_number"
                                   name="id_number"
                                   onChange={(e) => handleData(e)}
                                   value={data.id_number}
                                   placeholder=""
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="phone_code">Código</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="phone_code"
                                name="phone_code"
                                onChange={(e) => handleData(e)}
                                value={data.phone_code}
                                onFocus={setCleanInputError}
                            >
                                <option defaultValue value="+56">+56</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="phone"
                                   name="phone"
                                   onChange={(e) => handleData(e)}
                                   value={data.phone}
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
