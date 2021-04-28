import React, {Fragment, useEffect, useState, useContext} from 'react';

import RutValidator from "w2-rut-validator";
import toastr from "toastr";
import {setCleanInputError, setInputError} from "../../../../../helpers/GlobalUtils";
import { AuthContext } from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";

const BankData = ({professional}) => {

    const { updateAuth } = useContext(AuthContext);
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        getResources();
    }, [])

    const getResources = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.ACCOUNT.DATA_BANK_RESOURCES;
        let professional_id = professional.id;

        Services.DoPost(url, { professional_id })
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setBanks(response.data.banks);
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const [dataForm, setDataForm] = useState({
        bank_account_number: '',
        bank_account_type: 'VISTA',
        bank_account_name: '',
        bank_account_email: '',
        bank_account_rut: '',
        bank_id: '',
    });

    useEffect(() => {
        if (professional) {
            setDataForm({
                bank_account_number: professional.bank_account_number,
                bank_account_type: professional.bank_account_type ? professional.bank_account_type : 'VISTA',
                bank_account_name: professional.bank_account_name,
                bank_account_email: professional.bank_account_email,
                bank_account_rut: professional.bank_account_rut,
                bank_id: professional.bank_id ? professional.bank_id : 1,
                professional_id: professional.id
            })
        }
    }, [professional])

    const handleDataForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const RutFormat = e => {
        let clean = (e.target.value).replace(/[^0-9Kk]/g, '')
        clean = clean.toString().toUpperCase();

        if (clean.length < 14) {
            setDataForm({
                ...dataForm,
                [e.target.name]: RutValidator.format(clean)
            })
        }
    }

    const RutValidate = e => {
        if ((e.target.value).length > 0) {
            if (!RutValidator.validate(e.target.value)) {
                setInputError(e.target.id, 'El formato del RUT no es correcto.')

                setDataForm({
                    ...dataForm,
                    bank_account_rut: ''
                })
            }
        }
    }


    const store = () => {
        Services.DoPost(Services.ENDPOINT.PANEL.PROFESSIONAL.ACCOUNT.UPDATE_DATA_BANK, dataForm).then(response => {
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
                                dataForm.bank_account_rut &&
                                dataForm.bank_account_rut.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            onKeyUp={RutFormat}
                            onBlur={RutValidate}
                            id="bank_account_rut"
                            name="bank_account_rut"
                            value={dataForm.bank_account_rut}
                        />
                        <label htmlFor="name">Rut</label>
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
                                dataForm.bank_account_name &&
                                dataForm.bank_account_name.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="bank_account_name"
                            name="bank_account_name"
                            value={dataForm.bank_account_name}
                        />
                        <label htmlFor="name">Nombre</label>
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
                                dataForm.bank_account_email &&
                                dataForm.bank_account_email.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="bank_account_email"
                            name="bank_account_email"
                            value={dataForm.bank_account_email}
                        />
                        <label htmlFor="name">Email</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-4">
                    <div className="form-group form-group-w2">
                        <select
                            className={`form-control form-control-w2 ${
                                dataForm.bank_id && dataForm.bank_id ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="bank_id"
                            name="bank_id"
                            value={dataForm.bank_id}
                        >
                            {banks.map((bank, index) => (
                                <option key={index} value={bank.id}>
                                    {bank.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="name">Banco</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-4">
                    <div className="form-group form-group-w2">
                        <select
                            className={`form-control form-control-w2 ${
                                dataForm.bank_account_type &&
                                dataForm.bank_account_type.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="bank_account_type"
                            name="bank_account_type"
                            value={dataForm.bank_account_type}
                        >
                            <option value="VISTA">VISTA</option>
                            <option value="CUENTA CORRIENTE">
                                CUENTA CORRIENTE
                            </option>
                            <option value="CHEQUERA ELECTRONICA">
                                CHEQUERA ELECTRONICA
                            </option>
                        </select>
                        <label htmlFor="name">Tipo de Cuenta</label>
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
                                dataForm.bank_account_number &&
                                dataForm.bank_account_number.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="bank_account_number"
                            name="bank_account_number"
                            value={dataForm.bank_account_number}
                        />
                        <label htmlFor="name">Número de cuenta</label>
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

export default BankData;
