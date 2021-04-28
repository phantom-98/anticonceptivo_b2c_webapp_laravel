import React from 'react';

import {Link} from "react-router-dom";
import PANEL_COMPANY_ROUTES from "../../routes/companyRoutes";

const MenuCompany = () => {
    return (
        <ul className="nav main-nav">
            {/* <li className="nav-item">
                <Link
                    to={PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_INFO.path}
                    className="font-12 regular nav-link">
                    {PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_INFO.title}
                </Link>
            </li> */}
            <li className="nav-item">
                <Link
                    to={PANEL_COMPANY_ROUTES.DASHBOARD.path}
                    className="font-12 regular nav-link"
                >
                    {PANEL_COMPANY_ROUTES.DASHBOARD.title}
                </Link>
            </li>
            {/*<li className="nav-item">*/}
            {/*    <Link*/}
            {/*        to={PANEL_COMPANY_ROUTES.PROFESSIONAL_LIST.path}*/}
            {/*        className="font-12 regular nav-link"*/}
            {/*    >*/}
            {/*        {PANEL_COMPANY_ROUTES.PROFESSIONAL_LIST.title}*/}
            {/*    </Link>*/}
            {/*</li>*/}
            <li className="nav-item">
                <Link
                    to={PANEL_COMPANY_ROUTES.PROJECTS.path}
                    className="font-12 regular nav-link"
                >
                    {PANEL_COMPANY_ROUTES.PROJECTS.title}
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to={PANEL_COMPANY_ROUTES.QUOTATIONS.path}
                    className="font-12 regular nav-link"
                >
                    {PANEL_COMPANY_ROUTES.QUOTATIONS.title}
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to={PANEL_COMPANY_ROUTES.PAYMENTS.path}
                    className="font-12 regular nav-link"
                >
                    {PANEL_COMPANY_ROUTES.PAYMENTS.title}
                </Link>
            </li>

        </ul>
    );
};

export default MenuCompany;
