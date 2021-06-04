import React, {useEffect, useState} from 'react';
import toastr from "toastr";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";

const Form = ({addressSelected, goBack, formMode, customerId = null, regions, setAddresses}) => {

    const [address, setAddress] = useState({
        id: '',
        name: '',
        region_id: '',
        commune_id: '',
        address: '',
        extra_info: ''
    });

    const [selectedRegion, setSelectedRegion] = useState(0);
    const [communes, setCommunes] = useState([]);

    useEffect(() => {
        if (formMode === 'edit') {
            setAddress(addressSelected)
        }
    }, []);

    useEffect(() => {
        if (regions.length > 0) {
            setSelectedRegion(address.region_id)
        }
    },[regions, address.region_id]);

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

    const handleAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const updateData = () => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.UPDATE;

        let data = {
            customer_id: customerId,
            address_id: address.id,
            name: address.name,
            last_name: address.last_name,
            region_id: address.region_id,
            commune_id: parseInt(address.commune_id),
            address: address.address,
            extra_info: address.extra_info,
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    setAddresses(response.data.addresses)
                    toastr.success(response.message);
                    goBack();
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const selectRegion = (e) => {
        const region = regions.find(r => r.id == e.target.value)
        setAddress({
            ...address,
            region_id : region.id,
            commune_id: null
        })
        setSelectedRegion(e.target.value)
    }

    const setAddressNoAuth = () => {
        setAddresses(address);
        goBack();
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="name"
                           name="name"
                           placeholder="Nombre Dirección"
                           value={address.name}
                           onChange={handleAddress}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="region_id">Región</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="region_id"
                        name="region_id"
                        value={address.region_id}
                        onChange={(e) => selectRegion(e)}
                        onFocus={setCleanInputError}
                    >
                        <option value='' disabled selected>Seleccionar</option>
                        {
                            regions.map((region) => {
                                return(
                                    <option value={region.id} key={region.id}>{region.name}</option>
                                )
                            })
                        }
                    </select>
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="commune_id">Comuna</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="commune_id"
                        name="commune_id"
                        onChange={handleAddress}
                        onFocus={setCleanInputError}
                        value={address.commune_id}
                    >
                        <option value='' disabled selected>Seleccionar</option>
                        {
                            communes.map((commune) => {
                                return(
                                    <option value={commune.id} key={commune.id}>{commune.name}</option>
                                )
                            })
                        }
                    </select>
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-8">
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="address"
                           name="address"
                           placeholder="Dirección"
                           value={address.address}
                           onChange={handleAddress}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="extra_info">Número casa / depto</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="extra_info"
                           name="extra_info"
                           placeholder="Número casa / depto"
                           value={address.extra_info}
                           onChange={handleAddress}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-6 mt-4 text-left">
                <button type="button" className="btn btn-bicolor px-5"
                        onClick={() => goBack()}>
                    <span>VOLVER</span>
                </button>
            </div>
            <div className="col-md-6 mt-4 text-right">
                <button type="button" className="btn btn-bicolor px-5"
                        onClick={customerId ? () => updateData() : () => setAddressNoAuth()}>
                    <span>GUARDAR DIRECCIÓN</span>
                </button>
            </div>

        </div>
    );
};

export default Form