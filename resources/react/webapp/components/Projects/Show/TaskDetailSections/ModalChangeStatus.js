import React, {Fragment, useContext, useState} from 'react';
import {Modal} from "react-bootstrap";
import * as Services from "../../../../Services";
import toastr from 'toastr';
import {AuthContext} from "../../../../context/AuthProvider";
import {AuthType} from "../../../../Globals";

const ModalChangeStatus = ({show, handleClose, projectStatus, taskId, getProject}) => {

    const {authType} = useContext(AuthContext);

    const changeStatus = (status) => {

        if (status == '') {
            toastr.warning('Acción no permitida.')
            handleClose()
            return null
        }

        if (projectStatus == 'APPROVED') {
            toastr.warning('Los estados ya no pueden ser actualizados.')
            handleClose()
            return null
        }

        let url = Services.ENDPOINT.PANEL.COMMON.PROJECT_STATUS.CHANGE_STATUS;
        let data = {
            task_id: taskId,
            status: status
        }

        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success(response.message)
                        getProject()
                        handleClose()
                    },
                    error: () => {
                        toastr.error(response.message)
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            // size="sm"
            contentClassName="modal-custom"
        >
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <h3 className="font-signika font-24 bold text-primary">
                            Cambiar Estado
                        </h3>
                    </div>
                    <div className="col-auto ml-auto pointer">
                        <img onClick={handleClose} src="/themes/web/assets/images/icons/close-modal.svg"
                             rel="nofollow"/>
                    </div>
                </div>
                <div className="row py-3">
                    {
                        authType == AuthType.PROFESSIONAL ?
                            <Fragment>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-info btn-block"
                                        onClick={() => changeStatus('TODO')}>
                                        <div>PENDIENTE</div>
                                    </button>
                                </div>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-info btn-block"
                                        onClick={() => changeStatus('DOING')}>
                                        <div>EN PROGRESO</div>
                                    </button>
                                </div>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-warning btn-block"
                                        onClick={() => changeStatus('PAUSED')}>
                                        <div>PAUSADA</div>
                                    </button>
                                </div>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-success btn-block"
                                        onClick={() => changeStatus('DONE')}>
                                        <div>REALIZADA</div>
                                    </button>
                                </div>
                            </Fragment>:
                            <Fragment>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-info btn-block"
                                        onClick={() => changeStatus('IN_REVISION')}>
                                        <div>EN REVISIÓN</div>
                                    </button>
                                </div>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-success btn-block"
                                        onClick={() => changeStatus('APPROVED')}>
                                        <div>APROBADA</div>
                                    </button>
                                </div>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-block"
                                        onClick={() => changeStatus('REJECTED')}>
                                        <div>RECHAZADO</div>
                                    </button>
                                </div>
                                <div className="col-6 py-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-warning btn-block"
                                        onClick={() => changeStatus('NEED_FIX')}>
                                        <div>NECESITA CORRECCIÓN</div>
                                    </button>
                                </div>
                            </Fragment>

                    }
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalChangeStatus;
