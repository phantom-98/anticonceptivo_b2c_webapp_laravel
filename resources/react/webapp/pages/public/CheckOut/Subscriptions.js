import React, { Fragment, useEffect, useState, useContext } from 'react';
import List from "../../private/Account/sections/Subscriptions/List";
import { AuthContext } from "../../../context/AuthProvider";
import { CartContext } from "../../../context/CartProvider";
import * as Services from "../../../Services";
import WaitingPaymentMethod from "./Payment/WaitingPaymentMethod";
import toastr from "toastr";

const Subscriptions = ({
    onView,
    subscription,
    setSubscription,
    subscriptionId,
    setSubscriptionId,
    files,
    withoutPrescriptionAnswer
 }) => {

    const { auth } = useContext(AuthContext);
    const { saveDataForStepTwo, dataForStepTwo } = useContext(CartContext);


    const [view, setViewAd] = useState('list');
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
            customer_id: auth ? auth.id : null
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setSubscription(response.data.subscriptions);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const showCreate = () => {
        let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_SUBSCRIPTION;

        let fileList = [...files];

        const formData = new FormData();

        for (let i = 0; i < fileList.length; i++) {
            formData.append('attachments[]', fileList[i]);
            formData.append('productIds[]', fileList[i].product_id);
            formData.append('nameIds[]', fileList[i].name_id);
        }

        formData.append('customer_id', auth ? auth.id : null);
        formData.append('email', auth ? auth.email : null);
        formData.append('from', 'checkout');

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        Services.DoPost(url, formData, config)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        saveDataForStepTwo({
                            ...dataForStepTwo,
                            view: onView,
                            withoutPrescriptionAnswer: withoutPrescriptionAnswer,
                        })
                        localStorage.setItem('tryingToSubscribeCard', true);
                        const urlOneClick = response.data.oneclick_data.url + '?TBK_TOKEN=' + response.data.oneclick_data.token
                        window.location.href = urlOneClick;
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
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

                    if (response.data.subscription != null) {
                        if (response.data.subscription.status == 'CREATED') {
                            hideWaitingPaymentMethod();
                            clearInterval(interval)
                            toastr.success(response.message);
                            getData();

                        } else if (response.data.subscription.status == 'REJECTED') {
                            hideWaitingPaymentMethod();
                            clearInterval(interval)
                            toastr.error('Tarjeta Rechazada');
                        } else if (response.data.subscription.status == 'CANCELED') {
                            hideWaitingPaymentMethod();
                            clearInterval(interval)
                            toastr.error('Cancelado');

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
                    <WaitingPaymentMethod showingWaitingPaymentMethod={showingWaitingPaymentMethod} />

                    {
                        view === 'list' ?
                            <List
                                subscriptions={auth ? subscription : subscription}
                                showCreate={showCreate}
                                getData={getData}
                                setSubscription={setSubscription}
                                subscriptionId={subscriptionId}
                                setSubscriptionId={setSubscriptionId}
                            />
                            : null
                    }


                </div>
            </div>

        </Fragment>
    );
};

export default Subscriptions
