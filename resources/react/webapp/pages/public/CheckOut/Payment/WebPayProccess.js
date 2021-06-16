import React, { useState, useContext, Fragment} from 'react';
import * as Services from "../../../../Services";
import { AuthContext } from "../../../../context/AuthProvider";
import { CartContext } from "../../../../context/CartProvider";
import WaitingPayment from "./WaitingPayment";

const WebPayProccess = ({
        data,
        file,
        address,
        setFinishWebpayProccess,
        setWebpayProccessSuccess,
        setOrderId,
        total,
        subtotal,
        discount,
        discountCode
    }) => {

    const {auth} = useContext(AuthContext);
    const {cartItems, clearCart} = useContext(CartContext);
    // const [totalCart, setTotalCart] = useState(0);
    const [showingWaitingPayment, setShowingWaitingPayment] = useState(false);

    const showWaitingPayment = () => {
        setShowingWaitingPayment(true);
    }

    const hideWaitingPayment = () => {
        setShowingWaitingPayment(true);
    }

    // useEffect(() => {
    //     let _total = 0;
    //     cartItems.map((item) =>{
    //         _total = _total + (item.quantity * item.product.price)
    //     })
    //     setTotalCart(_total);
    // },[cartItems])
    
    const [token, setToken] = useState('');

    const initPayment = () => {
        // runPayment('webpayPlus')
        create();
    }

    const create = () => {
        // if (!address) {
        //     toastr.warning('Debes agregar una dirección para proceder al pago.')
        // }

        let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_TRANSACTION;
        let dataForm = {
            ...data,
            ...address,
            customer_id: auth ? auth.id : null,
            total: total,
            subtotal: subtotal,
            discount: discount,
            cartItems: cartItems
        }

        Services.DoPost(url, dataForm)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        runVerify(response.data.order.id, response.data.order.customer_id)
                        setOrderId(response.data.order.id)
                        setToken(response.data.token)
                        showWaitingPayment();
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

    const submitPrescription = (orderId, customerId) => {
        let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.SUBMIT_PRESCRIPTION;

        const formData = new FormData();

        formData.append('file', file)
        formData.append('order_id', orderId)
        formData.append('customer_id', customerId)

        Services.DoPost(url, formData).then(response => {
            Services.Response({
                response: response,
                success: () => {}
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const updateDiscountCode = (discountCode) => {
        let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.UPDATE_DISCOUNTS;

        const data = {
            discount_code: discountCode
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {}
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    let interval;

    const runVerify = (orderId, customerId) => {
        verifyPayment(orderId);

        interval = setInterval(() => {
            verifyPayment(orderId, customerId);
        }, 5000);
    }

    const verifyPayment = (orderId, customerId) => {

        const data = {
            order_id: orderId,
        }

        const url = Services.ENDPOINT.PAYMENTS.VERIFY;

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    if (response.data.order && response.data.order.status == 'PAID') {
                        clearCart();
                        submitPrescription(orderId, customerId);
                        updateDiscountCode(discountCode)
                        hideWaitingPayment();
                        setWebpayProccessSuccess(true);
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
                    } else if (response.data.order && response.data.order.status == 'REJECTED') {
                        setWebpayProccessSuccess(false);
                        hideWaitingPayment();
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
                    } else if (response.data.order && response.data.order.status == 'CANCELED') {
                        setWebpayProccessSuccess(false);
                        hideWaitingPayment();
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
                    } else if (response.data.order && response.data.order.status == 'WAITING') {
                        setWebpayProccessSuccess(false);
                        hideWaitingPayment();
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
        <Fragment>
            <WaitingPayment  showingWaitingPayment={showingWaitingPayment}/>
            <div className="col-md-12 pt-2">
                <button className="btn btn-bicolor btn-block" onClick={initPayment}>
                    <span className="font-14 px-5">PAGAR</span>
                </button>
            </div>
        </Fragment>
    );
};

export default WebPayProccess;
