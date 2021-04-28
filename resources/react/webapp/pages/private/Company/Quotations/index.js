import React from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import {Card} from "react-bootstrap";
import Table from "./Table";
import {Link} from "react-router-dom";

const Quotations = () => {

    const breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.QUOTATIONS.path,
            name: PANEL_COMPANY_ROUTES.QUOTATIONS.title
        }
    ];

    return (
        <BasePanel
            title={PANEL_COMPANY_ROUTES.QUOTATIONS.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <Card>
                            <Card.Body>
                                {/*<div className="row">*/}
                                {/*    <div className="col-md-12 mb-3">*/}
                                {/*        <Link to={PANEL_COMPANY_ROUTES.QUOTATIONS_CREATE.path}*/}
                                {/*              className="btn btn-primary btn-rounded btn-form">*/}
                                {/*            <span className="font-12 regular">*/}
                                {/*                <i className="fa fa-plus"/> Crear Objetivo*/}
                                {/*            </span>*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
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

export default Quotations;
