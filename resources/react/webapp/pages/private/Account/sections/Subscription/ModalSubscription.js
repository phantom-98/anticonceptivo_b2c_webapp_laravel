import React from 'react';
import { Modal } from "react-bootstrap";
import ListItemSubscriptions from "../Subscriptions/ListItem";
import CloseModal from "../../../../../components/general/CloseModal";
import * as Services from "../../../../../Services";
import Swal from "sweetalert2";

const ModalSubscription = ({ 
    modals, 
    subscriptionOrderItemSelected,
    subscriptions,
    changeVisibleModalSubscriptionCard
}) => {
    
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
                    });
                }).catch(error => {
                    Services.ErrorCatch(error)
                });
            }
        })

    }

    return (
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
            <Modal.Body className="px-5">
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
                                />))
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalSubscription;