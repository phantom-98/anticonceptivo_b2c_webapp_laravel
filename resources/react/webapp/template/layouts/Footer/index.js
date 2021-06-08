import React, {Fragment, useEffect, useState} from 'react';
import FooterBottom from "./FooterBottom";
import logoFooter from '../../../assets/images/icons/footer/logo-footer.svg'
import eureka from '../../../assets/images/icons/footer/eureka.svg'
import webpay from '../../../assets/images/icons/footer/webpay.svg'
import phone from '../../../assets/images/icons/footer/phone.svg'
import email from '../../../assets/images/icons/footer/email.svg'
import twitter from '../../../assets/images/icons/footer/twitter.svg'
import facebook from '../../../assets/images/icons/footer/facebook.svg'
import instagram from '../../../assets/images/icons/footer/instagram.svg'
import {CONFIG} from "../../../Config";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import Icon from "../../../components/general/Icon";
import {Link} from "react-router-dom";
import * as Services from "../../../Services";

const Footer = () => {

    const [responsibleConsumption, setResponsibleConsumption] = useState({
        file: ''
    });

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        let url = Services.ENDPOINT.NO_AUTH.RESPONSIBLE_CONSUMPTION.GET_DATA;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                  setResponsibleConsumption(response.data.responsible_consumption);
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <div className="footer d-flex">
                <div className="container my-auto">
                    <div className="row" style={{marginLeft:'-25px !important'}}>
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
                                    <Link className="nav-link" to={PUBLIC_ROUTES.ABOUT_US.path}>Sobre nosotros</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.FAQ.path}>Preguntas Frecuentes FAQ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.TERMS_AND_CONDITIONS.path}>Términos y Condiciones</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={responsibleConsumption.public_file} target="_blank">Consumo responsable</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" to={(PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path).replace(':section', 'politicas-de-privacidad')}>Políticas de Privacidad</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={(PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path).replace(':section', 'bases-legales')}>Bases Legales</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={(PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path).replace(':section', 'plazos-y-costos-entrega')}>Plazos y costos de entrega</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.BLOG.path}>Blog</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-auto">
                            <ul className="nav flex-column">
                                <li className="nav-item d-flex" style={{height: '34px'}}>
                                    <div className="px-3 my-auto font-15 bold font-poppins text-white">
                                        CONTACTO
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><Icon path={phone}/>
                                        <span>{' '}(2) 3245 1883</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><Icon path={email}/>
                                        <span>{' '}contacto@anticonceptivo.cl</span>
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
