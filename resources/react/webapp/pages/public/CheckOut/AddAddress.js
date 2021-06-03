import React, {Fragment, useState, useEffect, useContext} from 'react';
// import FormPersonalData from "../../private/Account/sections/PersonalInfo/FormPersonalData";
// import FormComercialInfo from "../../private/Account/sections/PersonalInfo/FormComercialInfo";
// import {CONFIG} from "../../../Config";

const AddAddress = ({setView}) => {

    const [showBilling, setShowBilling] = useState(false)
    const [address, setAddress] = useState({
        'id': 1,
        'contact_first_name': 'Eduardo',
        'contact_last_name': 'Gajardo',
        'region_id': 5,
        'commune_id': 5,
        'address': '10 norte 653',
        'address_number': 'depto 43'
    });

    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="contact_first_name">Nombre</label>
                                <input type="text"
                                       className="form-control form-control-custom"
                                       id="contact_first_name"
                                       name="contact_first_name"
                                       placeholder="Nombre Contacto"
                                       value={address.contact_first_name}
                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="contact_last_name">Apellido</label>
                                <input type="text"
                                       className="form-control form-control-custom"
                                       id="contact_last_name"
                                       name="contact_last_name"
                                       placeholder="Nombre Contacto"
                                       value={address.contact_last_name}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="region_id">Región</label>
                                <select
                                    className="form-control form-control-custom pl-2"
                                    id="region_id"
                                    name="region_id"
                                    value={address.region_id}>
                                    <option value="5">REGIÓN DE VALPARAÍSO</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="commune_id">Comuna</label>
                                <select
                                    className="form-control form-control-custom pl-2"
                                    id="commune_id"
                                    name="commune_id"
                                    value={address.commune_id}>
                                    <option value="5">Viña del Mar</option>
                                </select>
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
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="address_number">Número casa / depto</label>
                                <input type="text"
                                       className="form-control form-control-custom"
                                       id="address_number"
                                       name="address_number"
                                       placeholder="Número casa / depto"
                                       value={address.address_number}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button onClick={() => setView('user-form')} className="link" style={{textDecoration: 'none'}}>
                        <span className="font-12">{"< Volver a paso anterior"}</span>
                    </button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-bicolor btn-block" onClick={() => setView('addresses')}>
                        <span className="font-14 px-5">CONTINUAR</span>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default AddAddress
