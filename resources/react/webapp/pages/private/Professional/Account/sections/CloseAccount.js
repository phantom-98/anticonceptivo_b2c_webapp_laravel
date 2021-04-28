import React, {useEffect, useState, useContext} from 'react';

import toastr from "toastr";
import {setCleanInputError, setInputError} from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import { AuthContext } from "../../../../../context/AuthProvider";
import {Modal} from "react-bootstrap";

const CloseAccount = ({professionalId}) => {

    const { updateAuth } = useContext(AuthContext);

    const [dataForm, setDataForm] = useState({
        close_account_motive: 'OTROS',
        close_account_description: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    useEffect(() => {
        if (professionalId) {
            setDataForm({
                ...dataForm,
                professional_id: professionalId
            })
        }
    }, [professionalId])

    const handleDataForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const store = () => {
        Services.DoPost(Services.ENDPOINT.PANEL.PROFESSIONAL.ACCOUNT.CLOSE_ACCOUNT, dataForm).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message);
                    updateAuth(response.data.auth);
                },
                error: () => {
                    toastr.error(response.message);
                },
            });
            handleCloseModal()
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="px-5">

            <div className="row">
                <div className="col-md-6 offset-3">
                    <h3 className="font-24 bold text-primary">¿Estás seguro que deseas cerrar tu cuenta?</h3>
                    <p className="font-14 light color-3C3C3E py-3">
                        Si cierras tu cuenta con Ikiru no podrás ingresar al sitio, ni podrás tampoco recibir
                        comunicación alguna. El cerrar tu cuenta significará que todos los objetivos de los que formas
                        parte (ya sea que hayas creado, o en los que hayas participado) se volverán inaccesibles.
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 offset-3">
                    <div className="form-group">
                        <select
                            className="form-control form-control-custom"
                            placeholder="Motivo del cierre"
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="close_account_motive"
                            name="close_account_motive"
                            value={dataForm.close_account_motive}
                        >
                            <option value="OTROS">OTROS</option>
                        </select>
                        <div className="invalid-feedback"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-3">
                    <div className="form-group form-group-w2">
                        <textarea
                            rows="4"
                            className={`form-control form-control-w2 ${
                                dataForm.close_account_description &&
                                dataForm.close_account_description.length
                                    ? "has-value"
                                    : ""
                            }`}
                            onChange={handleDataForm}
                            onFocus={setCleanInputError}
                            id="close_account_description"
                            name="close_account_description"
                            value={dataForm.close_account_description}
                        />
                        <label htmlFor="name">Comentario</label>
                        <div className="invalid-feedback"/>
                    </div>
                </div>
            </div>

            <div className="row pt-4">
                <div className="col-md-6 offset-3">
                    <div className="form-group text-center">
                        <button className="btn btn-primary btn-rounded btn-form" onClick={handleShowModal}>
                            <span className="font-12 regular">Si, Cerrar Cuenta</span>
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
                contentClassName="modal-custom"
                dialogClassName="modal-725"
            >
                <Modal.Body>
                    <div className="row">
                        <div className="col-auto ml-auto pointer">
                            <img onClick={handleCloseModal} src="/themes/web/assets/images/icons/close-modal.svg"
                                 rel="nofollow"/>
                        </div>
                    </div>
                    <div className="pt-4 pb-5">
                        <div className="row">
                            <div className="col-12 text-center pb-3">
                                <h3 className="font-24 bold text-primary">¿Deseas suspender cuenta?</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-right">
                                <button className="btn btn-outline-dark btn-rounded btn-form"
                                        onClick={handleCloseModal}>
                                    <span className="font-12 regular">CANCELAR</span>
                                </button>
                            </div>
                            <div className="col-6 text-left">
                                <button className="btn btn-primary btn-rounded btn-form" onClick={store}>
                                    <span className="font-12 regular">SI</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default CloseAccount;
