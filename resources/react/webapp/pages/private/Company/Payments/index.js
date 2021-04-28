import React, {useContext} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import { Card } from "react-bootstrap";
import Table from "./Table";

const Payments = () => {

    const breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.PAYMENTS.path,
            name: PANEL_COMPANY_ROUTES.PAYMENTS.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_COMPANY_ROUTES.PAYMENTS.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
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
