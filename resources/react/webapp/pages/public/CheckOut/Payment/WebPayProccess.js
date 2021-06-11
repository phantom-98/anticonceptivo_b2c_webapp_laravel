import React, { useState, useContext, useEffect} from 'react';
import * as Services from "../../../../Services";
import { AuthContext } from "../../../../context/AuthProvider";
import { CartContext } from "../../../../context/CartProvider";

const WebPayProccess = ({
        data,
        file,
        address,
        // finishPayment, 
        // runPayment, 
        setFinishWebpayProccess,
        setWebpayProccessSuccess,
        setOrderId
    }) => {

    const {auth} = useContext(AuthContext);
    const {cartItems, clearCart} = useContext(CartContext);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(()=>{
        let _total = 0;
        cartItems.map((item) =>{
            _total = _total + (item.quantity * item.product.price)
        })
        setTotalCart(_total);
    },[cartItems])
    
    const [token, setToken] = useState('');

    const initPayment = () => {
        // runPayment('webpayPlus')
        create();
    }

    const create = () => {
        let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_TRANSACTION;
        let dataForm = {
            ...data,
            ...address,
            customer_id: auth ? auth.id : null,
            totalCart: totalCart,
            cartItems: cartItems

        }

        Services.DoPost(url, dataForm)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        runVerify(response.data.order.id)
                        setOrderId(response.data.order.id)
                        setToken(response.data.token)
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
    };

    let interval;

    const runVerify = (orderId) => {
        verifyPayment(orderId);

        interval = setInterval(() => {
            verifyPayment(orderId);
        }, 5000);
    }

    const verifyPayment = (orderId) => {

        const data = {order_id: orderId}

        const url = Services.ENDPOINT.PAYMENTS.VERIFY;

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    if (response.data.order && response.data.order.status == 'PAID') {
                        clearCart();
                        setWebpayProccessSuccess(true);
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
                    } else if (response.data.order && response.data.order.status == 'REJECTED') {
                        setWebpayProccessSuccess(false);
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
                    } else if (response.data.order && response.data.order.status == 'CANCELED') {
                        setWebpayProccessSuccess(false);
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
                    } else if (response.data.order && response.data.order.status == 'WAITING') {
                        setWebpayProccessSuccess(false);
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
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
        <div className="col-md-12 pt-2">
            <button className="btn btn-bicolor btn-block" onClick={initPayment}>
                <span className="font-14 px-5">PAGAR</span>
            </button>
        </div>
    );
};

export default WebPayProccess;
