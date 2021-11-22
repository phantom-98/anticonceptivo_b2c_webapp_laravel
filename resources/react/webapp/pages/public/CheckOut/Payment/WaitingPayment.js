import React from 'react';
import {Modal} from "react-bootstrap";
import { WaveTopBottomLoading } from 'react-loadingg';
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import {Link} from "react-router-dom";

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
                        <h3 className="modal-title">Proceso de pago</h3>
                    </div>
                    <div className="col-md-12 text-center font-poppins font-14 regular color-6C6B6B pt-2">
                        Por favor pagar en ventana emergente de webpay, usted retornará al sitio web una vez el pago sea validado.
                        <br/>
                        Si tiene mas consulta haga click <Link target="_blank" style={{fontWeight: 500}} to={PUBLIC_ROUTES.FAQ.path}>aquí</Link>
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
