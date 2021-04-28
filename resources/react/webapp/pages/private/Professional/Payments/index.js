import React from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import { Card } from "react-bootstrap";
import Table from "./Table";
import {Link} from "react-router-dom";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";

const Payments = () => {

    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.PAYMENTS.path,
            name: PANEL_PROFESSIONAL_ROUTES.PAYMENTS.title
        },
    ];

    return (
        <BasePanel
            title={PANEL_PROFESSIONAL_ROUTES.PAYMENTS.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <Link to={PANEL_PROFESSIONAL_ROUTES.LIQUIDATIONS_CREATE.path}
                                              className="btn btn-primary btn-rounded btn-form">
                                            <span className="font-12 regular">
                                                <i className="fa fa-plus"/> Solicitar Pagos
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Table />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </BasePanel>
    );
};

export default Payments;
