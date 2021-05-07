import React, {Fragment, useEffect, useState} from 'react';
import List from "../../private/Account/sections/Addresses/List";
import Form from "../../private/Account/sections/Addresses/Form";

const Addresses = ({setView}) => {

    const [addresses, setAddresses] = useState([]);

    const [view, setViewAd] = useState('list');
    const [formMode, setFormMode] = useState('create');
    const [addressSelected, setAddressSelected] = useState(null);

    useEffect(() => {
        //emulations
        setAddresses([
            ...addresses,
            {
                'id': 1,
                'contact_first_name': 'Eduardo',
                'contact_last_name': 'Gajardo',
                'region_id': 5,
                'commune_id': 5,
                'address': '10 norte 653',
                'address_number': 'depto 43'
            }
        ])

    }, [])

    const goBack = () => {
        setViewAd('list')
        setAddressSelected(null)
    }

    const showEdit = (address) => {
        setViewAd('form')
        setFormMode('edit')
        setAddressSelected(address)
    }

    const showCreate = () => {
        setViewAd('form')
        setFormMode('create')
        setAddressSelected(null)
    }
    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body">

                    <h3 className="font-poppins font-16 bold color-033F5D">
                        Confirma tu dirección de despacho o agrega una nueva
                    </h3>

                    {
                        view === 'list' ? <List addresses={addresses} showEdit={showEdit} showCreate={showCreate}/> : null
                    }

                    {
                        view === 'form' ? <Form formMode={formMode} addressSelected={addressSelected} goBack={goBack} setAddresses={setAddresses}/> : null
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button onClick={() => setView('add-address')} className="link" style={{textDecoration: 'none'}}>
                        <span className="font-12">{"< Volver a paso anterior"}</span>
                    </button>
                </div>
                {/*<div className="col-md-6">*/}
                {/*    <button className="btn btn-bicolor btn-block" onClick={() => setViewAd('user-form')}>*/}
                {/*        <span className="font-14 px-5">CONTINUAR</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </Fragment>
    );
};

export default Addresses
