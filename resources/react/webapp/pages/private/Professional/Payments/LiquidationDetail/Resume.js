import React from 'react';
import {Card} from "react-bootstrap";
import moment from "moment";
import {formatMoney, formatNumber} from "../../../../../helpers/GlobalUtils";

const Resume = ({liquidation}) => {

    if(!liquidation) return null;
    return (
        <Card>
            <Card.Body>
                <div className="col-12">
                    <h2 className="font-signika font-20 bold text-secondary mb-4">
                        Datos de la Solicitud
                    </h2>
                </div>
                <div className="col-12 mb-3">
                    <div className="row">
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Nº
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {liquidation.id}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Nº Folio SII
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {liquidation.sii_code}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Desde
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {moment(liquidation.period_start).format('DD-MM-YYYY')}
                            </div>
                        </div>

                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Hasta
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {moment(liquidation.period_end).format('DD-MM-YYYY')}
                            </div>
                        </div>

                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Total
                            </h3>
                            <div className="font-14 bold color-3C3C3E">
                                {formatMoney(liquidation.total)}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Estado
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {
                                    liquidation.is_paid ?
                                        <span className="badge badge-success">PAGADA</span>
                                        :
                                        <span className="badge badge-warning">PENDIENTE</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Resume;
