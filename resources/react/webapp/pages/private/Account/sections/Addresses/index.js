import React, {useEffect, useState} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import List from "./List";
import Form from "./Form";

const Index = () => {

    const [addresses, setAddresses] = useState([]);
    const [view, setView] = useState('list');
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
        setView('list')
        setAddressSelected(null)
    }

    const showEdit = (address) => {
        setView('form')
        setFormMode('edit')
        setAddressSelected(address)
    }

    const showCreate = () => {
        setView('form')
        setFormMode('create')
        setAddressSelected(null)
    }

    return (
        <div className="row">
            <H3Panel title="EDITAR DIRECCIONES"/>
            <div className="col-md-12 ">
                <div className="panel-bordered px-4 pt-4 pb-5">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h3 className="font-poppins font-16 bold color-033F5D">
                                Confirma tu dirección de despacho o agrega una nueva
                            </h3>
                        </div>
                    </div>

                    {
                        view === 'list' ? <List addresses={addresses} showEdit={showEdit} showCreate={showCreate}/> : null
                    }

                    {
                        view === 'form' ? <Form formMode={formMode} addressSelected={addressSelected} goBack={goBack} setAddresses={setAddresses}/> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Index
