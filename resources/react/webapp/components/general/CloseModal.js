import React from 'react';
import Icon from "./Icon";
import closeModal from "../../assets/images/icons/close-modal.svg";

const CloseModal = ({hideModal}) => {
    return (
        <div className="row">
            <div className="col text-right">
                <span className="pointer" onClick={hideModal}><Icon path={closeModal}/></span>
            </div>
        </div>
    );
};

export default CloseModal
