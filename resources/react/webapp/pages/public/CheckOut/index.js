import React, {Fragment, useContext, useEffect, useState} from 'react';
import Step from "../../../components/shopping/Step";
import GrantUser from "./GrantUser";
import Resume from "./Resume";
import UserForm from "./UserForm";
import AddAddress from "./AddAddress";
import Addresses from "./Addresses";
import Header from "./Header";
import {AuthContext} from "../../../context/AuthProvider";
// import * as Services from "../../../Services";

const CheckOut = () => {

    const {auth} = useContext(AuthContext)

    const [showFinal, setShowFinal] = useState(1)
    const [view, setView] = useState('grant-user')
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

    useEffect(() => {
        if (auth) {
            setData(auth);
            setEditable(true);
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

    // const getData = () => {
    //     let url = Services.ENDPOINT.CUSTOMER.PROFILE.GET;
    //     let dataForm = {
    //         customer_id: auth.id
    //     }

    //     Services.DoPost(url, dataForm).then(response => {
    //         Services.Response({
    //         response: response,
    //         success: () => {
    //             setData(response.data.customer);
    //         },
    //         });
    //     }).catch(error => {
    //         Services.ErrorCatch(error)
    //     });
    // }

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
                                    /> : null
                            }
                            {
                                view == 'add-address' ? <AddAddress setView={setView}/> : null
                            }
                            {
                                view == 'addresses' ? <Addresses setView={setView}/> : null
                            }


                        </div>
                        <div className="col-md-auto pl-2" style={{width: '408px'}}>
                            <Resume showFinal={showFinal}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CheckOut
