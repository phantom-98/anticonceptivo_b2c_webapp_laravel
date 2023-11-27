import React from 'react';

import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";

const MenuPublic = () => {

    return (
        <ul className="nav main-nav">
            <li className="nav-item">
                <Link
                    to={PUBLIC_ROUTES.HOME.path}
                    className="font-12 regular nav-link">
                    Inicio
                </Link>
            </li>
        </ul>
    );
};

export default MenuPublic;

