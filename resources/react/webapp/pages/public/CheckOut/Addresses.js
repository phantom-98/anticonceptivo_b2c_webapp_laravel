import React, {Fragment, useEffect, useState, useContext} from 'react';
import List from "../../private/Account/sections/Addresses/List";
import Form from "../../private/Account/sections/Addresses/Form";
import Icon from "../../../components/general/Icon";
import calendarBlue from '../../../assets/images/icons/calendar-blue.svg'
import clockBlue from '../../../assets/images/icons/clock-blue.svg'
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";

const Addresses = ({setView}) => {

    const {auth} = useContext(AuthContext);

    const [addresses, setAddresses] = useState([]);
    const [regions, setRegions] = useState([]);

    const [view, setViewAd] = useState('list');
    const [formMode, setFormMode] = useState('create');
    const [addressSelected, setAddressSelected] = useState(null);

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
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

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

            <div className="panel panel-cart mb-3">
                <div className="panel-body">

                    <h3 className="font-poppins font-16 bold color-033F5D">
                        Fecha estimada de entrega
                    </h3>

                    <div className="row">
                        <div className="col">
                            <Icon path={calendarBlue} />
                            {' '} <span className="font-poppins font-12 regular color-8E8E8E">Fecha de entrega</span>
                            {'    '}<span className="font-poppins font-16 regular color-484848">04 de septiembre</span>
                        </div>
                        <div className="col-auto">
                            <Icon path={clockBlue} />
                            {' '} <span className="font-poppins font-12 regular color-8E8E8E">Fecha de entrega</span>
                            {'    '}<span className="font-poppins font-16 regular color-484848">09:00 a 21:00</span>
                        </div>
                    </div>

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
