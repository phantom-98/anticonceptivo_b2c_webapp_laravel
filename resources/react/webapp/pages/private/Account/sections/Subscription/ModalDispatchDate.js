import React from "react";
import moment from "moment";
import * as Services from "../../../../../Services";
import {Modal} from "react-bootstrap";
import CloseModal from "../../../../../components/general/CloseModal";
import Swal from "sweetalert2";
import toastr from "toastr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';

registerLocale('es', es)

const ModalDispatchDate = ({
    modals,
    subscriptionOrderItemSelected,
    dispatchDate,
    setDispatchDate,
    minDate,
    auth,
    getSubscriptions,
    getDataAddress,
    changeVisibleModalDispatchDate
}) => {

    const updateDispatchDate = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_DISPATCH_DATE_SUBSCRIPTION;
        let data = {
            customer_id: auth.id,
            subscription_order_item_id: subscriptionOrderItemSelected ? subscriptionOrderItemSelected.id : 0,
            dispatch_date: moment(dispatchDate).format('YYYY-MM-DD')
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
                                    changeVisibleModalDispatchDate();
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

    return (
        <Modal
            show={modals.dispatch_date}
            centered
            backdrop="static"
            keyboard={false}
            onHide={modals.dispatch_date}
        >
            <Modal.Header>
                <CloseModal hideModal={changeVisibleModalDispatchDate}/>
            </Modal.Header>
            <Modal.Body className="px-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="modal-title text-center lh-34">
                            Cambiar fecha de despacho
                        </h3>
                    </div>
                    <div className="col-12 mt-3 text-center">

                        {
                            dispatchDate ?
                                <DatePicker
                                    className={"form-control"}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={minDate}
                                    locale="es"
                                    name='dispatchDate'
                                    selected={new Date(dispatchDate)}
                                    onChange={(date) => setDispatchDate(date)}
                                /> : null
                        }
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
        </Modal>)

};

export default ModalDispatchDate;

