import React, {Fragment, useContext, useEffect, useState} from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../../routes/professionalRoutes";
import { Card } from "react-bootstrap";
import Table from "./Table";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import NotFound from "../../../../../components/NotFound";
import Resume from "./Resume";

const LiquidationDetail = ({match}) => {

    let urlLiquidation = PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_DETAILS.path;
    urlLiquidation = urlLiquidation.replace(':liquidation_id', match.params.liquidation_id);

    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.PAYMENTS.path,
            name: PANEL_PROFESSIONAL_ROUTES.PAYMENTS.title
        },
        {
            url: urlLiquidation,
            name: PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_DETAILS.title
        },
    ];

    const {auth} = useContext(AuthContext);

    const [tableLoaded, setTableLoaded] = useState(false);
    const [objects, setObjects] = useState([]);
    const [liquidation, setLiquidation] = useState();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (auth) {
            index();
        }
    }, [auth])

    const index = () => {
        const url = Services.ENDPOINT.PANEL.PROFESSIONAL.PAYMENTS.GET_LIQUIDATION_ORDERS
        Services.DoPost(url, {
            liquidation_id: match.params.liquidation_id,
            professional_id : auth.professional_id
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setLiquidation(response.data.liquidation)
                    setObjects(response.data.liquidation.orders)
                    setTableLoaded(true);
                },
                error: () => {
                    setNotFound(true)
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <BasePanel
            title={PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_DETAILS.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        {

                            notFound ?
                                <NotFound message="Detalle no encontrado."/>
                                :
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <Resume liquidation={liquidation} />
                                    </div>
                                    <div className="col-12">
                                        <Card>
                                            <Card.Body>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <Table objects={objects} tableLoaded={tableLoaded} />
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </BasePanel>
    );
};

export default LiquidationDetail;
