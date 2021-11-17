import React, {useEffect, useState, useContext} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import List from "./List";
import Form from "./Form";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import UseWindowDimensions from "../../../../../helpers/UseWindowDimensions";

const Index = () => {
    const {auth} = useContext(AuthContext)

    const [addresses, setAddresses] = useState([]);

    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    const [addressSelected, setAddressSelected] = useState(null);

    const [view, setView] = useState('list');
    const [formMode, setFormMode] = useState('create');

    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth])

    const getData = () => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    setAddresses(response.data.addresses);
                    setRegions(response.data.regions);
                    setCommunes(response.data.communes);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

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
    const { height, width } = UseWindowDimensions();

    return (
        <div className="row" style={{marginTop: width<=980 ? '0px' :'-50px'}}>
            {
                width < 768 ? null : <H3Panel title="EDITAR DIRECCIONES" />
            }
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
                        view === 'list' ?
                            <List
                                addresses={addresses}
                                getData={getData}
                                showEdit={showEdit}
                                showCreate={showCreate}
                                regions={regions}
                                communes={communes}
                                // setAddresses={setAddresses}
                            /> : null
                    }

                    {
                        view === 'form' ?
                            <Form
                                formMode={formMode}
                                addressSelected={addressSelected}
                                goBack={goBack}
                                getData={getData}
                                customerId={auth.id}
                                regions={regions}
                                setAddresses={setAddresses}
                            />
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Index
