import React, { useState, useContext} from 'react';
import { Modal } from "react-bootstrap";
import CloseModal from "../../../../../components/general/CloseModal";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";
import ListItemAddresses from "../Addresses/ListItem";
import Form from "../Addresses/Form";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import { v4 as uuidv4 } from "uuid";
import * as Services from "../../../../../Services";
import Swal from "sweetalert2";

const ModalAddress = ({ 
    modals, 
    authId, 
    addresses, 
    setAddresses, 
    regions, 
    communes, 
    subscriptionOrderItemSelected,
    setSubscriptionOrderItemSelected,
    changeVisibleModalAddress,
    getSubscriptions,
    getDataAddress
}) => {

    const { breakpoint } = useContext(AppContext)

    const [view, setView] = useState("list");
    const [formMode, setFormMode] = useState("create");
    const [addressSelected, setAddressSelected] = useState(null);

    const showEdit = address => {
        setView("form");
        setFormMode("edit");
        setAddressSelected(address);
    };

    const showCreate = () => {
        setView('form')
        setFormMode('create')
        setAddressSelected(null)
    }

    const goBack = () => {
        setView("list");
        setAddressSelected(null);
    };

    const saveDefaultAddressSubscription = (addressId, customerId) => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_ADDRESS_SUBSCRIPTION;

        let data = {
            address_id: addressId,
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
                    '<span style="color: #0869A6;">¿Está seguro de cambiar la dirección?</span>',
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

    return (
        <Modal
            show={modals.address}
            centered
            size="lg"
            backdrop="static"
            keyboard={false}
            onHide={modals.address}
        >
            <Modal.Header>
                {view === "list" ? <CloseModal hideModal={changeVisibleModalAddress} /> : null}
            </Modal.Header>
            <Modal.Body className={`${breakpoint === BREAKPOINTS.EXTRA_EXTRA_SMALL ? 'px-3' : 'px-5'}`}>
                <div className="row">
                    <div className="col-12">
                        <h3 className="modal-title text-center lh-34">
                            Cambiar dirección
                        </h3>
                    </div>
                    <div className="col-12 mt-3">
                        {
                            view === "list" ?
                                <>
                                    {
                                        addresses.map((address, index) => (
                                            <ListItemAddresses
                                                key={uuidv4()}
                                                address={address}
                                                showEdit={showEdit}
                                                saveDefaultAddress={saveDefaultAddressSubscription}
                                                regions={regions}
                                                communes={communes}
                                                addressChecked={
                                                    subscriptionOrderItemSelected && subscriptionOrderItemSelected.customer_address_id === address.id ? 1 : 0
                                                }
                                                isSusbscription={true}
                                                name={'address_sub'}
                                            />
                                        ))
                                    }
                                    {
                                        breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                                            <div className="col-md-12 py-2">
                                                <hr />
                                            </div>
                                            :
                                            null
                                    }

                                    <div className="col-md-12 text-center mb-3">
                                        <Icon path={plusIcon} /> <span onClick={() => showCreate()} className="link pointer font-14 bold link-address-profile">Agregar nueva dirección</span>
                                    </div>
                                </>
                                : null
                        }
                        {
                            view === "form" ?
                                <Form
                                    addressSelected={addressSelected}
                                    goBack={goBack}
                                    formMode={formMode}
                                    customerId={authId}
                                    regions={regions}
                                    setAddresses={setAddresses}
                                />
                                : null
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalAddress;