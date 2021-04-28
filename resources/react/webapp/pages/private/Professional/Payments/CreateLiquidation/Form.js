import React, {useContext, useEffect, useState} from 'react';

import {Card} from "react-bootstrap";
import {formatMoney} from "../../../../../helpers/GlobalUtils";
import * as Services from "../../../../../Services";
import toastr from 'toastr'
import {AuthContext} from "../../../../../context/AuthProvider";
import PANEL_PROFESSIONAL_ROUTES from "../../../../../routes/professionalRoutes";

const Form = ({selectedOrders}) => {

    const {auth} = useContext(AuthContext);

    const [total, setTotal] = useState(0)
    const [data, setData] = useState({
        sii_code: ''
    });

    useEffect(() => {
        let sum = 0
        if (selectedOrders.length) {
            selectedOrders.map(order => {
                sum = sum + (order.total_price_gross - order.commission_professional_total)
            })
        }
        setTotal(sum);
    }, [selectedOrders])

    const onChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const getOrdersIds = () => {
        let ids = [];
        selectedOrders.map(row => ids.push(row.id));
        return ids;
    }

    const createLiquidation = () => {

        if ((data.sii_code).trim().length === 0) {
            toastr.warning('Ingrese el Nº Folio SII')
            return null
        }

        if (selectedOrders.length === 0) {
            toastr.warning('Seleccione al menos un item')
            return null
        }

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PAYMENTS.CREATE_LIQUIDATION;
        let form = {
            ...data,
            professional_id : auth.professional_id,
            orders: getOrdersIds()
        }
        Services.DoPost(url, form)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success(response.message)
                        window.location.href = PANEL_PROFESSIONAL_ROUTES.PAYMENTS.path;
                    },
                    error: () => {
                        toastr.error(response.message)
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <Card>
            <Card.Body>
                <div className="row">
                    <div className="col-md-12">
                        <div className="font-14 medium text-primary ">Total del Mes</div>
                        <div className="font-30 regular color-3B3B3B lh-36">
                            {
                                formatMoney(total)
                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <hr/>
                    </div>
                    <div className="col-12">
                        <div className="font-10 medium text-primary ">
                            para poder realizar la solicitud debes proporcionar el <span className="bold">Folio asociado a la boleta en SII</span>
                        </div>
                    </div>
                    <div className="col-12 my-2">
                        <div className="form-group form-group-w2">
                            <input
                                type="text"
                                id="sii_code"
                                name="sii_code"
                                value={data.sii_code}
                                onChange={onChangeData}
                                className={`form-control form-control-w2 ${data.sii_code.length ? 'has-value' : ''}`}
                            />
                            <label htmlFor="name">Nº Folio SII</label>
                        </div>
                    </div>
                    <div className="col-12 text-center pt-2">
                        <button type="button" onClick={createLiquidation}
                                className="btn btn-form btn-primary btn-rounded px-4">
                            <span>Solicitar Pago</span>
                        </button>

                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Form;
