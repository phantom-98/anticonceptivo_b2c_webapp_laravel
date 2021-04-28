import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import {Modal} from "react-bootstrap";
import moment from 'moment';

import toastr from "toastr";
import {formatMoney} from "../../../../../../helpers/GlobalUtils";

const ModalConfirm = ({show, handleClose, confirmHours, schedulesToBuy, priceHour}) => {

    const [checked, setChecked] = useState(false)

    const handleConfirmHours = () =>{

        if (!checked) {
            toastr.warning('Por favor, acepte los términos y condiciones.')
            return null;
        }

        confirmHours();
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            contentClassName="modal-custom"
            dialogClassName="modal-725"
        >
            <Modal.Body>
                <div className="row">
                    <div className="col-auto ml-auto pointer">
                        <img onClick={handleClose} src="/themes/web/assets/images/icons/close-modal.svg"
                             rel="nofollow"/>
                    </div>
                </div>
                <div className="px-3">
                    <div className="py-3 px-5">
                        <div className="row pb-3">
                            <div className="col-12">
                                <h3 className="font-18 bold text-primary">Horas seleccionadas</h3>
                                <div className="table-confirm-hours">
                                    <table className="table react-bootstrap-table">
                                        <thead>
                                        <tr style={{border: '1px solid #D6D6D6'}}>
                                            <th className="text-primary py-1">
                                                Fecha
                                            </th>
                                            <th className="text-primary py-1">
                                                Horas
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            schedulesToBuy.map((schedule, index) => {
                                                return <tr key={index}>
                                                    <td className="font-12 light py-1">
                                                        {moment(schedule.start).format('DD/MM/YYYY')}
                                                    </td>
                                                    <td className="font-12 light py-1">
                                                        <span className="badge-hour">{moment(schedule.start).format('HH:mm')} - {moment(schedule.start).add(1, 'hour').format('HH:mm')}</span>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="row pb-3">
                            <div className="col-6 font-14">
                                <span className="text-primary bold">Total horas </span>
                                <span> {schedulesToBuy.length}</span>
                            </div>
                            <div className="col-6 font-14 text-right">
                                <span className="text-primary bold">Total pago </span>
                                <span> {
                                    formatMoney(schedulesToBuy.length * priceHour)
                                }</span>
                            </div>
                        </div>

                        <div className="row pb-3">
                            <div className="col-12">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="accepts" checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
                                    <label className="custom-control-label font-12 lh-23 light" htmlFor="accepts">
                                        Acepto los <a href="#" target="_blank">Términos y condiciones</a> y la <a
                                        href="#" target="_blank">política de privacidad</a>.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-3">
                            <div className="col-12 text-right">
                                <button className="btn btn-primary btn-rounded btn-form" onClick={handleConfirmHours}>
                                    <span className="font-12 regular">Asignar Tarea(s)</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalConfirm;
