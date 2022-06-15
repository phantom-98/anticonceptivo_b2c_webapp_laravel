import React, {Fragment, useState, useEffect, useContext} from 'react';
// import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
// import FormComercialInfo from "../../private/Account/sections/PersonalInfo/FormComercialInfo";
// import {CONFIG} from "../../../Config";
import {setCleanInputError, setInputError} from "../../../helpers/GlobalUtils";
import * as Services from "../../../Services";
import {AuthContext} from "../../../context/AuthProvider";
import AutoComplete from "react-google-autocomplete";

const AddAddress = ({setView, regions, address, setAddress,validAddress,setValidAddress,setInputError}) => {

    // const [showBilling, setShowBilling] = useState(false);

    const {auth} = useContext(AuthContext);

    const [selectedRegion, setSelectedRegion] = useState(0);
    const [communes, setCommunes] = useState([]);

    const [googleAddress, setGoogleAddress] = useState('');

    useEffect(() => {
        if (regions.length > 0) {
            if(address && address.region_id != ''){
                setSelectedRegion(address.region_id)

            }else{
                setAddress({
                    ...address,
                    region_id : 7,
                    commune_id: null
                })
                setSelectedRegion(7)
            }
        }
    },[regions, address.region_id]);

    useEffect(() => {
        if (selectedRegion) {
            const region = regions.find(r => r.id == selectedRegion)
            let tempCommunes = [];
            region.provinces.map((province) =>{
                province.communes.map((commune) =>{
                    if (commune.is_valid) {
                        tempCommunes.push(commune);
                    }
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
                                <input type="text"
                                    className="form-control form-control-custom"
                                    id="address"
                                    name="address"
                                    placeholder="Calle y Número"
                                    value={address.address}
                                    onChange={(e) => handleAddress(e)}
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
                                <textarea
                                       className="form-control form-control-custom"
                                       id="comment"
                                       rows={3}
                                       name="comment"
                                       placeholder="Agrega un rango de horario para la entrega, es en oficina o una casa, u cualquier otra información relevante como el detalle de como llegar"
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="8.405" height="14.545" viewBox="0 0 8.405 14.545"><path id="Trazado_3290" data-name="Trazado 3290" d="M0,0,7.344,6.768.288,13.824" transform="translate(8.066 14.177) rotate(-180)" fill="none" stroke="#009be8" stroke-width="1"></path></svg> <span className="font-12 add-underline-responsive">{" Volver a paso anterior"}</span>
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
