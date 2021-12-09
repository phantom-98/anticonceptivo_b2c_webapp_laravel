import React, {useState, useContext, Fragment} from 'react';
import * as Services from "../../../../Services";
import {AuthContext} from "../../../../context/AuthProvider";
import {CartContext} from "../../../../context/CartProvider";
import WaitingPayment from "./WaitingPayment";
import Swal from 'sweetalert2'
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";

const WebPayProccess = ({
    data,
    address,
    subscription,
    setFinishWebpayProccess,
    setWebpayProccessSuccess,
    setOrderId,
    total,
    subtotal,
    dispatch,
    discount,
    discountType,
    discountCode,
    installment,
    customerId
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

    // useEffect(()=>{
    //     let _total = 0;
    //     cartItems.map((item) =>{
    //         if(item.subscription != null){
    //             _total = _total + (item.quantity * item.subscription.price)

    //         }else{
    //             _total = _total + (item.quantity * item.product.price)

    //         }
    //     })
    //     setTotalCart(_total);
    // },[cartItems])

    const [token, setToken] = useState('');

    const initPayment = () => {
        // runPayment('webpayPlus')
        showWaitingPayment();
        create();
    }

    const create = () => {
        // if (!address) {
        //     toastr.warning('Debes agregar una dirección para proceder al pago.')
        // }


        let selectedSubscription = null;
        subscription.map(element => {
            if (element.default_subscription) {
                selectedSubscription = element;
                showWaitingPayment();
            }
        });

        let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_TRANSACTION;
        let dataForm = {
            ...data,
            ...address,
            subscription: selectedSubscription,
            customer_id: auth ? auth.id : customerId,
            total: total,
            discountType: discountType,
            subtotal: subtotal,
            discount: discount,
            dispatch: dispatch,
            installment: installment,
            cartItems: cartItems,
            urlFinish : window.location.href + PUBLIC_ROUTES.CHECKOUT_VERIFY.path
        }

        Services.DoPost(url, dataForm)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        if (response.message == "Compra OneClick") {
                            clearCart();
                            // submitPrescription(response.data.order.id, response.data.order.customer_id);
                            updateDiscountCode(discountCode)
                            setOrderId(response.data.order.id)
                            hideWaitingPayment();
                            setWebpayProccessSuccess(true);
                            setFinishWebpayProccess(1);
                            clearInterval(interval)
                        } else {
                            // let win = window.open(window.location.href + '?attempt-payment-webpay=true', '_blank');

                            runVerify(response.data.order.id, response.data.order.customer_id)
                            setOrderId(response.data.order.id)
                            setToken(response.data.token)

                            // importante cambiar en oneclick
                            const urlWebpay = response.data.webpay_data.url + '?token_ws=' + response.data.webpay_data.token
                            window.location.href = urlWebpay;

                            // var win = window.open();
                            // win.document.open();
                            // win.document.write(response.data.webpay);
                            // win.document.close();
                            // win.document.focus();
                        }


                    },
                    error: () => {
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'col-6 btn btn-bicolor btn-block',
                                title: 'mt-4'
                            },
                            buttonsStyling: false
                        })

                        swalWithBootstrapButtons.fire({
                            // icon: 'error',
                            title: '<span style="color: #0869A6;">' + response.message + '</span>',
                        });
                        setWebpayProccessSuccess(false);
                        hideWaitingPayment();
                        setFinishWebpayProccess(1);
                        clearInterval(interval)
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const updateDiscountCode = (discountCode) => {
        let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.UPDATE_DISCOUNTS;

        const data = {
            discount_code: discountCode
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                }
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
            <WaitingPayment showingWaitingPayment={showingWaitingPayment}/>
            <div className="col-md-12 pt-2">
                <button className={`btn btn-bicolor btn-block`} disabled={showingWaitingPayment ? true : false} onClick={!showingWaitingPayment ? () => initPayment() : null}>
                    <span className="font-14 px-5">PAGAR</span>
                </button>
            </div>
        </Fragment>
    );
};

export default WebPayProccess;
