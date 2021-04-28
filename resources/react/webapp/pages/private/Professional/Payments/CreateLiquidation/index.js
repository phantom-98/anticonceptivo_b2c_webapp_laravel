import React, {useContext, useEffect, useState} from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../../routes/professionalRoutes";
import {Card} from "react-bootstrap";
import Table from "./Table";
import NextProcess from "./NextProcess";
import Form from "./Form";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";

const CreateLiquidation = () => {

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
            url: PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_CREATE.path,
            name: PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_CREATE.title
        }
    ];

    const {auth} = useContext(AuthContext);

    const [tableLoaded, setTableLoaded] = useState(false);
    const [objects, setObjects] = useState([]);

    const [selectedOrders, setSelectedOrders] = useState([]);
    const [payDate, setPayDate] = useState('');

    useEffect(() => {
        if (auth) {
            getPendingOrders();
        }
    }, [auth])

    const getPendingOrders = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PAYMENTS.GET_PENDING_ORDERS;
        let professional_id = auth.professional_id;

        Services.DoPost(url, {professional_id}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setObjects(response.data.orders)
                    setPayDate(response.data.pay_date)
                    setTableLoaded(true);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    return (
        <BasePanel
            title={PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_CREATE.title}
            breadcrumbs={breadcrumbs}>

            <div className="row">

                <div className="col-12">
                    <div className="mb-3">
                        <NextProcess payDate={payDate}/>
                    </div>
                </div>

                <div className="col-8">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <Table objects={objects}
                                               tableLoaded={tableLoaded}
                                               selectedOrders={selectedOrders}
                                               setSelectedOrders={setSelectedOrders}/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="col-4">
                    <div className="mb-3">
                        <Form selectedOrders={selectedOrders}/>
                    </div>
                </div>
            </div>
        </BasePanel>
    );
};

export default CreateLiquidation;
