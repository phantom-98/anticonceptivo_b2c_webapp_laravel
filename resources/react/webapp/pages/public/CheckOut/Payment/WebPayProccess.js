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
    subscription, subscriptionId,
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
    customerId, prescriptionRadio, withoutPrescriptionAnswer,files
}) => {

    const {auth} = useContext(AuthContext);
    const {cartItems, clearCart} = useContext(CartContext);
    // const [totalCart, setTotalCart] = useState(0);
    const [showingWaitingPayment, setShowingWaitingPayment] = useState(false);

    const showWaitingPayment = () => {
        setShowingWaitingPayment(true);
    }

    const hideWaitingPayment = () => {
        setShowingWaitingPayment(false);
    }


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
            if(element.id === subscriptionId){
                selectedSubscription = element;
            }
            if (selectedSubscription === null && element.default_subscription) {
                selectedSubscription = element;
            }
        });
        showWaitingPayment();

        let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_TRANSACTION;
        let dataForm = {
            ...data,
            ...address,
            subscription: JSON.stringify(selectedSubscription),
            customer_id: auth ? auth.id : customerId,
            total: total,
            discountType: discountType,
            subtotal: subtotal,
            discount: discount,
            dispatch: dispatch,
            discountCode: discountCode,
            installment: installment,
            cartItems: JSON.stringify(cartItems),
            urlFinish : window.location.href + PUBLIC_ROUTES.CHECKOUT_VERIFY.path
        }

        const formData = new FormData();

        Object.entries(dataForm).forEach(data => {
            formData.append(data[0], data[1]);
        })
        formData.append('prescription_radio', prescriptionRadio);
        formData.append('without_prescription_answer', withoutPrescriptionAnswer);

        let fileList = [...files]

        for(let i=0; i < fileList.length; i++){
            formData.append('attachments[]', fileList[i]);
            formData.append('productIds[]', fileList[i].product_id);
        }

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
                        if (response.message == "Compra OneClick") {
                            window.location.href = response.data.url;
                        } else {
                            const urlWebpay = response.data.webpay_data.url + '?token_ws=' + response.data.webpay_data.token
                            window.location.href = urlWebpay;
                        }


                    },
                    error: () => {
                        hideWaitingPayment();
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'col-6 btn btn-bicolor btn-block',
                                title: 'mt-4'
                            },
                            buttonsStyling: false
                        })

                        if (response.data == 'PRODUCT_ITEM') {
                            swalWithBootstrapButtons.fire({
                                title: '<span style="color: #0869A6;">' + response.message + '</span>',
                                confirmButtonText: 'Entendido',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // limpiar carro y volver al checkout)
                                    if (clearCart()) {
                                        window.location.href = PUBLIC_ROUTES.CART.path;
                                    }
                                }
                            })
                        } else {
                            swalWithBootstrapButtons.fire({
                                // icon: 'error',
                                title: '<span style="color: #0869A6;">' + response.message + '</span>',
                            });
                        }

                        // setWebpayProccessSuccess(false);
                        // setFinishWebpayProccess(1);
                        // clearInterval(interval)
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
