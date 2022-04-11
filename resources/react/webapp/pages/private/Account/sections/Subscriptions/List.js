import React from 'react';
import ListItem from "./ListItem";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import * as Services from "../../../../../Services";
import Swal from 'sweetalert2';
import toastr from "toastr";

const List = ({subscriptions, showCreate, getData}) => {

    const saveDefaultSubscription = (subscriptionId, customerId) => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_DEFAULT_SUBSCRIPTION;
        let data = {
            subscription_id: subscriptionId,
            customer_id: customerId
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    getData();
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


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
            confirmButtonText: 'Confirmar',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.DELETE;
                let data = {
                    subscription_id: subscription_id,
                }
                Services.DoPost(url,data).then(response => {
                    Services.Response({
                    response: response,
                        success: () => {
                            getData();
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

    return (
        <div className="row">
            <div className="col-md-12 py-2">
                {
                    subscriptions.map((subscription, index) => (

                        <ListItem
                            key={index}
                            subscription={subscription}
                            saveDefaultSubscription={saveDefaultSubscription}
                            deleteSubscription={deleteSubscription}
                        />))
                }
            </div>
            <div className="col-md-12">
                <Icon path={plusIcon} />  <span onClick={() => showCreate()} className="link pointer font-14 bold link-address-checkout">Agregar nuevo método de pago</span>
            </div>
        </div>
    );
};

export default List
