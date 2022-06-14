import React, {useState, useContext} from 'react';
import { Modal } from "react-bootstrap";
import ListItemSubscriptions from "../Subscriptions/ListItem";
import CloseModal from "../../../../../components/general/CloseModal";
import * as Services from "../../../../../Services";
import Swal from "sweetalert2";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";
import toastr from "toastr";

const ModalSubscription = ({
    subscriptionOrderItemSelected,
    setSubscriptionOrderItemSelected,
    modals,
    subscriptions,
    changeVisibleModalSubscriptionCard,
    getSubscriptionsCards,
    customerId,
    customerEmail,
    getDataAddress,
    getSubscriptions
}) => {
    const { breakpoint } = useContext(AppContext)

    const saveDefaultSubscription = (subscriptionId, customerId) => {
        let url =
            Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_CARD_SUBSCRIPTION;

        let data = {
            subscription_id: subscriptionId,
            customer_id: customerId,
            subscription_order_item_id: subscriptionOrderItemSelected.id
        };

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
                    '<span style="color: #0869A6;">¿Está seguro de cambiar la tarjeta?</span>',
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
                                    setSubscriptionOrderItemSelected(
                                        response.data
                                    );
                                    getSubscriptions();
                                    getDataAddress();
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
            from: 'account'
        }

        Services.DoPost(url, dataForm)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        const urlOneClick = response.data.oneclick_data.url + '?TBK_TOKEN=' + response.data.oneclick_data.token
                        window.location.href = urlOneClick;
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    return (
        <>
            <Modal
                show={modals.subscription}
                centered
                size="lg"
                backdrop="static"
                keyboard={false}
                onHide={modals.subscription}
            >
                <Modal.Header>
                    <CloseModal hideModal={changeVisibleModalSubscriptionCard} />
                </Modal.Header>
                <Modal.Body className={`${breakpoint === BREAKPOINTS.EXTRA_EXTRA_SMALL ? 'px-3' : 'px-5'}`}>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="modal-title text-center lh-34">
                                Tarjetas
                            </h3>
                        </div>
                        <div className="col-12 mt-3">
                            {
                                subscriptions.map((subscription, index) => (

                                    <ListItemSubscriptions
                                        key={index}
                                        subscription={subscription}
                                        saveDefaultSubscription={saveDefaultSubscription}
                                        deleteSubscription={deleteSubscription}
                                        subscriptionChecked={
                                            subscriptionOrderItemSelected == null
                                                ? 0
                                                : (subscriptionOrderItemSelected.subscription_id ==
                                                    subscription.id
                                                    ? 1
                                                    : 0)
                                        }
                                        isModal={true}
                                    />))
                            }
                        </div>
                        <div className="col-md-12 text-center mb-3 mt-2">
                            <Icon path={plusIcon} />  <span onClick={() => showCreate()} className="link pointer font-14 bold link-address-profile">Agregar nuevo método de pago</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalSubscription;
