import React, {Fragment, useEffect, useState, useContext} from 'react';
import List from "./Components/List";
import Form from "../../private/Account/sections/Addresses/Form";
import Icon from "../../../components/general/Icon";
import calendarBlue from '../../../assets/images/icons/calendar-blue.svg'
import clockBlue from '../../../assets/images/icons/clock-blue.svg'
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";

const Addresses = ({setView, regions, communes, address, setAddress, dispatchDateObject}) => {
    
    const {auth} = useContext(AuthContext);

    const [addresses, setAddresses] = useState([]);

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

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setAddresses(response.data.addresses);
                    if (response.data.addresses != null) {
                        response.data.addresses.forEach(elementAddress => {
                        
                            if (elementAddress.default_address) {
                                setAddress(elementAddress);
                            }
                        });
                    }
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
                        view === 'list' ?
                            <List
                                addresses={auth ? addresses : address}
                                showEdit={showEdit}
                                showCreate={showCreate}
                                regions={regions}
                                communes={communes}
                                getData={getData}
                                setAddress={setAddress}
                                setAddresses={setAddresses}
                            />
                            : null
                    }

                    {
                        view === 'form' ?
                            <Form
                                formMode={formMode}
                                addressSelected={addressSelected}
                                regions={regions}
                                customerId={auth ? auth.id : null}
                                goBack={goBack}
                                setAddresses={auth ? setAddresses : setAddress}
                            />
                            : null
                    }
                </div>
            </div>
            {
                dispatchDateObject?.label_calendar
                    ?   <div className="panel panel-cart mb-3">
                            <div className="panel-body">
            
                                <h3 className="font-poppins font-16 bold color-033F5D mb-3">
                                    Fecha estimada de entrega
                                </h3>
            
                                <div className="row">
                                    <div className="col-12 col-md pb-2">
                                        <div className="row no-gutters">
                                            <div className="col-auto" style={{width: '27px'}}>
                                                <Icon path={calendarBlue}/>
                                            </div>
                                            <div className="col-auto mx-2 d-flex">
                                                <span className="my-auto font-poppins font-12 regular color-8E8E8E">
                                                    {dispatchDateObject?.label_calendar}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md">
                                        <div className="row no-gutters">
                                            <div className="col-auto" style={{width: '27px'}}>
                                                <Icon path={clockBlue}/>
                                            </div>
                                            
                                            <div className="col-auto mx-2 d-flex">
                                                <span className="my-auto font-poppins font-12 regular color-8E8E8E">
                                                Hora de entrega
                                                </span>
                                            </div>
                                            <div className="col-auto mx-4 d-flex">
                                                <span className="my-auto font-poppins font-14 regular color-484848" style={{marginLeft: '10px'}}>
                                                    {dispatchDateObject ? (dispatchDateObject?.is_immediate ? dispatchDateObject?.sub_label : dispatchDateObject?.schedule.formated_start_time + ' a ' + dispatchDateObject?.schedule.formated_end_time) : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    :   <></>
            }
           


            <div className="row button-nav-checkout">
                <div className="col-md-6 pb-5">
                    {
                        auth ? 
                        <button onClick={() => setView('user-form')} className="link" style={{textDecoration: 'none'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8.405" height="14.545" viewBox="0 0 8.405 14.545"><path id="Trazado_3290" data-name="Trazado 3290" d="M0,0,7.344,6.768.288,13.824" transform="translate(8.066 14.177) rotate(-180)" fill="none" stroke="#009be8" stroke-width="1"></path></svg> <span className="font-12 add-underline-responsive">{" Volver a paso anterior"}</span>
                        </button>
                        :
                        <button onClick={() => setView('add-address')} className="link" style={{textDecoration: 'none'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="8.405" height="14.545" viewBox="0 0 8.405 14.545"><path id="Trazado_3290" data-name="Trazado 3290" d="M0,0,7.344,6.768.288,13.824" transform="translate(8.066 14.177) rotate(-180)" fill="none" stroke="#009be8" stroke-width="1"></path></svg> <span className="font-12 add-underline-responsive">{" Volver a paso anterior"}</span>
                        </button>
                    }

                    
                </div>
                {/*<div className="col-md-6 pb-5">*/}
                {/*    <button className="btn btn-bicolor btn-block" onClick={() => setViewAd('user-form')}>*/}
                {/*        <span className="font-14 px-5">CONTINUAR</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </Fragment>
    );
};

export default Addresses
