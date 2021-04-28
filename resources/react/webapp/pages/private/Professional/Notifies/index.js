import React, {useContext} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import {Card} from "react-bootstrap";
import {NotifyContext} from "../../../../context/NotifyProvider";
import NotifyList from "../../../../components/Notify/NotifyList";


const Notifies = () => {

    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.NOTIFIES.path,
            name: PANEL_PROFESSIONAL_ROUTES.NOTIFIES.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_PROFESSIONAL_ROUTES.NOTIFIES.title}
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
