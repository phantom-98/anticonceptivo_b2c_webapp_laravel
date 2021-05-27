import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Form} from "react-bootstrap";

const FormPersonalDataDELETE = ({password = true}) =>{
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="first_name">Nombres</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="first_name"
                           name="first_name"
                           placeholder="Nombres"
                    />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="last_name">Apellidos</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="last_name"
                           name="last_name"
                           placeholder="Apellidos"
                    />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email"
                           className="form-control form-control-custom"
                           id="email"
                           name="email"
                           placeholder="E-Mail"
                    />
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
                            name="id_number_type"
                            checked
                            id={`custom-inline-radio-rut`}
                        />
                        <Form.Check
                            custom
                            inline
                            label="DNI"
                            type="radio"
                            name="id_number_type"
                            id={`custom-inline-radio-dni`}
                        />
                    </div>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="id_number"
                           name="id_number"
                           placeholder=""
                    />
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="phone_code">Código</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="phone_code"
                        name="phone_code"
                    >
                        <option value="+56">+56</option>
                    </select>
                </div>
            </div>

            <div className="col-md-9">
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="phone"
                           name="phone"
                           placeholder="987 654 321"
                    />
                </div>
            </div>
            {
                password ?
                    <Fragment>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password"
                                    className="form-control form-control-custom"
                                    id="password"
                                    name="password"
                                    placeholder="****"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password_confirmation">Nueva Contraseña</label>
                                <input type="password"
                                    className="form-control form-control-custom"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="****"
                                />
                            </div>
                        </div>
                     </Fragment> : null
            }
        </div>
    );
};

export default FormPersonalDataDELETE
