import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

const ModalPaymentTerms = ({show, handleClose}) => {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            contentClassName="modal-custom"
            dialogClassName="modal-963"
        >
            <Modal.Body>
                <div className="row">
                    <div className="col-auto ml-auto pointer">
                        <img onClick={handleClose} src="/themes/web/assets/images/icons/close-modal.svg"
                             rel="nofollow"/>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    );
};

export default ModalPaymentTerms;
