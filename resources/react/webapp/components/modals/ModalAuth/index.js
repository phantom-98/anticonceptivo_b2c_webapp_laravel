import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import {AppContext} from "../../../context/AppProvider";
import Login from "./Login";
import {ModalAuthMode} from "../../../Globals";
import RecoveryPassword from "./RecoveryPassword";
import SetNewPassword from "./SetNewPassword";
import Register from "./Register";

const ModalAuth = () => {

    const {showingModalAuth, modalAuthType, hideModalAuth} = useContext(AppContext)

    const handleView = () => {
        switch (modalAuthType) {

            case ModalAuthMode.REGISTER:
                return <Register/>

            case ModalAuthMode.RECOVERY_PASSWORD:
                return <RecoveryPassword/>

            case ModalAuthMode.SET_NEW_PASSWORD:
                return <SetNewPassword/>

            case ModalAuthMode.LOGIN:
            default:
                return <Login/>
        }
    }

    return (
        <Modal show={showingModalAuth}
               centered
               backdrop="static"
               keyboard={false}
               onHide={() => hideModalAuth()}
               dialogClassName="CLASS-PENDIENTE">
            <Modal.Body>
                <div className="row">
                    <div className="col text-right">
                        <span onClick={hideModalAuth}>X</span>
                    </div>
                </div>
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
