import React, {Fragment, useEffect, useState, useContext} from 'react';

import toastr from "toastr";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import { AuthContext } from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";

const Agent = ({company}) => {

    const { updateAuth } = useContext(AuthContext);

    const [dataForm, setDataForm] = useState({
        agent_name: '',
        agent_position: '',
        agent_email: '',
        agent_phone: '',
        type: 0,
    });

    useEffect(() => {
        if (company) {
            setDataForm({
                agent_name: company.agent_name,
                agent_position: company.agent_position,
                agent_email: company.agent_email,
                agent_phone: company.agent_phone,
                company_id : company.id
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
        Services.DoPost(Services.ENDPOINT.PANEL.COMPANY.ACCOUNT.UPDATE_AGENT_INFORMATION, dataForm).then(response => {
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
                <div className="col-md-4 offset-2">
                    <div className="form-group form-group-w2">
                        <input
                            type="text"
                            className={`form-control form-control-w2 ${
                                dataForm.agent_name && dataForm.agent_name.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="agent_name"
                            name="agent_name"
                            value={dataForm.agent_name}
                        />
                        <label htmlFor="agent_name">Nombre</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="text"
                            className={`form-control form-control-w2 ${
                                dataForm.agent_position && dataForm.agent_position.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="agent_position"
                            name="agent_position"
                            value={dataForm.agent_position}
                        />
                        <label htmlFor="agent_position">Cargo</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-2">
                    <div className="form-group form-group-w2">
                        <input
                            type="text"
                            className={`form-control form-control-w2 ${
                                dataForm.agent_phone && dataForm.agent_phone.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="agent_phone"
                            name="agent_phone"
                            value={dataForm.agent_phone}
                        />
                        <label htmlFor="agent_phone">Télefono</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="email"
                            className={`form-control form-control-w2 ${
                                dataForm.agent_email && dataForm.agent_email.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="agent_email"
                            name="agent_email"
                            value={dataForm.agent_email}
                        />
                        <label htmlFor="agent_email">Email</label>
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

export default Agent;
