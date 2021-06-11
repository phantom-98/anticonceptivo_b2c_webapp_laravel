import React from 'react';
import {Modal} from "react-bootstrap";
import { WaveTopBottomLoading } from 'react-loadingg';

const WaitingPayment = ({showingWaitingPayment}) => {

    return(
        <Modal show={showingWaitingPayment}
               centered
               backdrop="static"
               keyboard={false}
            //    onHide={hideWaitingPayment}
               dialogClassName="modal-waiting-payment">
            {/* <Modal.Header>
                <CloseModal hideModal={hideModalAuth} />
            </Modal.Header> */}
            <Modal.Body className="px-5 pb-0">
                <div className="row">
                     <div className="col-md-12 text-center mt-4">
                        <h3 className="modal-title">Procesando pago</h3>
                    </div> 
                    <div className="col-md-12 text-center font-poppins font-14 regular color-6C6B6B pt-2">
                        Espere un momento por favor ...
                    </div> 

                    <div className="col-md-12 my-5">
                        <WaveTopBottomLoading 
                            color={'#0869A6'}
                            speed={2}
                            size={'small'}
                        />
                    </div> 
                </div>

            </Modal.Body>

        </Modal>
    )
}

export default WaitingPayment