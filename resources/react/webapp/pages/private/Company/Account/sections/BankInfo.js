import React, {Fragment, useEffect, useState, useContext} from 'react';

import toastr from "toastr";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import { AuthContext } from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";

const BankInfo = ({company, closeModal = null}) => {

    const { updateAuth } = useContext(AuthContext);

    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState(0);

    const [dataForm, setDataForm] = useState({
        business_name: '',
        id_number: '',
        commercial_business: '',
        region_id: '',
        commune_id: '',
        address: '',
        commercial_email: '',
        commercial_phone: '',
    });

    useEffect(() => {
        if (company) {
            setDataForm({
                company_id: company.id,
                business_name: company.business_name,
                id_number: company.id_number,
                commercial_business: company.commercial_business,
                region_id: company.region_id,
                commune_id: company.commune_id,
                address: company.address,
                commercial_email: company.commercial_email,
                commercial_phone: company.commercial_phone,
            })
        }
    }, [company])

    useEffect(() => {
        if (regions.length > 0 && company) {
            setSelectedRegion(company.region_id)
        }
    },[regions, company])

    useEffect(()=>{
        getResources();
    },[]);

    useEffect(() => {
        if (selectedRegion) {
            const region = regions.find(r => r.id == selectedRegion)
            let tempCommunes = [];
            region.provinces.map((province) =>{
                province.communes.map((commune) =>{
                    tempCommunes.push(commune);
                })
            })
            let orderCommunes =  tempCommunes.sort((a, b)  => {
                const commA = a.name.toLowerCase();
                const commB = b.name.toLowerCase();

                let comparison = 0;
                if (commA > commB) {
                    comparison = 1;
                } else if (commA < commB) {
                    comparison = -1;
                }
                return comparison;
            })

            setCommunes(orderCommunes);

        }
    }, [selectedRegion]);

    const handleDataForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const getResources = () => {
        let url = Services.ENDPOINT.PANEL.COMMON.COMPLETE_PROFILE.RESOURCES.BILLING_INFO;
        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setRegions(response.data.regions);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const selectRegion = (e) => {
        const region = regions.find(r => r.id == e.target.value)
        setDataForm({
            ...dataForm,
            region_id : region.id,
            commune_id: null
        })
        setSelectedRegion(e.target.value)
    }

    const store = () => {
        Services.DoPost(Services.ENDPOINT.PANEL.COMPANY.ACCOUNT.UPDATE_BILLING_INFORMATION, dataForm).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message);
                    updateAuth(response.data.auth);
                    if (closeModal) {
                        closeModal();
                    }
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
                                dataForm.business_name && dataForm.business_name.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="business_name"
                            name="business_name"
                            value={dataForm.business_name}
                        />
                        <label htmlFor="business_name">Empresa o Razón social</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group form-group-w2">
                        <input
                            type="text"
                            className={`form-control form-control-w2 ${
                                dataForm.id_number && dataForm.id_number.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="id_number"
                            name="id_number"
                            value={dataForm.id_number}
                        />
                        <label htmlFor="id_number">RUT Empresa</label>
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
                                dataForm.commercial_business && dataForm.commercial_business.length ? "has-value" : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="commercial_business"
                            name="commercial_business"
                            value={dataForm.commercial_business}
                        />
                        <label htmlFor="name">Giro</label>
                        <div className="invalid-feedback" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group form-group-w2 mb-1">
                        <select
                            name="region_id"
                            id="region_id"
                            value={dataForm.region_id}
                            onChange={(e) => selectRegion(e)}
                            className={`form-control form-control-w2 ${
                                dataForm.region_id &&
                                dataForm.region_id.length
                                    ? "has-value"
                                    : "has-value"
                            }`}
                        >
                            <option value={null}></option>
                            {
                                regions.map(region => (
                                    <option value={region.id} key={region.id}>{region.name}</option>))
                            }
                        </select>
                        <label htmlFor="region">Región</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-2">
                    <div className="form-group form-group-w2 mb-1">
                        <select
                            name="commune_id"
                            id="commune_id"
                            value={dataForm.commune_id}
                            onChange={handleDataForm}
                            className={`form-control form-control-w2 ${
                                dataForm.commune_id &&
                                dataForm.commune_id.length
                                    ? "has-value"
                                    : "has-value"
                            }`}
                        >
                            <option value={null}></option>
                            {
                                communes.map(commune => (<option value={commune.id} key={commune.id}>
                                    {commune.name}
                                </option>))
                            }
                        </select>
                        <label htmlFor="commune">Comuna</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group form-group-w2 mb-1">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={dataForm.address}
                            onChange={handleDataForm}
                            className={`form-control form-control-w2 ${
                                dataForm.address &&
                                dataForm.address.length
                                    ? "has-value"
                                    : ""
                            }`}
                        />
                        <label htmlFor="address">Dirección</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-2">
                    <div className="form-group form-group-w2 mb-1">
                        <input
                            type="email"
                            name="commercial_email"
                            id="commercial_email"
                            value={dataForm.commercial_email}
                            onChange={handleDataForm}
                            className={`form-control form-control-w2 ${
                                dataForm.commercial_email &&
                                dataForm.commercial_email.length
                                    ? "has-value"
                                    : ""
                            }`}
                        />
                        <label htmlFor="commercial_email">Email</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group form-group-w2 mb-1">
                        <input
                            type="text"
                            name="commercial_phone"
                            id="commercial_phone"
                            value={dataForm.commercial_phone}
                            onChange={handleDataForm}
                            className={`form-control form-control-w2 ${
                                dataForm.commercial_phone &&
                                dataForm.commercial_phone.length
                                    ? "has-value"
                                    : ""
                            }`}
                        />
                        <label htmlFor="commercial_phone">Teléfono</label>
                    </div>
                </div>
            </div>

            <div className="row pt-4">
                {/* <div className="col-md-4 offset-4">
                    <div className="form-group text-center">
                        <button
                            className="btn btn-primary btn-rounded btn-form"
                            onClick={store}
                        >
                            <span className="font-12 regular">Guardar</span>
                        </button>
                    </div>
                </div> */}
                <div className="col-12 text-center pt-3">
                    <div className="row no-gutters">
                        <div className="col-6 px-1 text-right">
                            <button
                                onClick={closeModal}
                                className="btn btn-form btn-outline-primary btn-rounded px-4">
                                <span>Cancelar</span>
                            </button>
                        </div>
                        <div className="col-6 px-1 text-left">
                            <button 
                            className="btn btn-primary btn-rounded btn-form"
                            onClick={store}>
                                <span>Guardar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BankInfo;
