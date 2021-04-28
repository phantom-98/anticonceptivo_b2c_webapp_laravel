import React, {useState} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import {Card} from "react-bootstrap";
import {AuthContext} from "../../../../context/AuthProvider";
import Table from "./Table";
import {Link} from "react-router-dom";

const Projects = () => {

    const breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.PROJECTS.path,
            name: PANEL_COMPANY_ROUTES.PROJECTS.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_COMPANY_ROUTES.PROJECTS.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">

                <div className="col-12">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <Link to={PANEL_COMPANY_ROUTES.PROJECTS_CREATE.path}
                                              className="btn btn-primary btn-rounded btn-form">
                                            <span className="font-12 regular">
                                                <i className="fa fa-plus"/> Crear Objetivo
                                            </span>
                                        </Link>
                                    </div>
                                </div>
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
