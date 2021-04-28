import React, {useState, useEffect, useContext} from 'react';
import DivCheckBox from "../../../../components/DivCheckBox";
import * as Services from "../../../../Services";
import RutValidator from "w2-rut-validator";
import {setCleanInputError, setInputError} from "../../../../helpers/GlobalUtils";
import { AuthContext } from "../../../../context/AuthProvider";

const BillingInfo = ({company, setCompany, setShowingSection}) => {

    const {updateAuth} = useContext(AuthContext);

    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState(0);
    const [selectedCommune, setSelectedCommune] = useState(0);

    const [model, setModel] = useState({
        business_name: company.business_name,
        id_number: company.id_number,
        commercial_business: company.commercial_business,
        region_id: company.region_id,
        commune_id: company.commune_id,
        address: company.address,
        commercial_email: company.commercial_email,
        commercial_phone: company.commercial_phone,
    });

    useEffect(() => {
        if (company) {
        }
    }, [company]);

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


    const handleForm = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const RutFormat = e => {
        let clean = (e.target.value).replace(/[^0-9Kk]/g, '')
        clean = clean.toString().toUpperCase();

        if (clean.length < 14) {
            setModel({
                ...model,
                [e.target.name]: RutValidator.format(clean)
            })
        }
    }

    const RutValidate = e => {
        if ((e.target.value).length > 0) {
            if (!RutValidator.validate(e.target.value)) {
                setInputError(e.target.id, 'El formato del RUT no es correcto.')

                setModel({
                    ...model,
                    id_number: ''
                })
            }
        }
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

    const store = () => {
        let url = Services.ENDPOINT.PANEL.COMPANY.COMPLETE_PROFILE.BILLING_INFO;
        let data = {
            company_id: company.id,
            business_name: model.business_name,
            id_number: model.id_number,
            commercial_business: model.commercial_business,
            region_id: model.region_id,
            commune_id: model.commune_id,
            address: model.address,
            commercial_email: model.commercial_email,
            commercial_phone: model.commercial_phone,
        }
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setCompany(response.data.company)
                    updateAuth(response.data.auth)
                    setShowingSection('completed');
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const selectRegion = (e) => {
        const region = regions.find(r => r.id == e.target.value)
        setModel({
            ...model,
            region_id : region.id,
            commune_id: null
        })
        setSelectedRegion(e.target.value)
    }

    const controlNext = () => {
        if (
            model.business_name &&
            model.id_number &&
            model.commercial_business &&
            model.region_id &&
            model.commune_id &&
            model.address &&
            model.commercial_email &&
            model.commercial_phone
        ) {
            return <button type="button" onClick={store} className="btn btn-form btn-primary btn-rounded px-4">
                <span>Siguiente</span>
            </button>;
        }
        return <button type="button" className="btn btn-form btn-primary btn-rounded disabled px-4">
            <span>Siguiente</span>
        </button>
    }

    return (
        <form noValidate className="form needs-validation av-invalid" onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <div className="row">
                <div className="col-md-8 offset-md-2">

                    <div className="row">
                        <div className="col-12 py-3">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div>
                                        <div className="font-epilogue font-14 light color-121212 mb-2">
                                            Datos de Facturación
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="business_name"
                                            id="business_name"
                                            value={model.business_name}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.business_name &&
                                                model.business_name.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="business_name">Empresa o Razón social</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="id_number"
                                            id="id_number"
                                            value={model.id_number}
                                            onChange={handleForm}
                                            onKeyUp={RutFormat}
                                            onBlur={RutValidate}
                                            onFocus={setCleanInputError}
                                            className={`form-control form-control-w2 ${
                                                model.id_number &&
                                                model.id_number.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="id_number">RUT empresa</label>
                                        <div className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="commercial_business"
                                            id="commercial_business"
                                            value={model.commercial_business}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.commercial_business &&
                                                model.commercial_business.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="commercial_business">Giro</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <select
                                            name="region"
                                            id="region"
                                            value={selectedRegion}
                                            onChange={(e) => selectRegion(e)}
                                            className={`form-control form-control-w2 ${
                                                selectedRegion &&
                                                selectedRegion.length
                                                    ? "has-value"
                                                    : ""
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

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <select
                                            name="commune_id"
                                            id="commune_id"
                                            value={model.commune_id}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.commune_id &&
                                                model.commune_id.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        >
                                            <option value={null}></option>
                                            {
                                                communes.map(commune => 
                                                    (<option value={commune.id} key={commune.id}>
                                                        {commune.name}
                                                    </option>))
                                            }
                                        </select>
                                        <label htmlFor="commune">Comuna</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={model.address}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.address &&
                                                model.address.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="address">Dirección</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="commercial_email"
                                            id="commercial_email"
                                            value={model.commercial_email}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.commercial_email &&
                                                model.commercial_email.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="commercial_email">Email</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="commercial_phone"
                                            id="commercial_phone"
                                            value={model.commercial_phone}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.commercial_phone &&
                                                model.commercial_phone.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="commercial_phone">Teléfono</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-12 text-center">
                            {
                                controlNext()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default BillingInfo;
