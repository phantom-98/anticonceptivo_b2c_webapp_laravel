import React from 'react';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";


const MenuNoLogged = () => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item d-flex">
                <Link
                    to={PUBLIC_ROUTES.LOGIN.path}
                    className="font-12 regular nav-link my-auto">
                    Acceder
                </Link>
            </li>
            <li className="nav-item d-flex">
                <Link
                    to={PUBLIC_ROUTES.REGISTER.path}
                    className="font-12 regular nav-link my-auto">
                    Registrar
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="#"
                    className="nav-link">
                    <img
                        style={{marginTop: '-3px'}}
                        src="/themes/web/assets/images/header/search.svg"
                        rel="nofollow"
                    />
                </Link>
            </li>
        </ul>
    );
};

export default MenuNoLogged;
