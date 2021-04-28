import React from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import { Card } from "react-bootstrap";
import Schedules from "./Schedules";

const Schedule = () => {

    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.SCHEDULES.path,
            name: PANEL_PROFESSIONAL_ROUTES.SCHEDULES.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_PROFESSIONAL_ROUTES.SCHEDULES.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <Schedules />
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

export default Schedule;
