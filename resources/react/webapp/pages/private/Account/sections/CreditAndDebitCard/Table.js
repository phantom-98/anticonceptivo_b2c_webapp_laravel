import React from 'react';
import Icon from "../../../../../components/general/Icon";
import * as Services from "../../../../../Services";
import toastr from "toastr";
import ListItemSubscriptions from "../Subscriptions/ListItem";
import plusIcon from "../../../../../assets/images/icons/plus-green.svg";
import Swal from "sweetalert2";
import LazyLoading from "../../../../../components/LazyLoading";

const Table = ({subscriptions, getSubscriptionsCards, customerId, customerEmail}) => {
    const saveDefaultSubscription = (subscriptionId, customerId) => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_DEFAULT_SUBSCRIPTION;
        let data = {
            subscription_id: subscriptionId,
            customer_id: customerId
        }

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "col-6 btn btn-bicolor btn-block",
                title: "mt-4"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title:
                    '<span style="color: #0869A6;">¿Está seguro de cambiar la tarjeta favorita?</span>',
                confirmButtonText: "Confirmar",
                reverseButtons: true
            })
            .then(result => {
                if (result.isConfirmed) {

                    Services.DoPost(url, data)
                        .then(response => {
                            Services.Response({
                                response: response,
                                success: () => {
                                    getSubscriptionsCards();
                                }
                            });
                        })
                        .catch(error => {
                            Services.ErrorCatch(error);
                        });
                }
            });
    };

    const deleteSubscription = (subscription_id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'col-6 btn btn-bicolor btn-block',
                title: 'mt-4'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '<span style="color: #0869A6;">¿Esta seguro de eliminar esta tarjeta?</span>',
            // icon: 'warning',
            // showCancelButton: true,
            confirmButtonText: 'Confirmar',
            // cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.DELETE;
                let data = {
                    subscription_id: subscription_id,
                }
                Services.DoPost(url, data).then(response => {
                    Services.Response({
                        response: response,
                        success: () => {
                            getSubscriptionsCards();
                        },
                        error: () => {
                            toastr.error(response.message);
                        }
                    });
                }).catch(error => {
                    Services.ErrorCatch(error)
                });
            }
        })

    }

    const showCreate = () => {
        let url = Services.ENDPOINT.PAYMENTS.WEBPAY.CREATE_SUBSCRIPTION;
        let dataForm = {
            customer_id: customerId,
            email: customerEmail,
            is_profile: true,
            is_session_credit: true,
        }

        Services.DoPost(url, dataForm)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        window.location.href = response.data.oneclick_data.url + '?TBK_TOKEN=' + response.data.oneclick_data.token;
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    return (
        <div className="row">
            <div className="col-12">
                <h3 className="modal-title text-center lh-34">
                    Tarjetas
                </h3>
                <p className="text-center lh-34">
                    Seleccione la tarjeta que desea que quede como favorita
                </p>
            </div>
            <div className="col-12 mt-3">
                {
                    subscriptions && subscriptions.length > 0 ?
                    subscriptions.map((subscription, index) => (

                        <ListItemSubscriptions
                            key={index}
                            subscription={subscription}
                            saveDefaultSubscription={saveDefaultSubscription}
                            deleteSubscription={deleteSubscription}
                            subscriptionChecked={null}
                            isModal={true}
                        />)) : subscriptions == null ?<LazyLoading height={100}/> : null
                }
            </div>
            <div className="col-md-12 text-center mb-3 mt-2">
                <Icon path={plusIcon} />  <span onClick={() => showCreate()} className="link pointer font-14 bold link-address-profile">Agregar nuevo método de pago</span>
            </div>
        </div>

    );
};

export default Table
