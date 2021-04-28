import React, { useState, useEffect, useContext } from 'react';

import { Card } from "react-bootstrap";
import LazyLoading from "../../../../components/LazyLoading";
import Personal from "./sections/Personal";
import Password from "./sections/Password";
import Agent from "./sections/Agent";
import BankInfo from "./sections/BankInfo";
import { AuthContext } from "../../../../context/AuthProvider";
import BasePanel from "../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import { Link } from "react-router-dom";

const Account = ({page}) => {

    const [loaded, setLoaded] = useState(false);

    const {auth} = useContext(AuthContext);

    useEffect(() =>{
        setLoaded(true)
    }, [])

    let breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_INFO.path,
            name: 'Mi Cuenta'
        }
    ];

    if(page === 'personal'){
        breadcrumbs.push( {
            url: PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_INFO.path,
            name: PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_INFO.title
        })
    }

    if(page === 'password' && auth.auth_mode === 'APP'){
        breadcrumbs.push( {
            url: PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_PASSWORD.path,
            name: PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_PASSWORD.title
        })
    }

    if(page === 'agent'){
        breadcrumbs.push( {
            url: PANEL_COMPANY_ROUTES.ACCOUNT_AGENT_INFO.path,
            name: PANEL_COMPANY_ROUTES.ACCOUNT_AGENT_INFO.title
        })
    }

    if(page === 'bank-info'){
        breadcrumbs.push( {
            url: PANEL_COMPANY_ROUTES.ACCOUNT_BILLING_INFO.path,
            name: PANEL_COMPANY_ROUTES.ACCOUNT_BILLING_INFO.title
        })
    }

    return (
        <BasePanel
            // title="Mi Perfil"
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    {
                        loaded ? <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <Card>
                                            <Card.Body>
                                                <div className="row justify-content-center py-4">
                                                    <div className="col-auto">
                                                        <Link to={PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_INFO.path}>
                                                            <span
                                                                className={`font-16 pointer ${page === 'personal' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                Información Empresarial
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    {
                                                        auth.auth_mode === 'APP' ?
                                                        <div className="col-auto">
                                                            <Link to={PANEL_COMPANY_ROUTES.ACCOUNT_PERSONAL_PASSWORD.path}>
                                                                <span
                                                                    className={`font-16 pointer ${page === 'password' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                    Contraseña
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        : null
                                                    }
                                                    <div className="col-auto">
                                                        <Link to={PANEL_COMPANY_ROUTES.ACCOUNT_AGENT_INFO.path}>
                                                            <span
                                                                className={`font-16 pointer ${page === 'agent' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                Datos Representate
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link to={PANEL_COMPANY_ROUTES.ACCOUNT_BILLING_INFO.path}>
                                                            <span
                                                                className={`font-16 pointer ${page === 'bank-info' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                Datos de Facturación
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="row py-5">
                                                    <div className="col-12">
                                                        {
                                                            page === 'personal' ?
                                                                <Personal company={auth.company}/> : null
                                                        }
                                                        {
                                                            page === 'password' && auth.auth_mode === 'APP' ?
                                                                <Password company={auth.company}/> : null
                                                        }
                                                        {
                                                            page === 'agent' ?
                                                                <Agent company={auth.company}/> : null
                                                        }
                                                        {
                                                            page === 'bank-info' ?
                                                                <BankInfo company={auth.company}/> : null
                                                        }
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div> :
                            <LazyLoading/>
                    }
                </div>
            </div>
        </BasePanel>
    );
};

export default Account;
