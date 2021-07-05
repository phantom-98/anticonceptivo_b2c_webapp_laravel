import React, { useEffect, useState, useContext } from "react";
import TablePanel from "../../../../../components/TablePanel";
import moment from "moment";
import { formatMoney } from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import { AuthContext } from "../../../../../context/AuthProvider";
import { Modal } from "react-bootstrap";
import ListItem from "../Addresses/ListItem";
import Form from "../Addresses/Form";
import CloseModal from "../../../../../components/general/CloseModal";
import Swal from "sweetalert2";
import toastr from "toastr";

const Table = ({
    setSubscriptionOrderItemSelected,
    subscriptionOrderItemSelected
}) => {
    const { auth } = useContext(AuthContext);
    const [tableLoaded, setTableLoaded] = useState(false);
    const [modalAddress, setModalAddress] = useState(false);
    const [modalDispatchDate, setModalDispatchDate] = useState(false);
    const [objects, setObjects] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [regions, setRegions] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [addressSelected, setAddressSelected] = useState(null);
    const [view, setView] = useState("list");
    const [formMode, setFormMode] = useState("create");
    const [dispatchDate, setDispatchDate] = useState(null);

    const showEdit = address => {
        setView("form");
        setFormMode("edit");
        setAddressSelected(address);
    };

    useEffect(() => {
        getSubscriptions();
        getDataAddress();
    }, []);

    const changeVisibleModalAddress = () => {
        if (modalAddress) {
            setModalAddress(false);
        } else {
            setModalAddress(true);
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

    const selectedSubscriptionOrderItem = (subscriptionOrderItem) => {
        setSubscriptionOrderItemSelected(subscriptionOrderItem);
        setModalAddress(true);
    };
    
    const selectedSubscriptionOrderItemDispatchDate = (subscriptionOrderItem) => {
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

    const columns = [
        {
            text: "NÚMERO DE PEDIDO",
            dataField: "pay_date",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                return row.order_id;
            }
        },
        {
            text: "TARJETA",
            dataField: "pay_date",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                return row.subscription.card_number;
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
                        onClick={() => selectedSubscriptionOrderItemDispatchDate(row)}
                        className="link pointer"
                        style={{ color: "#484848" }}
                    >
                        {moment(cell).format("DD/MM/YYYY")}
                    </span>
                );
            }
        },
        {
            text: "DIRECCIÓN",
            dataField: "subtotal",
            sort: true,
            classes: "",
            headerClasses: "",
            formatter: (cell, row) => {
                if(row.status != 'CREATED' && row.status != 'REJECTED'){
                    return  row.customer_address.address  + ' ' + row.customer_address.extra_info               
                }

                return (
                    <span
                        onClick={() => selectedSubscriptionOrderItem(row)}
                        className="link pointer"
                        style={{ color: "#484848" }}
                    >
                        {row.customer_address ? row.customer_address.address : ' '}{" "}
                        {row.customer_address ? row.customer_address.extra_info : ' '}
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
            text: 'TOTAL',
            dataField: 'total',
            sort: true,
            classes: '',
            headerClasses: '',
            formatter: (cell, row) => {
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
                                      <ListItem
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
                                          // setAddresses={setAddresses}
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

            <TablePanel
                objects={objects}
                columns={columns}
                tableLoaded={tableLoaded}
            />
        </>
    );
};

export default Table;
