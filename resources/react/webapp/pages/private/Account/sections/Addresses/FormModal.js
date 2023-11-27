import React, {useEffect, useState, useContext, Fragment} from 'react';
import toastr from "toastr";
import {setCleanInputError, setInputError} from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import AutoComplete from "react-google-autocomplete";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";

const FormModal = ({addressSelected, goBack, formMode, customerId = null, regions, setAddresses}) => {

    const { breakpoint } = useContext(AppContext);

    const [address, setAddress] = useState({
        id: '',
        name: '',
        region_id: 7,
        commune_id: '',
        address: '',
        extra_info: '',
        isAutocomplete: true,
    });

    const [googleAddress, setGoogleAddress] = useState('')
    const [validAddress, setValidAddress] = useState(true)
    const [responsiveValidate, setResponsiveValidate] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState(0)
    const [communes, setCommunes] = useState([])

    useEffect(() => {
        if (formMode === 'edit') {
            setAddress({
                ...addressSelected
            })
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

    useEffect(() => {
        if (googleAddress.length > 0) {
            setAddress({
                ...address,
                ['address']: googleAddress
            })
        }
    },[googleAddress])

    const handleAddress = (e, direction = false, number = false, text = false) => {
        if (direction) {
            if(e.target.value.match('^$|^[a-zA-Z0-9\ñ ]+$')){
                setAddress({
                    ...address,
                    [e.target.name]: e.target.value
                })
            }
        }

        if (number) {
            if(e.target.value.match("^$|^[0-9]+$")){
                setAddress({
                    ...address,
                    [e.target.name]: e.target.value
                })
            }
        }

        if (text) {
            if(e.target.value.match('^$|^[a-zA-Z\ñ ]+$')){
                setAddress({
                    ...address,
                    [e.target.name]: e.target.value
                })
            }
        }

        if (!direction && !number && !text) {
            setAddress({
                ...address,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleAddressComment = (e) => {
        if(e.target.value.match('^$|^[a-zA-Z\ñ ]+$')){
            setAddress({
                ...address,
                [e.target.name]: e.target.value
            })
        }
    }
    const updateData = () => {

        if (validAddress === false) {

        }

        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.UPDATE;

        let data = {
            customer_id: customerId,
            address_id: address.id,
            name: address.name,
            region_id: address.region_id,
            commune_id: parseInt(address.commune_id),
            address: address.address,
            extra_info: address.extra_info,
            comment: address.comment
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
        if (validAddress === false) {

        }

        setAddresses(address);
        goBack();
    }

    const autoCompleteHandle = (place) => {
        setGoogleAddress('');
        setValidAddress(false);
        setResponsiveValidate(true);
        setAddress({
            ...address,
            ['address']: place,
        })
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="name">Nombre (*)</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="name"
                           name="name"
                           placeholder="Nombre Dirección"
                           value={address.name}
                           onChange={(e) => handleAddress(e, false, false, true)}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-8">
                <div className="form-group" style={
                    breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                    {} : {
                            height: '74px',
                        }
                }>
                    <label htmlFor="address">Calle y Número (*)</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="address"
                           name="address"
                           placeholder="Calle y Número"
                           value={address.address}
                           onChange={(e) => handleAddress(e)}
                           onFocus={setCleanInputError}
                    />
                    <div className={`invalid-feedback ${breakpoint !== BREAKPOINTS.MEDIUM || breakpoint !== BREAKPOINTS.LARGE || breakpoint !== BREAKPOINTS.EXTRA_LARGE || breakpoint !== BREAKPOINTS.EXTRA_EXTRA_LARGE ? 'mt-5' : ''}`}/>
                </div>
            </div>

            <div className={`col-md-4 ${(breakpoint !== BREAKPOINTS.MEDIUM || breakpoint !== BREAKPOINTS.LARGE || breakpoint !== BREAKPOINTS.EXTRA_LARGE || breakpoint !== BREAKPOINTS.EXTRA_EXTRA_LARGE) && !responsiveValidate ? 'mt-5' : ''}`}>
                <div className="form-group">
                    <label htmlFor="extra_info">Número casa o departamento</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="extra_info"
                           name="extra_info"
                           placeholder="Número casa o departamento"
                           value={address.extra_info}
                           onChange={(e) => handleAddress(e)}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="region_id">Región (*)</label>
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
                    <label htmlFor="commune_id">Comuna (*)</label>
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



            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="name">Comentario</label>
                    <textarea
                           className="form-control form-control-custom"
                           rows={3}
                           id="comment"
                           name="comment"
                           placeholder="Agrega un rango de horario para la entrega, es en oficina o una casa, u cualquier otra información relevante como el detalle de como llegar"
                           value={address.comment}
                           onChange={(e) => handleAddressComment(e)}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>

            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                    <Fragment>
                        <div className="col-md-6 mt-4 text-center text-md-left">
                            <button type="button" className="btn btn-bicolor px-5 btn-adress"
                                onClick={() => goBack()}>
                                <span>VOLVER</span>
                            </button>
                        </div>

                        <div className="col-md-6 mt-4 text-center text-md-right">
                            <button type="button" className="btn btn-bicolor px-3 btn-save-address"
                                onClick={customerId ? () => updateData() : () => setAddressNoAuth()}>
                                <span>GUARDAR DIRECCIÓN</span>
                            </button>
                        </div>
                     </Fragment>
                        :
                    <Fragment>
                        <div className="col-md-6 mt-4 text-center text-md-right">
                            <button type="button" className="btn btn-bicolor px-3 btn-save-address"
                                onClick={customerId ? () => updateData() : () => setAddressNoAuth()}>
                                <span>GUARDAR DIRECCIÓN</span>
                            </button>
                        </div>

                        <div className="col-md-6 mt-4 text-center text-md-left">
                            <button type="button" className="btn btn-bicolor px-5 btn-adress"
                                onClick={() => goBack()}>
                                <span>VOLVER</span>
                            </button>
                        </div>
                    </Fragment>
            }
        </div>
    );
};

export default FormModal
