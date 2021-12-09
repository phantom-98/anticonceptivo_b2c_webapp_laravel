import React, {useEffect, useState, useContext} from "react";
import {CONFIG} from "../../../../../Config";
import { AppContext } from "../../../../../context/AppProvider";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import Swal from "sweetalert2";
import {v4 as uuidv4} from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from "react-datepicker";
import ModalDispatchDate from "./ModalDispatchDate";
import ModalAddress from "./ModalAddress";
import ModalSubscription from "./ModalSubscription";
import { BREAKPOINTS } from "../../../../../helpers/vars";
import { formatMoney, changeMonthToSpanish} from "../../../../../helpers/GlobalUtils";
import moment from "moment";
import es from 'date-fns/locale/es';
import LazyLoading from "../../../../../components/LazyLoading";

registerLocale('es', es)

const SubscriptionCard = ({
    setSubscriptionOrderItemSelected,
    subscriptionOrderItemSelected
}) => {
    const {auth} = useContext(AuthContext);
    const { breakpoint } = useContext(AppContext)

    const [tableLoaded, setTableLoaded] = useState(false);
    const [objects, setObjects] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [dispatchDate, setDispatchDate] = useState(new Date());
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());

    // address modal
    const [addresses, setAddresses] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);

    useEffect(() => {
        getSubscriptionsCards();
        getDataAddress();
        getSubscriptions();
    }, []);

    // modals state
    const [modals, setModals] = useState({
        address: false,
        subscription: false,
        dispatch_date: false,
    });

    // modals functions show / hide
    const changeVisibleModalAddress = (subscriptionOrderItem = null) => {
        if (modals.address) {
            setSubscriptionOrderItemSelected(subscriptionOrderItem);
            setModals({
                ...modals,
                address: false
            });
        } else {
            setSubscriptionOrderItemSelected(subscriptionOrderItem);
            setModals({
                ...modals,
                address: true
            });
        }
    };

    const changeVisibleModalSubscriptionCard = (subscriptionOrderItem = null) => {
        if (modals.subscription) {
            setSubscriptionOrderItemSelected(subscriptionOrderItem);
            setModals({
                ...modals,
                subscription: false
            })
        } else {
            setSubscriptionOrderItemSelected(subscriptionOrderItem);
            setModals({
                ...modals,
                subscription: true
            })
        }
    };

    const changeVisibleModalDispatchDate = (subscriptionOrderItem = null) => {
        if (modals.dispatch_date) {
            setSubscriptionOrderItemSelected(subscriptionOrderItem);
            setModals({
                ...modals,
                dispatch_date: false
            });
        } else {
            setSubscriptionOrderItemSelected(subscriptionOrderItem);
            setModals({
                ...modals,
                dispatch_date: true
            });
        }
    };

    // selectors

    const selectedColumnAddress = (subscriptionOrderItem) => {
        setSubscriptionOrderItemSelected(subscriptionOrderItem);
        setModals({
            ...modals,
            address: true
        })
    };

    const selectedColumnsSubscriptionCard = (subscriptionOrderItem) => {
        setSubscriptionOrderItemSelected(subscriptionOrderItem);
        setModals({
            ...modals,
            subscription: true
        })
    };

    const selectedColumnDispatchDate = (subscriptionOrderItem) => {
        let minDateDispatch = new Date(subscriptionOrderItem.min_date_dispatch + ' 04:00:00')
        minDateDispatch.setDate(minDateDispatch.getDate() + 1);
        setMinDate(minDateDispatch)
        setMaxDate(minDateDispatch.getDate() + 7)

        setSubscriptionOrderItemSelected(subscriptionOrderItem);
        setDispatchDate(subscriptionOrderItem.dispatch_date)
        setModals({
            ...modals,
            dispatch_date: true
        })
    };

    // actions

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

    // axios

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

    const getSubscriptions = () => {
        let url =
            Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET_SUBSCRIPTIONS_ORDERS_ITEMS;
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

    if (!tableLoaded) {
        return <LazyLoading/>
    }

    return (
        <>
            <ModalDispatchDate
                changeVisibleModalDispatchDate={changeVisibleModalDispatchDate}
                modals={modals}
                subscriptionOrderItemSelected={subscriptionOrderItemSelected}
                dispatchDate={dispatchDate}
                setDispatchDate={setDispatchDate}
                minDate={minDate}
                auth={auth}
                getSubscriptions={getSubscriptions}
                getDataAddress={getDataAddress}
            />

            <ModalSubscription
                subscriptionOrderItemSelected={subscriptionOrderItemSelected}
                setSubscriptionOrderItemSelected={setSubscriptionOrderItemSelected}
                modals={modals}
                subscriptions={subscriptions}
                changeVisibleModalSubscriptionCard={changeVisibleModalSubscriptionCard}
                getSubscriptionsCards={getSubscriptionsCards}
                customerId={auth.id}
                customerEmail={auth.email}
                getDataAddress={getDataAddress}
                getSubscriptions={getSubscriptions}
            />

            <ModalAddress
                modals={modals}
                authId={auth.id}
                setAddresses={setAddresses}
                addresses={addresses}
                regions={regions}
                communes={communes}
                subscriptionOrderItemSelected={subscriptionOrderItemSelected}
                setSubscriptionOrderItemSelected={setSubscriptionOrderItemSelected}
                changeVisibleModalAddress={changeVisibleModalAddress}
                getSubscriptions={getSubscriptions}
                getDataAddress={getDataAddress}
            />

            {
                objects.length ?
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
                                        <div className="row px-3">
                                            <div className="col-12 d-flex flex-row">
                                                <div className="col p-0">
                                                    <h1 className="p-0 subscription-card-label">Avance Suscripción</h1>
                                                </div>
                                                <div className="col-auto p-0" style={{ marginTop: -6 }}>
                                                    {
                                                        Array.from({ length: item.advance_end }, (_, i) => i + 1).map((itemNumber) => {
                                                            if (item.current_advance < itemNumber) {
                                                                return (
                                                                    <span className="dot-incoming" />
                                                                )
                                                            } else if (item.current_advance === itemNumber || item.current_advance - 1 === itemNumber) {
                                                                return (
                                                                    <span className="dot-process" />
                                                                )
                                                            } else {
                                                                return (
                                                                    <span className="dot-finish" />
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

                                            <div className="col-12 col-sm-6 col-xl-4 d-flex flex-row">
                                                <div className="col p-0">
                                                    <div className="d-flex flex-row">
                                                        <div className="mr-1 p-0 subscription-card-label">Fecha De Pago</div>
                                                        <div
                                                            className="ml-1 p-0 subscription-card-value">{moment(item.subscription_item.pay_date).format("DD/MM/YYYY")}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-6 col-xl-4 d-flex flex-row">
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
                                                                    style={{ color: 'black' }}
                                                                    className="link pointer ml-1 p-0 subscription-card-value">{moment(item.subscription_item.dispatch_date).format("DD/MM/YYYY")}</div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-6 col-xl-4 d-flex flex-row">
                                                <h1 className="text-truncate p-0 subscription-card-label">Tarjeta</h1>
                                                {
                                                    item.subscription_item.subscription == null ?
                                                        <h1
                                                            onClick={() => selectedColumnsSubscriptionCard(item.subscription_item)}
                                                            className="ml-2 text-truncate p-0 subscription-card-value link pointer"
                                                            style={{ color: "#484848" }}
                                                        >
                                                            No Encontrada
                                                        </h1>
                                                        : item.subscription_item.status !== 'CREATED' && item.subscription_item.status !== 'REJECTED' ?
                                                            <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription_item.subscription.card_number}</h1> :
                                                            <h1 className="ml-2 text-truncate p-0 subscription-card-value link pointer"
                                                                onClick={() => selectedColumnsSubscriptionCard(item.subscription_item)}
                                                                style={{ color: "#484848" }}
                                                            >
                                                                {item.subscription_item.subscription.card_number}
                                                            </h1>

                                                }
                                            </div>

                                            <div className="col-12 col-sm-6 col-xl-4 d-flex flex-row">
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

                                            <div className="col-12 col-sm-6 col-md-8 col-lg-6 col-xl-4 d-flex flex-row">
                                                <h1 className="text-truncate p-0 subscription-card-label">Dirección</h1>
                                                {
                                                    isOnClickAddress ?
                                                        <h1 onClick={() => selectedColumnAddress(item.subscription_item)}
                                                            style={{ color: 'black' }}
                                                            className="ml-2 text-truncate p-0 subscription-card-value link pointer">{address}</h1> :
                                                        <h1 className="ml-2 text-truncate p-0 subscription-card-value">{address}</h1>
                                                }
                                            </div>

                                            <div className="col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4 d-flex flex-row">
                                                <h1 className="text-truncate p-0 subscription-card-label">Total</h1>
                                                <h1 className="ml-2 text-truncate p-0 subscription-card-value">{item.subscription_item.status !== 'PAID' ? formatMoney(item.total) + '(*)' : formatMoney(item.total)}</h1>
                                            </div>
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
                                                <div className="row mt-2">
                                                    <div className="col-12 col-sm-6 col-xl-3 my-2 text-center">
                                                        <span onClick={() => changeVisibleModalDispatchDate(item.subscription_item)}
                                                            className="mr-1 mb-0 p-0 subscription-card-value link pointer">
                                                            Cambiar Fecha Despacho
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-xl-3 my-2 text-center">
                                                        <span onClick={() => changeVisibleModalSubscriptionCard(item.subscription_item)}
                                                            className="mr-1 mb-0 p-0 subscription-card-value link pointer">
                                                            Cambiar Tarjeta Asociada
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-xl-3 my-2 text-center">
                                                        <span onClick={() => changeVisibleModalAddress(item.subscription_item)}
                                                            className="mr-1 mb-0 p-0 subscription-card-value link pointer">
                                                            Cambiar dirección
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-xl-3 my-2 text-center">
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
                : 
                    <div className="col-md-12 mt-5">
                        <div className="product-no-stock-alert font-12 font-poppins">
                            Actualmente no tiene subscripciones.
                        </div>
                    </div>
            }

            <div className="col-md-12 py-2 pl-0 pr-0 mt-2 mb-0 pb-0">
                <div className="note-receipt">
                    <div className="row">
                        <div className="col d-flex">
                            <span className="my-auto font-13 font-poppins regular color-033F5D">
                                (*) Tarifas de despacho pueden variar.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionCard;
