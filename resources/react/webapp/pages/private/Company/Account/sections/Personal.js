import React, {Fragment, useEffect, useState, useContext} from 'react';

import toastr from "toastr";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import { AuthContext } from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import DivCheckBox from "../../../../../components/DivCheckBox";

const Personal = ({company}) => {

    const { updateAuth } = useContext(AuthContext);

    const types = [
        {
            id: 1,
            subtitle: 'Remota'
        },
        {
            id: 2,
            subtitle: 'Presencial'
        },
    ];

    const [dataForm, setDataForm] = useState({
        name: '',
        email: '',
        type: 0,
    });

    useEffect(() => {
        if (company) {
            setDataForm({
                name: company.name,
                email: company.email,
                type: company.work_mode ? company.work_mode == 'REMOTE' ? 1 : 2 : 0,
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

    const handleDivCheckBox = (typeId) => {
        setDataForm({
            ...dataForm,
            type: typeId
        })
    }

    const store = () => {
        Services.DoPost(Services.ENDPOINT.PANEL.COMPANY.ACCOUNT.UPDATE_PERSONAL_INFORMATION, dataForm).then(response => {
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
                                dataForm.name.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="name"
                            name="name"
                            value={dataForm.name}
                        />
                        <label htmlFor="name">Nombre Empresa</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
                <div className="col-md-4">
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

            <div className="row">
                <div className="col-md-4 offset-2">
                        <div>
                            <div className="font-epilogue font-14 light color-121212 mb-2 pt-3">
                                Modalidad de trabajo de la empresa
                            </div>
                        </div>
                    </div>
                </div>
            <div className="row">
                <div className="col-md-8 offset-2">
                    <div className="row">
                        {
                            types.map((type, index) => {
                                return <div className="col-md-6 mb-3" key={index}
                                            onClick={() => handleDivCheckBox(type.id)}>
                                    <DivCheckBox subtitle={type.subtitle} title={type.name}
                                                active={dataForm.type == type.id ? true : false}
                                    />
                                </div>;
                            })
                        }
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
