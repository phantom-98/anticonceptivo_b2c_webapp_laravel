import React from 'react';
import {Card} from "react-bootstrap";
import moment from "moment";
import {formatMoney, formatNumber} from "../../../../../helpers/GlobalUtils";
import {formatPaymentStatus, formatProjectStatus} from "../../../../../helpers/HelperStatus";

const Resume = ({order}) => {
    return (
        <Card>
            <Card.Body>
                <div className="col-12">
                    <h2 className="font-signika font-20 bold text-secondary mb-4">
                        Datos de la orden
                    </h2>
                </div>
                <div className="col-12 mb-3">
                    <div className="row">
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Order Nº
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {order.id}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Fecha
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {moment(order.data).format('DD-MM-YYYY')}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Total Horas
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {formatNumber(order.total_minutes / 60)}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Total Base
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {formatMoney(order.total_price_gross)}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Comisión ({parseInt(order.commission_company_percentage * 100)}%)
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {formatMoney(order.commission_company_total)}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Total a Pagar
                            </h3>
                            <div className="font-14 bold color-3C3C3E">
                                {formatMoney(order.total_price)}
                            </div>
                        </div>
                        <div className="col">
                            <h3 className="font-signika font-16 bold text-primary mb-1">
                                Estado
                            </h3>
                            <div className="font-14 light color-3C3C3E">
                                {formatPaymentStatus(order.status)}
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Resume;
