import React, {useEffect, useState, useContext} from "react";
import {CONFIG} from "../../../../../Config";
import { AppContext } from "../../../../../context/AppProvider";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import ListItemAddresses from "../Addresses/ListItem";
import ListItemSubscriptions from "../Subscriptions/ListItem";
import Form from "../Addresses/Form";
import CloseModal from "../../../../../components/general/CloseModal";
import Swal from "sweetalert2";
import {v4 as uuidv4} from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from "react-datepicker";
import ModalDispatchDate from "./ModalDispatchDate";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import { BREAKPOINTS } from "../../../../../helpers/vars";
import {Modal} from "react-bootstrap";
import {formatMoney} from "../../../../../helpers/GlobalUtils";
import moment from "moment";
import es from 'date-fns/locale/es';

registerLocale('es', es)

const SubscriptionCardResponsive = ({
    setSubscriptionOrderItemSelected,
    subscriptionOrderItemSelected
}) => {
    const {auth} = useContext(AuthContext);
    const { breakpoint } = useContext(AppContext)

    const [tableLoaded, setTableLoaded] = useState(false);
    const [modalAddress, setModalAddress] = useState(false);
    const [modalSubscriptionCard, setModalSubscriptionCard] = useState(false);
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

    const showCreate = () => {
        setView('form')
        setFormMode('create')
        setAddressSelected(null)
    }

    useEffect(() => {
        getSubscriptionsCards();
        getDataAddress();
        getSubscriptions();
    }, []);

    useEffect(() => {
        console.log('subscriptionOrderItemSelected', subscriptionOrderItemSelected);
    }, [subscriptionOrderItemSelected])

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

    const saveDefaultAddressSubscription = (addressId, customerId) => {
        // console.log(232323)
        // return
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

    const cancelSubscriptionItem = (subscriptionOrderItem) => {

        let url =
            Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_CANCEL_SUBSCRIPTION;

        let data = {
            subscription_order_item_id: subscriptionOrderItem.id
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
                html:
                    '<h3 class="font-21 bold font-poppins color-0869A6">¿Estás seguro de que quieres cancelar?</h3><p class="font-14 font-poppins regular pt-3">Al cancelar esta suscripción implica cancelar todos los productos relacionados al número de pedido <b>' + subscriptionOrderItem.order_parent_id + '</b></br></p>',
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
            customer_id: auth.id,
            isMobile: 1,
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
                    {view === "list" ? <CloseModal hideModal={changeVisibleModalAddress}/> : null}
                </Modal.Header>
                <Modal.Body className="px-5">
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

                                        <div className="col-md-12">
                                            <Icon path={plusIcon} /> <span onClick={() => showCreate()} className="link pointer font-14 bold link-address-profile">Agregar nueva dirección</span>
                                        </div>
                                    </>
                                : null
                            }
                            {
                                view === "form" ?
                                    <Form
                                        formMode={formMode}
                                        addressSelected={addressSelected}
                                        goBack={goBack}
                                        getData={addresses}
                                        customerId={auth.id}
                                        regions={regions}
                                        setAddresses={setAddresses}
                                    />
                                : null
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {objects.length ?
                objects.map((item, index) => {
                    let address = '';
                    let isOnClickAddress = true;
                    if (item.subscription_item.delivery_address != null) {
                        address = item.subscription_item.delivery_address
                    } else if (item.customer_address) {
                        address = item.subscription_item.customer_address.address + ' ' + item.subscription_item.customer_address.extra_info
                    }
                    if (item.subscription_item.status != 'CREATED' && item.subscription_item.status != 'REJECTED') {
                        isOnClickAddress = false;
                    }

                    if (!item.active) {
                        return null
                    }

                    return (
                        <div className="col-12 m-0 mt-3 p-0">
                            <div key={uuidv4()} className="subscription-card">
                                <div className="subscription-card-header">

                                    <div className="row mr-1 ml-1">
                                        <div className="col d-flex flex-row pr-0">
                                            <img height={48}
                                                 src={item.subscription_item.order_item.product.images[0].public_file}
                                                 alt={`${CONFIG.APP_NAME} - ${item.subscription_item.order_item.product.name}`}/>
                                            <div
                                                className="ml-3 product-card-name text-truncate p-0"
                                                style={{
                                                    fontSize: 15,
                                                    marginTop: 15
                                                }}>{item.subscription_item.order_item.product.name}</div>

                                        </div>


                                        {
                                            item.subscription_item.active == 0 ?
                                                <div className="col-auto d-flex flex-row">
                                                    <div className="subscription-card-label-cancel mt-2">Cancelado</div>
                                                </div>
                                                :

                                                (item.current_advance - 2 == item.advance_end ?
                                                    <div className="col-auto d-flex flex-row">
                                                        <div
                                                            className="subscription-card-label-inactive mt-2">Inactivo
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="col-auto d-flex flex-row">
                                                        <div className="subscription-card-label-active mt-2">Activo
                                                        </div>
                                                    </div>)
                                        }

                                    </div>

                                </div>
                                <div className="subscription-card-body mr-1 ml-1 mt-2">
                                    <div className="col-12 d-flex flex-row">
                                        <div className="col p-0">
                                            <h1 className="p-0 subscription-card-label">Avance Suscripción</h1>
                                        </div>
                                        <div className="col-auto p-0" style={{marginTop: -6}}>
                                            {
                                                Array.from({length: item.advance_end}, (_, i) => i + 1).map((itemNumber) => {
                                                    if (item.current_advance < itemNumber) {
                                                        return (
                                                            <span className="dot-incoming"/>
                                                        )
                                                    } else if (item.current_advance === itemNumber || item.current_advance - 1 === itemNumber) {
                                                        return (
                                                            <span className="dot-process"/>
                                                        )
                                                    } else {
                                                        return (
                                                            <span className="dot-finish"/>
                                                        )
                                                    }
                                                })
                                            }
                                            <span
                                                className="ml-2 p-0 subscription-card-label">{item.current_advance - 2}/{item.advance_end}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Nº Pedido</h1>
                                        <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription_item.order_parent_id}</h1>
                                    </div>

                                    <div className="col-12 d-flex flex-row">
                                        <div className="col p-0">
                                            <div className="d-flex flex-row">
                                                <div className="mr-1 p-0 subscription-card-label">Fecha De Pago</div>
                                                <div
                                                    className="ml-1 p-0 subscription-card-value">{moment(item.subscription_item.pay_date).format("DD/MM/YYYY")}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex flex-row">
                                        <div className="col p-0">
                                            <div className="d-flex flex-row">
                                                <div className="mr-1 p-0 subscription-card-label">Fecha Despacho</div>

                                                {
                                                    item.subscription_item.status != 'CREATED' && item.subscription_item.status != 'REJECTED' ?
                                                        <div
                                                            className="ml-1 p-0 subscription-card-value">{moment(item.subscription_item.dispatch_date).format("DD/MM/YYYY")}</div>
                                                        :
                                                        <div
                                                            onClick={() => selectedColumnDispatchDate(item.subscription_item)}
                                                            style={{color: 'black'}}
                                                            className="link pointer ml-1 p-0 subscription-card-value">{moment(item.subscription_item.dispatch_date).format("DD/MM/YYYY")}</div>
                                                }

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Tarjeta</h1>
                                        {
                                            item.subscription_item.subscription == null ?
                                                <h1
                                                    onClick={() => selectedColumnsSubscriptionCard(item.subscription_item)}
                                                    className="ml-2 text-truncate p-0 subscription-card-value link pointer"
                                                    style={{color: "#484848"}}
                                                >
                                                    No Encontrada
                                                </h1>
                                                : item.subscription_item.status !== 'CREATED' && item.subscription_item.status !== 'REJECTED' ?
                                                <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription_item.subscription.card_number}</h1> :
                                                <h1 className="ml-2 text-truncate p-0 subscription-card-value link pointer"
                                                    onClick={() => selectedColumnsSubscriptionCard(item.subscription_item)}
                                                    style={{color: "#484848"}}
                                                >
                                                    {item.subscription_item.subscription.card_number}
                                                </h1>

                                        }
                                    </div>

                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Estado Despacho</h1>
                                        {
                                            item.subscription_item.dispatch_status != null ?
                                                <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription_item.dispatch_status}</h1> :
                                                item.subscription_item.order_parent.dispatch_status != null ?
                                                    <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription_item.dispatch_status}</h1> :
                                                    <h1 className="ml-2 text-truncate p-0 subscription-card-value">Sin
                                                        Despachar</h1>
                                        }
                                    </div>
                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Dirección</h1>
                                        {
                                            isOnClickAddress ?
                                                <h1 onClick={() => selectedColumnAddress(item.subscription_item)}
                                                    style={{color: 'black'}}
                                                    className="ml-2 text-truncate p-0 subscription-card-value link pointer">{address}</h1> :
                                                <h1 className="ml-2 text-truncate p-0 subscription-card-value">{address}</h1>
                                        }
                                    </div>
                                    <div className="col-12 d-flex flex-row">
                                        <h1 className="text-truncate p-0 subscription-card-label">Total</h1>
                                        <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription_item.status !== 'PAID' ? formatMoney(item.total) + '(*)' : formatMoney(item.total)}</h1>
                                    </div>
                                </div>
                                <div className="subscription-card-footer">
                                    <div className="col-12 d-flex flex-row mt-2 mr-1 ml-1">
                                        <h1 style={{lineHeight: 1.5}}
                                            className="mr-1 mb-0 p-0 subscription-card-value">Le quedan
                                            <span
                                                className=" p-0 subscription-card-label"> {item.cycle.days} días </span>
                                            o hasta el
                                            <span
                                                className=" p-0 subscription-card-label"> {changeMonthToSpanish(item.cycle.max_date)} </span>
                                            de protección.
                                        </h1>
                                    </div>
                                    {
                                        item.subscription_item.active == 1 ?
                                            <div className="row">
                                                <div className="col-12 col-sm-6 text-center">
                                                    <span onClick={() => changeVisibleModalAddress()}
                                                        className="mr-1 mb-0 p-0 subscription-card-value link pointer">
                                                        Cambiar dirección
                                                    </span>
                                                </div>
                                                <div className="col-12 col-sm-6 text-center">
                                                    <span onClick={() => cancelSubscriptionItem(item.subscription_item)}
                                                        style={{ color: "red" }}
                                                        className="mr-1 mb-0 p-0 subscription-card-value link pointer">
                                                        Cancelar Suscripción
                                                    </span>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }

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

            <div className="col-md-12 py-2 pl-0 pr-0 mt-2 mb-0 pb-0">
                <div className="note-receipt">
                    <div className="row">
                        <div className="col d-flex">
                            <span
                                className="my-auto font-13 font-poppins regular color-033F5D">
                                (*) Tarifas de despacho pueden variar.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionCardResponsive;
