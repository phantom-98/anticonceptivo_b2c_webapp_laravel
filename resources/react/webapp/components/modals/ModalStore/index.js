import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import Icon from "../../general/Icon";
import CloseModal from "../../general/CloseModal";
import checkmark from "../../../assets/images/icons/checkmark-circle.svg";
import { SpinnerBorderPrimary } from "../../LoaderBoostrap";
import { AppContext } from "../../../context/AppProvider";

const ModalStore = () => {
    const { showingModalStoreChange } = useContext(AppContext);
    return (
        <Modal
            show={showingModalStoreChange}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-success"
        >
            <Modal.Body className="px-5 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="row">
                                    <div className="col-md-12 py-2 text-center">
                                        <div className="form-group">
                                            <h3 className="font-poppins font-14 regular color-6C6B6B mb-3 text-center">
                                                Cambiando Especialidad <br />
                                                espere mientras ajustamos todo
                                                para usted.
                                                <SpinnerBorderPrimary
                                                    big={true}
                                                />
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="col-md-12 py-2 text-center">
                                <button
                                    type="button"
                                    className="btn btn-bicolor btn-block btn-auth"
                                    onClick={() => placeholder}
                                >
                                    <span>VOLVER AL INICIO</span>
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalStore;
