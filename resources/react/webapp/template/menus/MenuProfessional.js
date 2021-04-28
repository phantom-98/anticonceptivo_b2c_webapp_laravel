import React from 'react';

import {Link} from "react-router-dom";

import PANEL_PROFESSIONAL_ROUTES from "../../routes/professionalRoutes";

const MenuProfessional = () => {
    return (
        <ul className="nav main-nav">
            <li className="nav-item">
                <Link
                    to={PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path}
                    className="font-12 regular nav-link">
                    {PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title}
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to={PANEL_PROFESSIONAL_ROUTES.SCHEDULES.path}
                    className="font-12 regular nav-link">
                    {PANEL_PROFESSIONAL_ROUTES.SCHEDULES.title}
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    to={PANEL_PROFESSIONAL_ROUTES.PROJECTS.path}
                    className="font-12 regular nav-link">
                    {PANEL_PROFESSIONAL_ROUTES.PROJECTS.title}
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    to={PANEL_PROFESSIONAL_ROUTES.QUOTATIONS.path}
                    className="font-12 regular nav-link">
                    {PANEL_PROFESSIONAL_ROUTES.QUOTATIONS.title}
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    to={PANEL_PROFESSIONAL_ROUTES.PAYMENTS.path}
                    className="font-12 regular nav-link">
                    {PANEL_PROFESSIONAL_ROUTES.PAYMENTS.title}
                </Link>
            </li>
            {/*<li className="nav-item">*/}
            {/*    <Link*/}
            {/*        to={PANEL_PROFESSIONAL_ROUTES.NEXT_PAYMENTS.path}*/}
            {/*        className="font-12 regular nav-link">*/}
            {/*        {PANEL_PROFESSIONAL_ROUTES.NEXT_PAYMENTS.title}*/}
            {/*    </Link>*/}
            {/*</li>*/}
        </ul>
    );
};

export default MenuProfessional;
