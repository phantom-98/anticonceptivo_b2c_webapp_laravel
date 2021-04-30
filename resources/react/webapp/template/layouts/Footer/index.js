import React, {Fragment} from 'react';
import FooterBottom from "./FooterBottom";

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import logoFooter from '../../../assets/images/icons/footer/logo-footer.svg'
import eureka from '../../../assets/images/icons/footer/eureka.svg'
import webpay from '../../../assets/images/icons/footer/webpay.svg'
import phone from '../../../assets/images/icons/footer/phone.svg'
import email from '../../../assets/images/icons/footer/email.svg'
import twitter from '../../../assets/images/icons/footer/twitter.svg'
import facebook from '../../../assets/images/icons/footer/facebook.svg'
import instagram from '../../../assets/images/icons/footer/instagram.svg'
import {CONFIG} from "../../../Config";
import Icon from "../../../components/Icon";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
        <Fragment>
            <div className="footer d-flex">
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-md-auto text-center">
                            <div className="mb-3">
                                <img src={logoFooter} alt={CONFIG.APP_NAME}/>
                            </div>
                            <div className="mb-3">
                                <div className="font-10 regular text-white">Una alianza con</div>
                                <img src={eureka} alt={CONFIG.APP_NAME}/>
                            </div>

                        </div>

                        <div className="col-md">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Sobre nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Preguntas Frecuentes FAQ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Términos y Condiciones</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Consumo responsable</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Políticas de Privacidad</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Bases Legales</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Plazos y costos de entrega</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <ul className="nav flex-column">
                                <li className="nav-item d-flex" style={{height: '34px'}}>
                                    <div className="px-3 my-auto font-15 bold font-poppins text-white">
                                        CONTACTO
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><Icon path={phone}/>
                                        <span>{' '}+56 9 2344 8723</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><Icon path={email}/>
                                        <span>{' '}HOLA@ANTICONCEPTIVOS.CL</span>
                                    </a>
                                </li>
                            </ul>

                            <div className="row pl-3 pt-2">
                                <div className="col-auto">
                                    <Link to="#" target="_blank">
                                        <Icon path={twitter}/>
                                    </Link>
                                </div>
                                <div className="col-auto">
                                    <Link to="#" target="_blank">
                                        <Icon path={facebook}/>
                                    </Link>
                                </div>
                                <div className="col-auto">
                                    <Link to="#" target="_blank">
                                        <Icon path={instagram}/>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-auto">
                            <div className="mt-5 pt-5">
                                <img src={webpay} alt={CONFIG.APP_NAME}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterBottom/>
        </Fragment>
    );
};

export default Footer;
