import React, {Fragment, useEffect, useState, useContext} from 'react';

import toastr from "toastr";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import { AuthContext } from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";

const Personal = ({professional}) => {

    const { updateAuth } = useContext(AuthContext);

    const [dataForm, setDataForm] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    useEffect(() => {
        if (professional) {
            setDataForm({
                first_name: professional.first_name,
                last_name: professional.last_name,
                email: professional.email,
                professional_id : professional.id
            })
        }
    }, [professional])

    const handleDataForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const store = () => {
        Services.DoPost(Services.ENDPOINT.PANEL.PROFESSIONAL.ACCOUNT.UPDATE_PERSONAL_INFORMATION, dataForm).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message);
                    updateAuth(response.data.auth);
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
                            type="text"
                            className={`form-control form-control-w2 ${
                                dataForm.first_name.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="first_name"
                            name="first_name"
                            value={dataForm.first_name}
                        />
                        <label htmlFor="name">Nombres</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="text"
                            className={`form-control form-control-w2 ${
                                dataForm.last_name && dataForm.last_name.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="last_name"
                            name="last_name"
                            value={dataForm.last_name}
                        />
                        <label htmlFor="name">Apellidos</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="email"
                            className={`form-control form-control-w2 ${
                                dataForm.email && dataForm.email.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="email"
                            name="email"
                            value={dataForm.email}
                        />
                        <label htmlFor="name">Email</label>
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

export default Personal;
