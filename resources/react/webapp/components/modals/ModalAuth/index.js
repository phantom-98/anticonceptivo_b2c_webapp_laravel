import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import {AppContext} from "../../../context/AppProvider";
import Login from "./Login";
import {ModalAuthMode} from "../../../Globals";
import RecoveryPassword from "./RecoveryPassword";
import SetNewPassword from "./SetNewPassword";
import Register from "./Register";
import CloseModal from "../../general/CloseModal";

const ModalAuth = () => {

    const {showingModalAuth, modalAuthType, hideModalAuth} = useContext(AppContext)

    const handleView = () => {
        switch (modalAuthType) {
            case ModalAuthMode.LOGIN:
                return <Login/>

            case ModalAuthMode.REGISTER:
                return <Register/>

            case ModalAuthMode.RECOVERY_PASSWORD:
                return <RecoveryPassword/>

            case ModalAuthMode.SET_NEW_PASSWORD:
                return <SetNewPassword/>

            default:
                return showingModalAuth ? <Login/> : null
        }
    }

    return (
        <Modal show={showingModalAuth}
               centered
               backdrop="static"
               keyboard={false}
               onHide={hideModalAuth}
               dialogClassName="modal-auth">
            <Modal.Header>
                <CloseModal hideModal={hideModalAuth} />
            </Modal.Header>
            <Modal.Body className="px-5">

                <div className="row">
                    <div className="col-12">
                        {
                            handleView()
                        }
                    </div>
                </div>

            </Modal.Body>

        </Modal>
    );
};

export default ModalAuth
