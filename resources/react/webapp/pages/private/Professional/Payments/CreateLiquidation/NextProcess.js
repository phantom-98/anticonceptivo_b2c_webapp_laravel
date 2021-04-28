import React from 'react';
import {Card} from "react-bootstrap";
import moment from "moment";

const NextProcess = ({payDate}) => {
    return (
        <Card>
            <Card.Body>
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-primary mb-0">
                            <div className="font-14 light">
                                Próximo cierre de pago automático es el <b className="bold">{moment(payDate).format('DD-MM-YYYY')}</b>, recuerda que para que este pago sea procesado debes subir el
                                documento tributario por el total del monto.
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default NextProcess;

