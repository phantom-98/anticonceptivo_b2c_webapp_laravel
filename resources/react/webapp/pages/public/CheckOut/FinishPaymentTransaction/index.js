import React, {Fragment, useContext, useEffect, useState} from 'react';
import Waiting from "./Waiting";
import {useParams} from "react-router-dom";
import * as Services from "../../../../Services";
import Error from "./Error";
import Success from "./Success";
import {CartContext} from "../../../../context/CartProvider";

const FinishPaymentTransaction = () => {

    const {token} = useParams();

    const {clearCart} = useContext(CartContext)

    const [waiting, setWaiting] = useState(true);
    const [showFinish, setShowFinish] = useState('NONE');
    const [order, setOrder] = useState(null)

    useEffect(() =>{
        verifyPayment(token);
    }, [token])


    const verifyPayment = (token, customerId) => {

        const data = {
            token: token,
        }

        const url = Services.ENDPOINT.PAYMENTS.VERIFY;

        Services.DoPost(url, data).then(response => {
            console.log(response);
            Services.Response({
                response: response,
                success: () => {
                    if (response.data.order && response.data.order.status == 'PAID') {
                        setWaiting(false)
                        setShowFinish('SUCCESS')
                        setOrder(response.data.order)
                        clearCart()
                    }else {
                        setWaiting(false)
                        setShowFinish('ERROR')
                    }
                },
                error: () => {
                    setWaiting(false)
                    setShowFinish('ERROR')
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <div className="pb-5" style={{background: '#FAFAFA'}}>
                <div className="container pt-4">

                    {waiting ? <Waiting/> : null}

                    {showFinish === 'ERROR' ? <Error/> : null}
                    {showFinish === 'SUCCESS' ? <Success order={order}/> : null}
                </div>
            </div>
        </Fragment>
    );
};

export default FinishPaymentTransaction
