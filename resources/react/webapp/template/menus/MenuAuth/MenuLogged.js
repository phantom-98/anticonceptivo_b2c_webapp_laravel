import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {AuthContext} from "../../../context/AuthProvider";
import {AuthType} from "../../../Globals";
import PANEL_COMPANY_ROUTES from "../../../routes/companyRoutes";
import PANEL_PROFESSIONAL_ROUTES from "../../../routes/professionalRoutes";
import {Dropdown} from 'react-bootstrap'
import NotifyMenu from "../../../components/Notify/NotifyMenu";

const MenuLogged = () => {

    const {auth, authType, logout} = useContext(AuthContext);

    const [avatar, setAvatar ] = useState("/themes/web/assets/images/default-profile.svg");
    var count = 0;

    useEffect(() =>{
        if(authType == AuthType.PROFESSIONAL){
            const avatarProfessional = auth.professional.public_image ? auth.professional.public_image : '/themes/web/assets/images/default-profile.svg';
            setAvatar(avatarProfessional)
        }else{
            const avatarCompany = auth.company.public_image ? auth.company.public_image : '/themes/web/assets/images/default-profile.svg';
            setAvatar(avatarCompany)
        }
    }, [authType, auth])

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <div className="pointer"
            // href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            {/*&#x25bc;*/}
        </div>
    ));

    return (
        <ul className="nav justify-content-center mr-3">
            <li className="dropdown-custom-nav d-flex py-2 px-3">
                <NotifyMenu />
            </li>
            <li className="nav-item">
                <Link
                    to={authType === AuthType.COMPANY ?
                        PANEL_COMPANY_ROUTES.GLOBAL_CHAT.path :
                        PANEL_PROFESSIONAL_ROUTES.GLOBAL_CHAT.path}
                    className="nav-link">
                    <img
                        src="/themes/web/assets/images/header/menu-chat.svg"
                        rel="nofollow"
                    />
                </Link>
            </li>
            <li className="dropdown-custom-nav d-flex p-2">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}
                                     id="dropdown-custom-components">
                        <img
                            className="nav-top-avatar"
                            src={avatar}
                            rel="nofollow"
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu  align="right" bsPrefix="dropdown-menu-custom">
                        {/* <Link
                            to={authType === AuthType.COMPANY ?
                                PANEL_COMPANY_ROUTES.DASHBOARD.path :
                                PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path}
                            className="font-12 nav-link">
                            Mi Panel
                        </Link> */}
                        <Link
                            to={authType === AuthType.COMPANY ?
                                PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_INFO.path :
                                PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_INFO.path}
                            className="font-12 nav-link">
                            Mi Cuenta
                        </Link>
                        <Dropdown.Divider />
                        <a href="#"
                           onClick={(e) => {
                               e.preventDefault()
                               e.stopPropagation()
                               logout();
                           }}
                           className="font-12 nav-link">
                            Cerrar Sesión
                        </a>

                        {/*<Dropdown.Item href={authType === AuthType.COMPANY ?*/}
                        {/*    PANEL_COMPANY_ROUTES.DASHBOARD.path :*/}
                        {/*    PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path}>*/}
                        {/*    Mi Panel*/}
                        {/*</Dropdown.Item>*/}
                        {/*<Dropdown.Item eventKey="2">Blue</Dropdown.Item>*/}
                        {/*<Dropdown.Item eventKey="3" active>*/}
                        {/*    Orange*/}
                        {/*</Dropdown.Item>*/}
                        {/*<Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>*/}
                    </Dropdown.Menu>
                </Dropdown>


            </li>
        </ul>
    );
};

export default MenuLogged;
