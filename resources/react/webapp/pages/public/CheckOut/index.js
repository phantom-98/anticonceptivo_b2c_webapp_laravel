import React, {Fragment, useContext, useEffect, useState} from 'react';
import Step from "../../../components/shopping/Step";
import GrantUser from "./GrantUser";
import Resume from "./Resume";
import UserForm from "./UserForm";
import AddAddress from "./AddAddress";
import Addresses from "./Addresses";
import Header from "./Header";
import Success from "./Payment/Success";
import Error from "./Payment/Error";
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";

const CheckOut = () => {

    const {auth} = useContext(AuthContext);

    const [showFinal, setShowFinal] = useState(1);
    const [view, setView] = useState('grant-user');
    const [step, setStep] = useState({
        number: 1,
        title: 'DATOS PERSONALES',
    })

    const defaultData = {
        first_name: '',
        last_name: '',
        email: '',
        id_number: '',
        id_type: 'RUT',
        phone_code: '+56',
        phone: '',

        business_name: '',
        business_id_number: '',
        commercial_business: '',
        commercial_email: '',
        commercial_address: '',
        commercial_additional_address:'',
        commercial_phone: '',
        commercial_phone_code: '',
        commercial_region_id: '',
        commercial_commune_id: '',
    }

    const [data, setData] = useState(defaultData);
    const [file, setFile] = useState(null);
    const [editable, setEditable] = useState(false);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    const [address, setAddress] = useState({
        name: '',
        region_id: '',
        commune_id: '',
        address: '',
        extra_info: ''
    });

    useEffect(() => {
        if (auth) {
            setData(auth);
            setEditable(true);
            getAddress();
            setView("user-form");
        }
    },[auth])

    useEffect(() => {
        switch (view) {
            case "grant-user":
            case "user-form":
                setStep({
                    number: 1,
                    title: 'DATOS PERSONALES',
                })
                setShowFinal(1)
                break;
            case "add-address":
                setStep({
                    number: 2,
                    title: 'DATOS DE ENVÍO',
                })
                setShowFinal(2)
                break;
            case "addresses":
                setStep({
                    number: 2,
                    title: 'DATOS DE ENVÍO',
                })
                setShowFinal(3)
                break;
        }

    }, [view])

    useEffect(() => {
        getRegions();
    },[])

    const getRegions = () => {
        let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.GET_RESOURCES;
        let dataForm = {
            // customer_id: auth.id
        }

        Services.DoPost(url, dataForm).then(response => {
            Services.Response({
            response: response,
            success: () => {
                setCommunes(response.data.communes);
                setRegions(response.data.regions);
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const getAddress = () => {
        let url = Services.ENDPOINT.AUTH.GET_ADDRESS;
        let data = {
            customer_id: auth.id
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                  setAddress(response.data.address);
              },
              error: () => {
                // toastr.error(response.message);
              },
              warning: () => {
                // toastr.warning(response.message);
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const Dummy = {
        id:1,
        customer:{
            id_number:1,
            full_name:'Felipe Fernández',
            email:'ffernandez@innovaweb.cl',
            full_phone:'920099718',
            delivery_address:'Una dirección ficticia',
        },
        order_items:[
            {
                name: 'item 1',
                quantity: 5
            }
        ],
        delivery_date:'2017',
        document_type:'BOLETA',
        payment_type:'WEBPAY',
        shipping_type:'ENCOMIENDA?',
    }

    return (
        <Fragment>
            <div className="pb-5" style={{background: '#FAFAFA'}}>
                <div className="container pt-4">
                    <Header showFinal={showFinal} />

                    <div className="row pb-5">
                        <div className="col-md pr-2">
                            <div className="panel panel-cart mb-3">
                                <div className="panel-body" style={{paddingTop: '11px', paddingBottom: '10px'}}>
                                    <Step title={step.title} number={step.number} disabled={false}/>
                                </div>
                            </div>

                            {
                                view == 'grant-user' ? <GrantUser setView={setView}/> : null
                            }
                            {
                                view == 'user-form' ? 
                                    <UserForm 
                                        setView={setView}
                                        data={data}
                                        setData={setData}
                                        setFile={setFile}
                                        editable={editable}
                                        regions={regions}
                                    /> : null
                            }
                            {
                                view == 'add-address' ? 
                                    <AddAddress
                                        setView={setView}
                                        regions={regions}
                                        address={address}
                                        setAddress={setAddress}
                                    /> : null
                            }
                            {
                                view == 'addresses' ? 
                                    <Addresses 
                                        setView={setView}
                                        regions={regions}
                                        communes={communes}
                                        address={address}
                                        setAddress={setAddress}
                                    /> : null
                            }


                        </div>
                        <div className="col-md-auto pl-2" style={{width: '408px'}}>
                            <Resume 
                                showFinal={showFinal}
                                data={data}
                                file={file}
                                address={address}
                            />
                        </div>
                    </div>
                
                </div>
            </div>
        </Fragment>
    );
};

export default CheckOut
