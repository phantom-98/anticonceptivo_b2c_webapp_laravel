import React from "react";
import Icon from "./Icon";
import closeModal from "../../assets/images/icons/header/close-modal.svg";

const CloseModal = ({ hideModal }) => {
    return (
        <div className="row">
            <div className="col text-right">
                <span className="pointer" onClick={hideModal}>
                    <Icon
                        path={closeModal}
                        style={{ width: "100%", height: "100%" }}
                    />
                </span>
            </div>
        </div>
    );
};

export default CloseModal;
