import React, {useEffect, useState} from 'react';

const Form = ({addressSelected, goBack, formMode, setAddresses}) => {

    const [address, setAddress] = useState({
        'id': '',
        'contact_first_name': '',
        'contact_last_name': '',
        'region_id': '',
        'commune_id': '',
        'address': '',
        'address_number': ''
    });

    useEffect(() => {
        if (formMode === 'edit') {
            setAddress(addressSelected)
        }
    }, [])

    return (
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
                        value={address.region_id} >
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
                        value={address.commune_id} >
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
    );
};

export default Form
