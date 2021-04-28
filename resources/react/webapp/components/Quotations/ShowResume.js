import React from 'react';

import {Card} from "react-bootstrap";
import moment from 'moment';
import {formatMoney} from "../../helpers/GlobalUtils";
import {formatQuotationStatus} from "../../helpers/HelperStatus";
import CalculateResumen from "./CalculateResumen";

const ShowResume = ({quotation, commissions}) => {
    return (
        <Card>
            <Card.Body>
                <div className="row">
                    <div className="col-12">
                        <h2 className="font-signika font-20 bold text-secondary mb-4">
                            Resumen
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <div className="row">
                            <div className="col">
                                <h3 className="font-signika font-16 bold text-primary mb-1">Estado</h3>
                            </div>
                            <div className="col-auto">
                                <div className="font-14 light color-3C3C3E">
                                    {
                                        formatQuotationStatus(quotation.status)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3 className="font-signika font-16 bold text-primary mb-1">Creada</h3>
                            </div>
                            <div className="col-auto">
                                <div className="font-14 light color-3C3C3E">
                                    {
                                        moment(quotation.created_at).format('DD/MM/YYYY HH:mm:ss')
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3 className="font-signika font-16 bold text-primary mb-1">Total Horas</h3>
                            </div>
                            <div className="col-auto">
                                <div className="font-14 light color-3C3C3E">
                                    {
                                        quotation.total_minutes ? quotation.total_minutes / 60 : 0
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3 className="font-signika font-16 bold text-primary mb-1">Total Precio</h3>
                            </div>
                            <div className="col-auto">
                                <div className="font-14 light color-3C3C3E">
                                    {
                                        formatMoney(quotation.total_price)
                                    }
                                </div>
                            </div>
                        </div>

                        <CalculateResumen commissions={commissions} totalPrice={quotation.total_price} />

                    </div>

                </div>
            </Card.Body>
        </Card>
    );
};

export default ShowResume;
