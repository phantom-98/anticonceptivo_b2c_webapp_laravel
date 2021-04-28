import React, {useContext} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import { Card } from "react-bootstrap";
import {NotifyContext} from "../../../../context/NotifyProvider";
import NotifyList from "../../../../components/Notify/NotifyList";


const Notifies = () => {

    const breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.NOTIFIES.path,
            name: PANEL_COMPANY_ROUTES.NOTIFIES.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_COMPANY_ROUTES.NOTIFIES.title}
            breadcrumbs={breadcrumbs}>
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
                                <NotifyList/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </BasePanel>
    );
};

export default Notifies;
