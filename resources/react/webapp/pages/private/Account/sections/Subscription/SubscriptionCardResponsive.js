import React, {useEffect, useState, useContext} from "react";
import TablePanel from "../../../../../components/TablePanel";
import moment from "moment";
import {formatMoney} from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import {AuthContext} from "../../../../../context/AuthProvider";
import {Modal} from "react-bootstrap";
import ListItemAddresses from "../Addresses/ListItem";
import ListItemSubscriptions from "../Subscriptions/ListItem";
import ReactTooltip from 'react-tooltip';
import Form from "../Addresses/Form";
import CloseModal from "../../../../../components/general/CloseModal";
import Swal from "sweetalert2";
import toastr from "toastr";
import {v4 as uuidv4} from "uuid";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import ModalDispatchDate from "./ModalDispatchDate";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../../routes/publicRoutes";
import {CONFIG} from "../../../../../Config";
import AddCartCard from "../../../../../components/shopping/AddCartCard";
import ProductCard from "../../../../../components/shopping/ProductCard";

registerLocale('es', es)

const Table = ({
                   setSubscriptionOrderItemSelected,
                   subscriptionOrderItemSelected
               }) => {
    const {auth} = useContext(AuthContext);
    const [tableLoaded, setTableLoaded] = useState(false);
    const [modalAddress, setModalAddress] = useState(false);
    const [modalSubscriptionCard, setModalSubscriptionCard] = useState(false);
    const [activeSubscription, setActiveSubscription] = useState([]);
    const [showSubscriptionCard, setShowSubscriptionCard] = useState(null);
    const [modalDispatchDate, setModalDispatchDate] = useState(false);
    const [objects, setObjects] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [addressSelected, setAddressSelected] = useState(null);
    const [view, setView] = useState("list");
    const [formMode, setFormMode] = useState("create");
    const [subscriptions, setSubscriptions] = useState([]);
    const [dispatchDate, setDispatchDate] = useState(new Date());
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());

    const showEdit = address => {
        setView("form");
        setFormMode("edit");
        setAddressSelected(address);
    };

    useEffect(() => {
        getActiveSubscriptions();
        getSubscriptionsCards();
        getDataAddress();
        getSubscriptions();

    }, []);

    const changeMonthToSpanish = (dateString) => {
        dateString = dateString.replace('January', 'Enero')
        dateString = dateString.replace('February', 'Enero')
        dateString = dateString.replace('March', 'Febrero')
        dateString = dateString.replace('April', 'Abril')
        dateString = dateString.replace('May', 'Mayo')
        dateString = dateString.replace('June', 'Junio')
        dateString = dateString.replace('July', 'Julio')
        dateString = dateString.replace('August', 'Agosto')
        dateString = dateString.replace('September', 'Septiembre')
        dateString = dateString.replace('October', 'Octubre')
        dateString = dateString.replace('November', 'Noviembre')
        dateString = dateString.replace('December', 'Diciembre')
        return dateString;
    }

    const getActiveSubscriptions = () => {
        let url =
            Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS
                .GET_ACTIVE_SUBSCRIPTIONS_ORDERS_ITEMS;
        let data = {
            customer_id: auth.id
        };
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setActiveSubscription(response.data.active_subscriptions);

                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    const changeVisibleModalAddress = () => {
        if (modalAddress) {
            setModalAddress(false);
        } else {
            setModalAddress(true);
        }
    };

    const changeVisibleModalSubscriptionCard = () => {
        if (modalSubscriptionCard) {
            setModalSubscriptionCard(false);
        } else {
            setModalSubscriptionCard(true);
        }
    };


    const saveDefaultAddress = (addressId, customerId) => {
        let url =
            Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_ADDRESS_SUBSCRIPTION;

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

    const selectedColumnAddress = (subscriptionOrderItem) => {
        setSubscriptionOrderItemSelected(subscriptionOrderItem);
        setModalAddress(true);
    };

    const selectedColumnsSubscriptionCard = (subscriptionOrderItem) => {
        setSubscriptionOrderItemSelected(subscriptionOrderItem);
        setModalSubscriptionCard(true);
    };

    const selectedColumnDispatchDate = (subscriptionOrderItem) => {
        let minDateDispatch = new Date(subscriptionOrderItem.min_date_dispatch + ' 04:00:00')
        minDateDispatch.setDate(minDateDispatch.getDate() + 1);
        setMinDate(minDateDispatch)
        setMaxDate(minDateDispatch.getDate() + 7)

        setSubscriptionOrderItemSelected(subscriptionOrderItem);
        setDispatchDate(subscriptionOrderItem.dispatch_date)
        setModalDispatchDate(true);
    };

    const selectedSubscriptionOrderItemStatusRejected = (subscriptionOrderItem) => {
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
                    '<span style="color: #0869A6;">¿Está seguro de reintentar el pago?</span>',
                confirmButtonText: "Confirmar",
                reverseButtons: true
            })
            .then(result => {
                if (result.isConfirmed) {

                }
            });

        setSubscriptionOrderItemSelected(subscriptionOrderItem);
    };

    const getDataAddress = () => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.GET;
        let data = {
            customer_id: auth.id
        };
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setAddresses(response.data.addresses);
                        setRegions(response.data.regions);
                        setCommunes(response.data.communes);
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };


    const getSubscriptionsCards = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setSubscriptions(response.data.subscriptions);
                }
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

    const getSubscriptions = () => {
        let url =
            Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS
                .GET_SUBSCRIPTIONS_ORDERS_ITEMS;
        let data = {
            customer_id: auth.id
        };
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        if (response.data.subscriptions != null) {
                            setObjects(response.data.subscriptions);
                            setTableLoaded(true);
                        }
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const goBack = () => {
        setView("list");
        setAddressSelected(null);
    };



    return (
        <>
            <ModalDispatchDate
                modalDispatchDate={modalDispatchDate}
                setModalDispatchDate={setModalDispatchDate}
                subscriptionOrderItemSelected={subscriptionOrderItemSelected}
                dispatchDate={dispatchDate}
                setDispatchDate={setDispatchDate}
                minDate={minDate}
                auth={auth}
                getSubscriptions={getSubscriptions}
                getDataAddress={getDataAddress}
            />
            <Modal
                show={modalSubscriptionCard}
                centered
                size="lg"
                backdrop="static"
                keyboard={false}
                onHide={modalSubscriptionCard}
            >
                <Modal.Header>
                    <CloseModal hideModal={changeVisibleModalSubscriptionCard}/>
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

            <Modal
                show={modalAddress}
                centered
                size="lg"
                backdrop="static"
                keyboard={false}
                onHide={modalAddress}
            >
                <Modal.Header>
                    <CloseModal hideModal={changeVisibleModalAddress}/>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="modal-title text-center lh-34">
                                Cambiar dirección
                            </h3>
                        </div>
                        <div className="col-12 mt-3">
                            {view === "list"
                                ? addresses.map((address, index) => (
                                    <ListItemAddresses
                                        key={index}
                                        address={address}
                                        showEdit={showEdit}
                                        saveDefaultAddress={
                                            saveDefaultAddress
                                        }
                                        regions={regions}
                                        communes={communes}
                                        addressChecked={
                                            subscriptionOrderItemSelected == null
                                                ? 0
                                                : (subscriptionOrderItemSelected.customer_address_id ==
                                                address.id
                                                    ? 1
                                                    : 0)
                                        }
                                        isSusbscription={true}
                                    />
                                ))
                                : null}
                            {view === "form" ? (
                                <Form
                                    formMode={formMode}
                                    addressSelected={addressSelected}
                                    goBack={goBack}
                                    getData={addresses}
                                    customerId={auth.id}
                                    regions={regions}
                                    setAddresses={setAddresses}
                                />
                            ) : null}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {
                activeSubscription.map((item, index) => {

                    return item.days > 0 ? (

                        <p>
                            {/*#{item.order_parent_id} {item.name}  Le quedan  {item.days} días de protección*/}
                            #{item.order_parent_id} {item.name} le quedan {item.days} días o hasta
                            el {changeMonthToSpanish(item.max_date)} de proteccion

                        </p>
                    ) : null

                })
            }


            {objects.length ?
                objects.map((item, index) => {
                    let address = '';
                    let isOnClickAddress = true;
                    if (item.delivery_address != null) {
                        address = item.delivery_address
                    } else if (item.customer_address) {
                        address = item.customer_address.address + ' ' + item.customer_address.extra_info
                    }

                    if (item.status != 'CREATED' && item.status != 'REJECTED') {
                        isOnClickAddress = false;
                    }

                    return (
                        <div className="col-12 m-0 mt-3 p-0">
                            <div key={uuidv4()} className="subscription-card">
                                <div className="subscription-card-header">
                                    {item.products.map((product, index) => {
                                        return (
                                            <div className="row mr-1 ml-1">
                                                <div className="col-10 d-flex flex-row">
                                                    <img height={48} src={product.images[0].public_file}
                                                         alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                                                    <div
                                                        className="ml-3 product-card-name text-truncate p-0 product-card-name"
                                                        style={{fontSize: 15, marginTop: 15}}>{product.name}</div>
                                                </div>
                                                <div className="col-2 d-flex flex-row">

                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="subscription-card-body mr-1 ml-1 mt-2">
                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Nº Pedido</h1>
                                        <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.order_id}</h1>
                                    </div>
                                    <div className="col-12 d-flex flex-row">
                                        <div className="col p-0">
                                            <div className="d-flex flex-row">
                                                <div className="mr-1 p-0 subscription-card-label">F Despacho</div>
                                                <div
                                                    className="ml-1 p-0 subscription-card-value">{moment(item.dispatch_date).format("DD/MM/YYYY")}</div>
                                            </div>
                                        </div>
                                        <div className="col-auto d-flex flex-row p-0 text-right">
                                            <div className="link pointer text-truncate ml-2 p-0 subscription-card-value"
                                                 style={{textAlign: 'right'}}>Cambiar fecha
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Tarjeta</h1>
                                        {
                                            item.subscription == null ?
                                                <h1
                                                    onClick={() => selectedColumnsSubscriptionCard(item)}
                                                    className="ml-2 text-truncate p-0 subscription-card-value link pointer"
                                                    style={{color: "#484848"}}
                                                >
                                                    No Encontrada
                                                </h1>
                                                : item.status !== 'CREATED' && item.status !== 'REJECTED' ?
                                                    <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription.card_number}</h1> :
                                                    <h1 className="ml-2 text-truncate p-0 subscription-card-value link pointer"
                                                        onClick={() => selectedColumnsSubscriptionCard(item)}
                                                        style={{color: "#484848"}}
                                                    >
                                                        {item.subscription.card_number}
                                                    </h1>

                                        }
                                    </div>

                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Estado Despacho</h1>
                                        {
                                            item.dispatch_status != null ?
                                                <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.dispatch_status}</h1> :
                                                item.order.dispatch_status != null ?
                                                    <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.dispatch_status}</h1> :
                                                    <h1 className="ml-2 text-truncate p-0 subscription-card-value">Sin Despachar</h1>
                                        }
                                    </div>
                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Dirección</h1>
                                        {
                                            isOnClickAddress ?
                                                <h1 onClick={() => selectedColumnAddress(item)} style={{ color: 'black'}} className="ml-2 text-truncate p-0 subscription-card-value link pointer">{address}</h1> :
                                                    <h1 className="ml-2 text-truncate p-0 subscription-card-value">{address}</h1>
                                        }
                                    </div>
                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Total</h1>
                                        <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.status !== 'PAID' ? formatMoney(item.total) + '(*)' : formatMoney(item.total)}</h1>
                                    </div>

                                </div>
                                <div className="subscription-card-footer">

                                </div>
                            </div>
                        </div>
                    )
                })
                : <div className="col-md-12 mt-5">
                    <div className="product-no-stock-alert font-12 font-poppins">
                        Actualmente no tiene subscripciones.
                    </div>
                </div>
            }


        </>
    );
};

export default Table;
