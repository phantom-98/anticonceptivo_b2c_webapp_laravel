import React, { useState, useContext, Fragment } from "react";
import * as Services from "../../../../Services";
import { AuthContext } from "../../../../context/AuthProvider";
import { CartContext } from "../../../../context/CartProvider";
import WaitingPayment from "./WaitingPayment";
import Swal from "sweetalert2";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logoWebpay from "../../../../assets/images/webpayColor.svg";
import logoWebCheckout from "../../../../assets/images/webCheckoutLogo.svg";




const WebPayProccess = ({
    data,
    address,
    subscription,
    subscriptionId,
    total,
    subtotal,
    dispatch,
    discount,
    discountType,
    discountCode,
    installment,
    customerId,
    prescriptionRadio,
    withoutPrescriptionAnswer,
    files,
}) => {
    const { auth } = useContext(AuthContext);
    const { cartItems, clearCart } = useContext(CartContext);
    const [showingWaitingPayment, setShowingWaitingPayment] = useState(false);

    const showWaitingPayment = () => {
        setShowingWaitingPayment(true);
    };

    const hideWaitingPayment = () => {
        setShowingWaitingPayment(false);
    };

    const initPayment = () => {
        showWaitingPayment();
        create();
    };
    const initPayment2 = () => {
        showWaitingPayment();
        create2();
    };

    const create2 = () => {
        let selectedSubscription = null;
        subscription.map((element) => {
            if (element.id === subscriptionId) {
                selectedSubscription = element;
            }
            if (selectedSubscription === null && element.default_subscription) {
                selectedSubscription = element;
            }
        });
        showWaitingPayment();

        let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_TRANSACTION2;
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
            urlFinish:
                window.location.href + PUBLIC_ROUTES.CHECKOUT_VERIFY.path,
        };

        const formData = new FormData();

        Object.entries(dataForm).forEach((data) => {
            formData.append(data[0], data[1]);
        });
        formData.append("prescription_radio", prescriptionRadio);
        formData.append(
            "without_prescription_answer",
            withoutPrescriptionAnswer
        );

        let fileList = [...files];

        for (let i = 0; i < fileList.length; i++) {
            formData.append("attachments[]", fileList[i]);
            formData.append("productIds[]", fileList[i].product_id);
        }

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        Services.DoPost(url, formData, config)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        if (response.message == "Compra OneClick") {
                            window.location.href = response.data.url;
                        } else {
                            const urlWebpay = response.data.getnet;
                            window.location.href = urlWebpay;
                        }
                    },
                    error: () => {
                        hideWaitingPayment();
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton:
                                    "col-6 btn btn-bicolor btn-block",
                                title: "mt-4",
                            },
                            buttonsStyling: false,
                        });

                        if (response.data == "PRODUCT_ITEM") {
                            swalWithBootstrapButtons
                                .fire({
                                    title:
                                        '<span style="color: #0869A6;">' +
                                        response.message +
                                        "</span>",
                                    confirmButtonText: "Entendido",
                                })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        // limpiar carro y volver al checkout)
                                        if (clearCart()) {
                                            window.location.href =
                                                PUBLIC_ROUTES.CART.path;
                                        }
                                    }
                                });
                        } else {
                            swalWithBootstrapButtons.fire({
                                // icon: 'error',
                                title:
                                    '<span style="color: #0869A6;">' +
                                    response.message +
                                    "</span>",
                            });
                        }
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    const create = () => {
        let selectedSubscription = null;
        subscription.map((element) => {
            if (element.id === subscriptionId) {
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
            urlFinish:
                window.location.href + PUBLIC_ROUTES.CHECKOUT_VERIFY.path,
        };

        const formData = new FormData();

        Object.entries(dataForm).forEach((data) => {
            formData.append(data[0], data[1]);
        });
        formData.append("prescription_radio", prescriptionRadio);
        formData.append(
            "without_prescription_answer",
            withoutPrescriptionAnswer
        );

        let fileList = [...files];

        for (let i = 0; i < fileList.length; i++) {
            formData.append("attachments[]", fileList[i]);
            formData.append("productIds[]", fileList[i].product_id);
        }

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        Services.DoPost(url, formData, config)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        if (response.message == "Compra OneClick") {
                            window.location.href = response.data.url;
                        } else {
                            const urlWebpay =
                                response.data.webpay_data.url +
                                "?token_ws=" +
                                response.data.webpay_data.token;
                            window.location.href = urlWebpay;
                        }
                    },
                    error: () => {
                        hideWaitingPayment();
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton:
                                    "col-6 btn btn-bicolor btn-block",
                                title: "mt-4",
                            },
                            buttonsStyling: false,
                        });

                        if (response.data == "PRODUCT_ITEM") {
                            swalWithBootstrapButtons
                                .fire({
                                    title:
                                        '<span style="color: #0869A6;">' +
                                        response.message +
                                        "</span>",
                                    confirmButtonText: "Entendido",
                                })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        // limpiar carro y volver al checkout)
                                        if (clearCart()) {
                                            window.location.href =
                                                PUBLIC_ROUTES.CART.path;
                                        }
                                    }
                                });
                        } else {
                            swalWithBootstrapButtons.fire({
                                // icon: 'error',
                                title:
                                    '<span style="color: #0869A6;">' +
                                    response.message +
                                    "</span>",
                            });
                        }
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    const updateDiscountCode = (discountCode) => {
        let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.UPDATE_DISCOUNTS;

        const data = {
            discount_code: discountCode,
        };

        Services.DoPost(url, data)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {},
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <Fragment>
            <WaitingPayment showingWaitingPayment={showingWaitingPayment} />
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6 ">
                        <h4 className="font-poppins font-14 bold color-033F5D">
                            PAGAR                        
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" style={{border: "1px solid grey", borderRadius: "10px", padding: "10px", marginBottom: "32px"}}>
                        <p>Recomendamos:</p>
                        <button 
                            style={{padding:'0 70px'}}
                            className={`btn btn-bicolor btn-block`}
                            disabled={showingWaitingPayment ? true : false}
                            onClick={
                                !showingWaitingPayment ? () => initPayment2() : null
                            }
                        >
                            <LazyLoadImage
                                alt={'GETNET'}
                                title="Anticonceptivo"
                                rel="nofollow"
                                effect="blur"
                                width={"80%"}
                                style={{maxWidth:"100px"}}
                                src={logoWebCheckout}
                            />
                        </button>
                        
                    </div>
                    <div className="col-md-12">
                        <button
                            style={{padding:'0 100px', marginTop: "50px", background: "white",border: "1px solid gray"}}

                            className={`btn btn-bicolor btn-block`}
                            disabled={showingWaitingPayment ? true : false}
                            onClick={
                                !showingWaitingPayment ? () => initPayment() : null
                            }
                        >
                            <LazyLoadImage
                                alt={'WEBPAY'}
                                title="Anticonceptivo"
                                rel="nofollow"
                                effect="blur"
                                width={"80%"}
                                style={{maxWidth:"100px"}}
                                src={logoWebpay}
                            />
                        </button>
                        
                    </div>
                   
                </div>
            </div>
        </Fragment>
    );
};

export default WebPayProccess;
