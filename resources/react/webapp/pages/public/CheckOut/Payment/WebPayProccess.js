import React, { useState, useContext, useEffect} from 'react';
import * as Services from "../../../../Services";
import { AuthContext } from "../../../../context/AuthProvider";
import { CartContext } from "../../../../context/CartProvider";

const WebPayProccess = ({
        data,
        file,
        address
        // finishPayment, 
        // runPayment 
    }) => {

    const {auth} = useContext(AuthContext);
    const {cartItems} = useContext(CartContext);
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
            customer_id: auth ? auth.id : null,
            ...address,
            totalCart: totalCart
        }
        Services.DoPost(url, dataForm)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        runVerify()
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
        // verifyPayment(orderId);

        // interval = setInterval(() => {
        //     verifyPayment(orderId);
        // }, 5000);

    }

    // const verifyPayment = (orderId) => {

    //     const data = {order_id: orderId}

    //     const url = Services.ENDPOINT.PANEL.PAYMENTS.VERIFY;

    //     Services.DoPost(url, data).then(response => {
    //         Services.Response({
    //             response: response,
    //             success: () => {

    //                 if (response.data.order && response.data.order.status == 'PAID') {
    //                     const status = {
    //                         title: 'Orden Pagada',
    //                         message: ' La orden nº ' + order.id + ' ha sido pagada mediante webpay.',
    //                         status: 'PAID',
    //                         order: response.data.order,
    //                     }
    //                     finishPayment(response.data.order, status)
    //                     clearInterval(interval)

    //                 } else if (response.data.order && response.data.order.status == 'REJECTED') {
    //                     const status = {
    //                         title: 'Order Rechazada',
    //                         message: ' La orden nº ' + order.id + ' ha sido rechazada por webpay.',
    //                         status: 'REJECTED',
    //                         order: response.data.order,
    //                     }
    //                     finishPayment(response.data.order, status)
    //                     clearInterval(interval)

    //                 } else if (response.data.order && response.data.order.status == 'CANCELED') {
    //                     const status = {
    //                         title: 'Order Anulada',
    //                         message: ' La orden nº ' + order.id + ' ha sido anulada por el usuario.',
    //                         status: 'CANCELED',
    //                         order: response.data.order,
    //                     }

    //                     finishPayment(response.data.order, status)
    //                     clearInterval(interval)

    //                 } else if (response.data.order && response.data.order.status == 'WAITING') {
    //                     const status = {
    //                         title: 'Order en Espera',
    //                         message: ' La orden nº ' + order.id + ' ha quedado en espera, será notificado del resultado de la transacción.',
    //                         status: 'WAITING',
    //                         order: response.data.order,
    //                     }

    //                     finishPayment(response.data.order, status)
    //                     clearInterval(interval)
    //                 }
    //             },
    //             error: () => {
    //                 console.log(response.message)
    //             }
    //         });
    //     }).catch(error => {
    //         Services.ErrorCatch(error)
    //     });
    // }

    return (
        <div className="col-md-12 pt-2">
            <button className="btn btn-bicolor btn-block" onClick={initPayment}>
                <span className="font-14 px-5">PAGAR</span>
            </button>
        </div>
    );
};

export default WebPayProccess;
