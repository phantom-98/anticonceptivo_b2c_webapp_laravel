import React, {Fragment, useContext} from 'react';

import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {AppContext} from "../../context/AppProvider";
import MenuPublic from "../menus/MenuPublic";
import MenuCompany from "../menus/MenuCompany";
import MenuProfessional from "../menus/MenuProfessional";
import MenuAuth from "../menus/MenuAuth";

const Header = ({menu}) => {

    const location = useLocation();

    return (
        <Fragment>
            <section id="header" className="header">
                <div className="">
                    <div className="row mx-0" style={{height: '130px'}}>
                        <div className="col-auto d-flex pl-5">
                            <div className="my-auto">
                                <Link to="/">
                                    <img
                                        src="/themes/web/assets/images/header/logo.svg"
                                        alt="Ikiru"
                                        title="Ikiru"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row justify-content-end h-100">
                                <div className="col-auto d-flex">
                                    <div className="my-auto">
                                        {
                                            menu === 'public' ? <MenuPublic/> : null
                                        }

                                        {
                                            menu === 'company' ? <MenuCompany/> : null
                                        }

                                        {
                                            menu === 'professional' ? <MenuProfessional/> : null
                                        }
                                    </div>
                                </div>
                                <div className="col-auto d-flex pr-5 bg-top-login">
                                    <div className="my-auto" style={{minWidth: '266px'}}>
                                        <MenuAuth/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );

};

export default Header;

