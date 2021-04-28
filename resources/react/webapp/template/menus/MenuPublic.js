import React, {useContext} from 'react';

import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {AuthContext} from "../../context/AuthProvider";
import { Link as ReactScroll, animateScroll as scroll } from "react-scroll";


const MenuPublic = () => {

    const {auth} = useContext(AuthContext);

    return (
        <ul className="nav main-nav">
            <li className="nav-item">
                <Link
                    to={PUBLIC_ROUTES.HOME.path}
                    className="font-12 regular nav-link">
                    Inicio
                </Link>
            </li>
            <li className="nav-item">
                <ReactScroll
                    activeClass="active"
                    to="howItWorks"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration={500}
                    className="font-12 regular nav-link">
                    Cómo Funciona
                </ReactScroll>
                
            </li>
            <li className="nav-item">
                <ReactScroll
                    activeClass="active"
                    to="forCompany"
                    spy={true}
                    smooth={true}
                    offset={90}
                    duration={500}
                    className="font-12 regular nav-link">
                    Empresas
                </ReactScroll>
            </li>
            <li className="nav-item">
                <ReactScroll
                    activeClass="active"
                    to="testimonials"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="font-12 regular nav-link">
                    Testimonios
                </ReactScroll>
            </li>
            {/*<li className="nav-item">*/}
            {/*    <Link*/}
            {/*        to="#"*/}
            {/*        className="font-12 regular nav-link">*/}
            {/*        Profesionales*/}
            {/*    </Link>*/}
            {/*</li>*/}
            {
                !auth ?  <li className="nav-item">
                    <Link
                        to={PUBLIC_ROUTES.CONTACT.path}
                        className="font-12 regular nav-link">
                        Contáctanos
                    </Link>
                </li> : null
            }
        </ul>
    );
};

export default MenuPublic;

