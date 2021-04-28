import React from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import CreateProjectForm from "../../../../../components/Projects/Create/CreateProjectForm";

const CreateProject = () => {

    const breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.PROJECTS.path,
            name: PANEL_COMPANY_ROUTES.PROJECTS.title
        },
        {
            url: PANEL_COMPANY_ROUTES.PROJECTS_CREATE.path,
            name: PANEL_COMPANY_ROUTES.PROJECTS_CREATE.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_COMPANY_ROUTES.PROJECTS_CREATE.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <CreateProjectForm />
                </div>
            </div>
        </BasePanel>
    );
};

export default CreateProject;
