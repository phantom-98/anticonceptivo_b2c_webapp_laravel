import React, {Fragment, useContext} from 'react';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {AuthContext} from "../../context/AuthProvider";
import {AuthType} from "../../Globals";
import PANEL_COMPANY_ROUTES from "../../routes/companyRoutes";
import PANEL_PROFESSIONAL_ROUTES from "../../routes/professionalRoutes";


const Footer = () => {

    const {auth, authType} = useContext(AuthContext);



    return (
        <Fragment>
            {/*<div*/}
            {/*    className="scroll-to-top"*/}
            {/*    style={{*/}
            {/*        marginTop: "-26px",*/}
            {/*        marginBottom: "-26px",*/}
            {/*        zIndex: "2",*/}
            {/*        position: "relative"*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div className="d-flex">*/}
            {/*        <div className="m-auto">*/}
            {/*            <button*/}
            {/*                onClick={() => scrollToTop()}*/}
            {/*                type="button"*/}
            {/*                className="btn btn-primary btn-go-top"*/}
            {/*            >*/}
            {/*                <img*/}
            {/*                    src="/themes/web/assets/img/icons/ionic-ios-arrow-down.svg"*/}
            {/*                    rel="nofollow"*/}
            {/*                />*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <section id="footer" className="footer pt-5">
                <div className="pt-5">
                    <div className="row mx-0" style={{height: '226px'}}>
                        <div className="col-auto d-flex pl-5">
                            <div className="my-auto">
                                <Link to="/">
                                    <img
                                        src="/themes/web/assets/images/footer/logo-ikiru.svg"
                                        rel="nofollow"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col bg-footer pr-5">
                            <div className="row justify-content-end h-100">

                                <div className="col-auto d-flex pt-5" style={{paddingLeft: '230px'}}>
                                    <div className="my-auto">
                                        <div className="row">
                                            <div className="col-12">
                                                <ul className="nav">
                                                    <li className="nav-item">
                                                        <Link
                                                            to={PUBLIC_ROUTES.HOME.path}
                                                            className="font-12 light nav-link">
                                                            Inicio
                                                        </Link>
                                                    </li>
                                                    {/*<li className="nav-item">*/}
                                                    {/*    <Link*/}
                                                    {/*        to={PUBLIC_ROUTES.ABOUT_US.path}*/}
                                                    {/*        className="font-12 light nav-link">*/}
                                                    {/*        Quiénes Somos*/}
                                                    {/*    </Link>*/}
                                                    {/*</li>*/}
                                                    <li className="nav-item">
                                                        <Link
                                                            to={PUBLIC_ROUTES.HOW_ITS_WORK.path}
                                                            className="font-12 light nav-link">
                                                            Cómo Funciona
                                                        </Link>
                                                    </li>

                                                    {
                                                        !auth ? <Fragment>
                                                                <li className="nav-item">
                                                                    <Link
                                                                        to={PUBLIC_ROUTES.CONTACT.path}
                                                                        className="font-12 light nav-link">
                                                                        Contáctanos
                                                                    </Link>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <div className="button-login-footer">
                                                                        <Link
                                                                            to="#"
                                                                            className="font-12 light">
                                                                            Acceder
                                                                        </Link>
                                                                        <span className="px-3 text-white">|</span>
                                                                        <Link
                                                                            to="#"
                                                                            className="font-12 light">
                                                                            Registrar
                                                                        </Link>
                                                                    </div>
                                                                </li>
                                                            </Fragment>
                                                            :
                                                            <Fragment>
                                                                <li className="nav-item">
                                                                    <Link
                                                                        to={authType === AuthType.COMPANY ?
                                                                            PANEL_COMPANY_ROUTES.DASHBOARD.path :
                                                                            PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path}
                                                                        className="font-12 light nav-link">
                                                                        Mi Panel
                                                                    </Link>
                                                                </li>
                                                            </Fragment>
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-auto">
                                                <ul className="nav">
                                                    <li className="nav-item">
                                                        <Link
                                                            to={PUBLIC_ROUTES.PAYMENT_CONDITIONS.path}
                                                            className="font-12 nav-link light text-decoration-underline"
                                                        >
                                                            Condiciones de pago
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link
                                                            to={PUBLIC_ROUTES.TERMS_AND_CONDITIONS.path}
                                                            className="font-12 nav-link light text-decoration-underline"
                                                        >
                                                            Términos y condiciones
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-auto d-flex">
                                    <div className="my-auto">
                                        <div className="row pb-3 justify-content-end">
                                            <div className="col-auto pl-0">
                                                <Link to="#">
                                                    <img className="scale-05"
                                                         src="/themes/web/assets/images/footer/twitter.svg"
                                                         rel="nofollow"/>
                                                </Link>
                                            </div>
                                            <div className="col-auto pl-0">
                                                <Link to="#">
                                                    <img className="scale-05"
                                                         src="/themes/web/assets/images/footer/facebook.svg"
                                                         rel="nofollow"/>
                                                </Link>
                                            </div>
                                            <div className="col-auto pl-0">
                                                <Link to="#">
                                                    <img className="scale-05"
                                                         src="/themes/web/assets/images/footer/instagram.svg"
                                                         rel="nofollow"/>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <img src="/themes/web/assets/images/footer/webpay-old.svg"
                                                     rel="nofollow"/>
                                            </div>
                                        </div>
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

export default Footer;
