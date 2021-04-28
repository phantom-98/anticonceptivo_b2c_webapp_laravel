import React from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import {Card} from "react-bootstrap";
import Table from "./Table";
import {Link} from "react-router-dom";

const Projects = () => {

    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.PROJECTS.path,
            name: PANEL_PROFESSIONAL_ROUTES.PROJECTS.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_PROFESSIONAL_ROUTES.PROJECTS.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <Table/>
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

export default Projects;
