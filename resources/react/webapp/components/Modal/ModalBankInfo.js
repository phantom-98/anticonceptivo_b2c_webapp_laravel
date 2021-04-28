import React, {useContext, useState} from 'react';
import {Modal} from "react-bootstrap";
import BankInfo from "../../pages/private/Company/Account/sections/BankInfo";
import { AuthContext } from "../../context/AuthProvider";

const ModalBankInfo = ({show, closeModal}) => {

    const {auth} = useContext(AuthContext);

    return (
        <Modal
            show={show}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
            centered
            contentClassName="modal-custom"
            dialogClassName="modal-725"
        >
            <Modal.Title>
                <div className="col-md-12 text-center mt-4 mb-3">
                    <span className="font-signika font-24 bold text-primary">Datos de Facturación</span>
                </div>
            </Modal.Title>
            <Modal.Body>
                <BankInfo
                    company={auth.company}
                    closeModal={closeModal}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ModalBankInfo;
