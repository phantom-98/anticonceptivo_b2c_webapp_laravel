import React, {Fragment, useEffect, useState} from 'react';

import {setCleanInputError, setInputError} from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import toastr from "toastr";

const Password = ({company}) => {

    const [dataForm, setDataForm] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        if (company) {
            setDataForm({
                ...dataForm,
                company_id: company.id
            })
        }
    }, [company])

    const handleDataForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const store = () => {
        Services.DoPost(Services.ENDPOINT.PANEL.COMPANY.ACCOUNT.UPDATE_PASSWORD, dataForm).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setDataForm({
                        current_password: '',
                        password: '',
                        password_confirmation: ''
                    })
                    toastr.success(response.message);
                },
                error: () => {
                    toastr.error(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-4 offset-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="password"
                            className={`form-control form-control-w2 ${
                                dataForm.current_password.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="current_password"
                            name="current_password"
                            value={dataForm.current_password}
                        />
                        <label htmlFor="name">Contraseña Actual</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="password"
                            className={`form-control form-control-w2 ${
                                dataForm.password.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="password"
                            name="password"
                            value={dataForm.password}
                        />
                        <label htmlFor="name">Nueva Contraseña</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="password"
                            className={`form-control form-control-w2 ${
                                dataForm.password_confirmation.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="password_confirmation"
                            name="password_confirmation"
                            value={dataForm.password_confirmation}
                        />
                        <label htmlFor="name">Repetir nueva Contraseña</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row pt-4">
                <div className="col-md-4 offset-4">
                    <div className="form-group text-center">
                        <button
                            className="btn btn-primary btn-rounded btn-form"
                            onClick={store}
                        >
                            <span className="font-12 regular">Guardar</span>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Password;
