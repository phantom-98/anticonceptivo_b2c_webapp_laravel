import React, { useContext } from 'react';
import {AppContext} from "../../../context/AppProvider";
import Icon from "../../general/Icon";
import checkmark from '../../../assets/images/icons/checkmark-circle.svg';
import {Modal} from "react-bootstrap";
import CloseModal from "../../general/CloseModal";

const PasswordSuccess = () => {

    const {showingModalPasswordUpdate, hideModalPasswordSuccess} = useContext(AppContext)

    return (
        <Modal show={showingModalPasswordUpdate}
               centered
               backdrop="static"
               keyboard={false}
               onHide={hideModalPasswordSuccess}
               dialogClassName="modal-success">
            <Modal.Header>
                <CloseModal hideModal={hideModalPasswordSuccess} />
            </Modal.Header>
            <Modal.Body className="px-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <div className="font-poppins font-14 regular color-6C6B6B mb-3">
                                                <Icon path={checkmark}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <div className="font-poppins font-14 regular color-6C6B6B mb-3">
                                                Tu contraseña fue modificada exitosamente<br/>ahora puedes seguir haciendo tus compras.
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>

                            {/* <div className="col-md-12 py-2 text-center">
                                <button type="button" className="btn btn-bicolor btn-block btn-auth" onClick={() => hideModalAuthSuccess()}>
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

export default PasswordSuccess;
