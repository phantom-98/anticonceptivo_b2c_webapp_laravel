import React, {Fragment, useState, useEffect, useContext} from 'react';
// import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
// import FormComercialInfo from "../../private/Account/sections/PersonalInfo/FormComercialInfo";
// import {CONFIG} from "../../../Config";
import {setCleanInputError, setInputError} from "../../../helpers/GlobalUtils";
import * as Services from "../../../Services";
import {AuthContext} from "../../../context/AuthProvider";
import { GOOGLE_MAPS } from '../../../Globals';
import AutoComplete from "react-google-autocomplete";

const AddAddress = ({setView, regions, address, setAddress,validAddress,setValidAddress,setInputError}) => {

    // const [showBilling, setShowBilling] = useState(false);

    const {auth} = useContext(AuthContext);

    const [selectedRegion, setSelectedRegion] = useState(0);
    const [communes, setCommunes] = useState([]);

    const [googleAddress, setGoogleAddress] = useState('');

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
                ['address']: googleAddress,
            })
        }
    },[googleAddress]);

    const selectRegion = (e) => {
        const region = regions.find(r => r.id == e.target.value)
        setAddress({
            ...address,
            region_id : region.id,
            commune_id: null
        })
        setSelectedRegion(e.target.value)
    }
    const handleAddressComment = (e) => {
        if(e.target.value.match('^$|^[a-zA-Z\ñ ]+$')){
            setAddress({
                ...address,
                [e.target.name]: e.target.value
            })
        }
    }
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

    const autoCompleteHandle = (place) => {
        setGoogleAddress('');
        setValidAddress(false);
        setAddress({
            ...address,
            ['address']: place,
        })
    }

    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text"
                                       className="form-control form-control-custom"
                                       id="name"
                                       name="name"
                                       placeholder="Nombre Contacto"
                                       value={address.name}
                                       onChange={(e) => handleAddress(e, false, false, true)}
                                       onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="address">Calle y Número</label>
                                <AutoComplete
                                    className="form-control form-control-custom"
                                    placeholder="Calle y Número"
                                    id={'address'}
                                    value={address.address}
                                    apiKey={GOOGLE_MAPS.API_KEY}
                                    onPlaceSelected={(place, a, b, c) => {
                                        let flag = false;
                                        let street_number = '';
                                        let route = '';

                                        place.address_components.forEach(addComponents => {
                                            if (addComponents.long_name.includes('Región Metropolitana')) {
                                                flag = true;
                                            }

                                            if (addComponents.types.find(x => x == 'route')) {
                                                route = addComponents.long_name;
                                            }

                                            if (addComponents.types.find(x => x == 'street_number')) {
                                                street_number = addComponents.long_name;
                                            }
                                        });

                                        setGoogleAddress(route+' '+street_number)

                                        if (flag) {
                                            if (street_number.length > 0 && route.length > 0) {
                                                setValidAddress(true);
                                            }else{
                                                setValidAddress(false);
                                                setInputError('address','Formato de la dirección incorrecta, por favor ingrese el nombre de la calle y el número.');
                                            }
                                        }else{
                                            setValidAddress(false);
                                            setInputError('address','La dirección ingresada no esta en nuestro rango de cobertura, por favor intente con otra.');
                                        }
                                    }}
                                    onChange={(e) => autoCompleteHandle(e.target.value)}
                                    options={{
                                        types: ["address"],
                                        componentRestrictions: { country: "cl" },
                                    }}
                                    onChange={(e) => autoCompleteHandle(e.target.value)}
                                    options={{
                                        types: ["address"],
                                        componentRestrictions: { country: "cl" },
                                    }}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="col-md-4">
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
                                <label htmlFor="region_id">Región</label>
                                <select
                                    className="form-control form-control-custom pl-md-2"
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
                                    className="form-control form-control-custom pl-md-2"
                                    id="commune_id"
                                    name="commune_id"
                                    onChange={(e) => handleAddress(e)}
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
                                <input type="text"
                                       className="form-control form-control-custom"
                                       id="comment"
                                       name="comment"
                                       placeholder="Comentario"
                                       value={address.comment}
                                       onChange={(e) => handleAddressComment(e)}
                                       onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback" />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="row button-nav-checkout">
                <div className="col-md-6 pb-5">
                    <button onClick={() => setView('user-form')} className="link" style={{textDecoration: 'none'}}>
                        <span className="font-12">{"< Volver a paso anterior"}</span>
                    </button>
                </div>
                {/*<div className="col-md-6 pb-5">*/}
                {/*    <button className="btn btn-bicolor btn-block" onClick={auth ? () =>  updateData() : () => validateData()}>*/}
                {/*        <span className="font-14 px-5">CONTINUAR</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </Fragment>
    );
};

export default AddAddress
