import React, {Fragment, useEffect, useState, useContext} from 'react';
import List from "../../private/Account/sections/Subscriptions/List";
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";
import WaitingPaymentMethod from "./Payment/WaitingPaymentMethod";
import toastr from "toastr";


const Subscriptions = ({setView, subscription, setSubscription}) => {

    const {auth} = useContext(AuthContext);

    const [subscriptions, setSubscriptions] = useState([]);

    const [view, setViewAd] = useState('list');
    const [subscriptionSelected, setSubscriptionSelected] = useState(null);
    const [showingWaitingPaymentMethod, setShowingWaitingPaymentMethod] = useState(false);


    const showWaitingPaymentMethod = () => {
        setShowingWaitingPaymentMethod(true);
    }

    const hideWaitingPaymentMethod = () => {
        setShowingWaitingPaymentMethod(false);
    }
    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth])

    const getData = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    setSubscriptions(response.data.subscriptions);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const showCreate = () => {
            let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_SUBSCRIPTION;
            let dataForm = {
                customer_id: auth ? auth.id : null,
                email: auth ? auth.email : null,
            }
    
            Services.DoPost(url, dataForm)
                .then(response => {
                    Services.Response({
                        response: response,
                        success: () => {
                            console.log(response);
                            runVerifyPaymentMethod(response.data.id)
                            showWaitingPaymentMethod();
                            var win = window.open();
                            win.document.open();
                            win.document.write(response.data.webpay);
                            win.document.close();
                        },
                    });
                })
                .catch(error => {
                    Services.ErrorCatch(error);
                });

        setSubscriptionSelected(null)
    }

    let interval;

    const runVerifyPaymentMethod = (id) => {
        verifyPaymentMethod(id);

        interval = setInterval(() => {
            verifyPaymentMethod(id);
        }, 5000);
    }

    const verifyPaymentMethod = (id) => {

        const data = {
            id: id,
        }

        const url = Services.ENDPOINT.PAYMENTS.VERIFY_SUBSCRIPTION;

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {

                    if(response.data.subscription != null){
                        if (response.data.subscription.status == 'CREATED') {
                            hideWaitingPaymentMethod();
                            clearInterval(interval)
                            toastr.success(response.message);
                            getData();
    
                        } else if(response.data.subscription.status == 'REJECTED') {
                            console.log(response.data.subscription);
                            hideWaitingPaymentMethod();
                            clearInterval(interval)
                            toastr.error('Tarjeta Rechazada');
                        }
                    }

                },
                error: () => {
                    console.log(response.message)
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body">

                    <h3 className="font-poppins font-16 bold color-033F5D">
                        Confirma tu método de pago o agrega uno nuevo
                    </h3>
                <WaitingPaymentMethod  showingWaitingPaymentMethod={showingWaitingPaymentMethod}/>

                    {
                        view === 'list' ? 
                            <List 
                                subscriptions={auth ? subscriptions : subscription} 
                                showCreate={showCreate}
                                getData={getData}
                                setSubscription={setSubscription}
                            /> 
                        : null
                    }


                </div>
            </div>

        </Fragment>
    );
};

export default Subscriptions
