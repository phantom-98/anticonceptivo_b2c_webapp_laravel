import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
// import {formatMoney} from "../../../../../functions";
import {formatMoney} from "../../../../../../helpers/GlobalUtils"
import ModalConfirm from "./ModalConfirm";
import toastr from "toastr";

const Resume = ({schedulesToBuy, priceHour, confirmHours}) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false)
    };
    const handleShowModal = () => {
        if (schedulesToBuy.length === 0) {
            toastr.warning('Seleccione horas')
            return null;
        }
        setShowModal(true)
    };

    return (
        <Fragment>
            <div className="row mt-4">
                <div className="col-auto font-14 pt-1">
                    <span className="text-primary bold">Total horas </span>
                    <span> {schedulesToBuy.length}</span>
                </div>
                <div className="col-auto font-14 pt-1">
                    <span className="text-primary bold">Total pago </span>
                    <span> 
                        {formatMoney(schedulesToBuy.length * priceHour)}
                    </span>
                </div>
                <div className="col text-right">
                    <button className="btn btn-primary btn-rounded btn-form" onClick={handleShowModal}>
                        <span className="font-12 regular">Confirmar</span>
                    </button>
                </div>
            </div>
            <ModalConfirm
                show={showModal}
                handleClose={handleCloseModal}
                confirmHours={confirmHours}
                priceHour={priceHour}
                schedulesToBuy={schedulesToBuy}
            />
        </Fragment>
    );
};

export default Resume;
