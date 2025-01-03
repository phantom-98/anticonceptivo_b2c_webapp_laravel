import React, { Fragment, useContext, useEffect, useState } from "react";
import Waiting from "./Waiting";
import { useParams } from "react-router-dom";
import * as Services from "../../../../Services";
import Error from "./Error";
import Success from "./Success";
import { CartContext } from "../../../../context/CartProvider";

const GetnetTransaction = () => {
    const { orderId } = useParams();
    const { clearCart } = useContext(CartContext);

    const [waiting, setWaiting] = useState(true);
    const [showFinish, setShowFinish] = useState("NONE");
    const [order, setOrder] = useState(null);
    const [estado, setEstado] = useState(false);
    useEffect(() => {
        const url = Services.ENDPOINT.PAYMENTS.VERIFY2;
        const data = {
            order_id: orderId,
        };
        Services.DoPost(url, data)
            .then((response) => {
                console.log(response);
                Services.Response({
                    response: response,
                    success: () => {
                        if (
                            response.data.order &&
                            response.data.order.status == "PAID"
                        ) {
                            setWaiting(false);
                            setShowFinish("SUCCESS");
                            setOrder(response.data.order);
                            clearCart();
                        } else {
                            setWaiting(false);
                            setShowFinish("ERROR");
                        }
                    },
                    error: () => {
                        setWaiting(false);
                        setShowFinish("ERROR");
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    }, [orderId]);
    window.dataLayer = window.dataLayer || [];
    useEffect(() => {
        function gtag2() {
            if (window.location.href.includes("checkout-verify")) {
                dataLayer.push(arguments);
            }
        }
        gtag2("js", new Date());

        gtag2("config", "AW-10785537269");
    }, []);
    /* const {tkn} = useParams();

    const {clearCart} = useContext(CartContext)

    const [waiting, setWaiting] = useState(true);
    const [showFinish, setShowFinish] = useState('NONE');
    const [order, setOrder] = useState(null)

    useEffect(() =>{
        verifyPayment(token);
    }, [token])

    window.dataLayer = window.dataLayer || [];
    useEffect(() => {
        function gtag2(){
            if(window.location.href.includes("checkout-verify")){
                dataLayer.push(arguments);
            }
        }
        gtag2('js', new Date());

        gtag2('config', 'AW-10785537269');
    },[]);


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
    } */

    return (
        <Fragment>
            <div className="pb-5" style={{ background: "#FAFAFA" }}>
                <div className="container pt-4">
                    {waiting ? <Waiting /> : null}

                    {showFinish === "ERROR" ? <Error /> : null}
                    {showFinish === "SUCCESS" ? (
                        <Success order={order} />
                    ) : null}
                </div>
            </div>
        </Fragment>
    );
};

export default GetnetTransaction;
