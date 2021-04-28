import React, { useState, useEffect, useContext } from 'react';

import { Card } from "react-bootstrap";
import LazyLoading from "../../../../components/LazyLoading";
import Personal from "./sections/Personal";
import Password from "./sections/Password";
import BankData from "./sections/BankData";
import CloseAccount from "./sections/CloseAccount";
import { AuthContext } from "../../../../context/AuthProvider";
import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import { Link } from "react-router-dom";

const Account = ({page}) => {

    const [loaded, setLoaded] = useState(false);

    const {auth} = useContext(AuthContext);

    useEffect(() =>{
        setLoaded(true)
    }, [])

    let breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_INFO.path,
            name: 'Mi Cuenta'
        }
    ];

    if(page === 'personal'){
        breadcrumbs.push( {
            url: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_INFO.path,
            name: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_INFO.title
        })
    }

    if(page === 'password' && auth.auth_mode === 'APP'){
        breadcrumbs.push( {
            url: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_PASSWORD.path,
            name: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_PASSWORD.title
        })
    }

    if (page === "bank-info") {
        breadcrumbs.push({
            url: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_BANK.path,
            name: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_BANK.title
        });
    }

    if (page === "close-account") {
        breadcrumbs.push({
            url: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_CLOSE_ACCOUNT.path,
            name: PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_CLOSE_ACCOUNT.title
        });
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
                                                        <Link to={PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_INFO.path}>
                                                            <span
                                                                className={`font-16 pointer ${page === 'personal' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                Información Personal
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    {
                                                        auth.auth_mode === 'APP' ? 
                                                        <div className="col-auto">
                                                            <Link to={PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_PASSWORD.path}>
                                                                <span
                                                                    className={`font-16 pointer ${page === 'password' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                    Contraseña
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    : null
                                                    }
                                                    <div className="col-auto">
                                                        <Link to={PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_BANK.path}>
                                                            <span
                                                                className={`font-16 pointer ${page === 'bank-info' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                Datos bancarios
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link to={PANEL_PROFESSIONAL_ROUTES.ACCOUNT_PERSONAL_CLOSE_ACCOUNT.path}>
                                                            <span
                                                                className={`font-16 pointer ${page === 'close-account' ? 'bold text-primary' : 'regular color-3C3C3E'}`}>
                                                                Suspender cuenta
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="row py-5">
                                                    <div className="col-12">
                                                        {
                                                            page === 'personal' ?
                                                                <Personal professional={auth.professional}/> : null
                                                        }
                                                        {
                                                            page === 'password' && auth.auth_mode === 'APP' ?
                                                                <Password professional={auth.professional}/> : null
                                                        }

                                                        {
                                                            page === 'bank-info' ?
                                                                <BankData professional={auth.professional}/> : null
                                                        }

                                                        {
                                                            page === 'close-account' ?
                                                                <CloseAccount
                                                                    professionalId={auth.professional_id}/> : null
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
