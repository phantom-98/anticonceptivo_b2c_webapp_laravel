import React, { useEffect, useState, useContext } from "react";
import TablePanel from "../../../../../components/TablePanel";
import moment from "moment";
import { formatMoney } from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import { AuthContext } from "../../../../../context/AuthProvider";
import { Modal } from "react-bootstrap";
import ListItemAddresses from "../Addresses/ListItem";
import ListItemSubscriptions from "../Subscriptions/ListItem";
import ReactTooltip from 'react-tooltip';
import Form from "../Addresses/Form";
import CloseModal from "../../../../../components/general/CloseModal";
import Swal from "sweetalert2";
import toastr from "toastr";
import {v4 as uuidv4} from "uuid";

const Table = ({
    setSubscriptionOrderItemSelected,
    subscriptionOrderItemSelected
}) => {
    const { auth } = useContext(AuthContext);
    const [tableLoaded, setTableLoaded] = useState(false);
    const [modalAddress, setModalAddress] = useState(false);
    const [modalSubscriptionCard, setModalSubscriptionCard] = useState(false);
    const [activeSubscription, setActiveSubscription] = useState([]);

    const [modalDispatchDate, setModalDispatchDate] = useState(false);
    const [objects, setObjects] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [addressSelected, setAddressSelected] = useState(null);
    const [view, setView] = useState("list");
    const [formMode, setFormMode] = useState("create");
    const [dispatchDate, setDispatchDate] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);

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
        console.log(activeSubscription)
    }, []);


    const changeMonthToSpanish= (dateString) =>{
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
                        console.log(activeSubscription)
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

    const handleDispatchDate = (e) => {
        setDispatchDate(e.target.value)
    }

    const changeVisibleModalDispatchDate = () => {
        if (modalDispatchDate) {
            setModalDispatchDate(false);
        } else {
            setModalDispatchDate(true);
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

    const updateDispatchDate = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_DISPATCH_DATE_SUBSCRIPTION;
        let data = {
            customer_id: auth.id,
            subscription_order_item_id: subscriptionOrderItemSelected ? subscriptionOrderItemSelected.id : 0,
            dispatch_date: dispatchDate
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
                    '<span style="color: #0869A6;">¿Está seguro de cambiar la fecha de despacho?</span>',
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
                                getSubscriptions();
                                getDataAddress();
                                setModalDispatchDate(false);

                            },
                            error: () => {
                                toastr.error(response.message);


                            }
                        });
                    })
                    .catch(error => {
                        Services.ErrorCatch(error);

                    });
                }
            });


    };
    const getSubscriptionsCards = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url,data).then(response => {
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
                Services.DoPost(url,data).then(response => {
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

    const formattedData = (row) => {
        let htmlExpandRow = '';
        row.products.forEach(function (element, i){
            htmlExpandRow += "<div class='row ml-3'><div className='col-md-8'>"+element.name+"</div>"+"<div class='col-md-4'> Corresponde al periodo"+" "+row.period+"  </div></div>"
        });
        return htmlExpandRow;
    }

    const expandRow = {
        renderer: (row, rowIndex) => (
            <div dangerouslySetInnerHTML={{__html: formattedData(row)}}>
            </div>
        )
      };

    const columns = [
        {
            text: "NÚMERO DE PEDIDO",
            dataField: "pay_date",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                return '#'+row.order_id;
            }
        },
        {
            text: "TARJETA",
            dataField: "pay_date",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {

                if(row.subscription == null){
                    return (
                        <span
                            onClick={() => selectedColumnsSubscriptionCard(row)}
                            className="link pointer"
                            style={{ color: "#484848" }}
                        >
                            Tarjeta No Encontrada
                        </span>
                    );
                }

                if(row.status != 'CREATED' && row.status != 'REJECTED'){
                    return row.subscription.card_number;
                }

                return (
                    <span
                        onClick={() => selectedColumnsSubscriptionCard(row)}
                        className="link pointer"
                        style={{ color: "#484848" }}
                    >
                        {row.subscription.card_number}
                    </span>
                );

            }
        },

        {
            text: "FECHA DE PAGO",
            dataField: "pay_date",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                return moment(cell).format("DD/MM/YYYY");
            }
        },
        {
            text: "FECHA DE DESPACHO",
            dataField: "dispatch_date",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {

                if(row.status != 'CREATED' && row.status != 'REJECTED'){
                    return moment(cell).format("DD/MM/YYYY")
                }

                return (
                    <span
                        onClick={() => selectedColumnDispatchDate(row)}
                        className="link pointer"
                        style={{ color: "#484848" }}
                    >
                        {moment(cell).format("DD/MM/YYYY")}
                    </span>
                );
            }
        },
        {
            text: "ESTADO DE DESPACHO",
            dataField: "subtotal",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                if(row.dispatch_status != null){
                    return row.dispatch_status

                }else if(row.order.dispatch_status != null){
                    return row.order.dispatch_status
                }else{
                    return 'Sin Despachar';
                }
            }
        },
        {
            text: "DIRECCIÓN",
            dataField: "subtotal",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                let address = '';
                console.log(row)
                if(row.delivery_address != null){
                    address = row.delivery_address
                }else if(row.customer_address){
                    address = row.customer_address.address  + ' ' + row.customer_address.extra_info
                }

                if(row.status != 'CREATED' && row.status != 'REJECTED'){
                    return address;
                }
                return (
                    <span
                        onClick={() => selectedColumnAddress(row)}
                        className="link pointer"
                        style={{ color: "#484848" }}
                    >
                        {address}
                    </span>
                );
            }
        },
        {
            text: "ESTADO",
            dataField: "subtotal",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                if(row.status == 'CREATED'){
                    return 'CREADO'
                }else if (row.status == 'REJECTED'){
                    return (
                        <span
                            onClick={() => selectedSubscriptionOrderItemStatusRejected(row)}
                            className="link pointer"
                            style={{ color: "#484848" }}
                        >
                            RECHAZADO
                        </span>
                    );
                }else if(row.status == 'DISPATCHED'){
                    return 'DESPACHADO'
                }else if(row.status == 'DELIVERED'){
                    return 'DELIVERED'
                }else if(row.status == 'PAID'){
                    return 'PAGADO'
                }
                return row.status
            }
        },
        {
            text:   [<span className="img-in-input" data-tip data-for="password_tooltip">TOTAL</span>,
        // <ReactTooltip
        //     place="right"
        //     type="light"
        //     effect="solid"
        //     id="password_tooltip"
        //     multiline={true}
        //     className="tooltip-box-shadow"
        // >
        //     <div className="text-left">
        // <span className="bold color-707070">
        //      Tarifas del despacho pueden variar
        // </span>
        //     </div>
        // </ReactTooltip>
            ],
            dataField: 'total',
            sort: true,
            classes: '',
            headerClasses: '',
            formatter: (cell, row) => {

                if(row.status !== 'PAID'){
                    return formatMoney(cell) + '(*)'

                }
                return formatMoney(cell)

            }
        },
    ];

    return (
        <>

<Modal
        show={modalDispatchDate}
                centered
                backdrop="static"
                keyboard={false}
                onHide={modalDispatchDate}
            >
                <Modal.Header>
                    <CloseModal hideModal={changeVisibleModalDispatchDate} />
                </Modal.Header>
                <Modal.Body className="px-5">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="modal-title text-center lh-34">
                                Dirección de despacho
                            </h3>
                        </div>
                        <div className="col-12 mt-3 text-center">



                           <input type="date" onChange={handleDispatchDate} placeholder="dd/mm/yyyy" value={moment(dispatchDate).format("YYYY-MM-DD")}></input>


                            <div className="col-md-12 mt-4 text-center">
                                <button type="button" className="btn btn-bicolor px-5"
                                        onClick={() => updateDispatchDate()}
                                        >
                                    <span>GUARDAR</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={modalSubscriptionCard}
                centered
                size="lg"
                backdrop="static"
                keyboard={false}
                onHide={modalSubscriptionCard}
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

            <Modal
                show={modalAddress}
                centered
                size="lg"
                backdrop="static"
                keyboard={false}
                onHide={modalAddress}
            >
                <Modal.Header>
                    <CloseModal hideModal={changeVisibleModalAddress} />
                </Modal.Header>
                <Modal.Body className="px-5">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="modal-title text-center lh-34">
                                Direcciones
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
                activeSubscription.map((item,index) => {

                    return item.days >0 ? (

                        <p>
                            {/*#{item.order_parent_id} {item.name}  Le quedan  {item.days} días de protección*/}
                            #{item.order_parent_id} {item.name} le quedan  {item.days} días o hasta el {changeMonthToSpanish(item.max_date)} de proteccion

                        </p>
                    ) : null

                })
            }
            <TablePanel
                expandRow={ expandRow }
                objects={objects}
                columns={columns}
                tableLoaded={tableLoaded}
                showTextPriceDispatch={true}
            />
        </>
    );
};

export default Table;
