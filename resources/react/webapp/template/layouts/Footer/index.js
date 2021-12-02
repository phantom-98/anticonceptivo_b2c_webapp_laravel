import React, {Fragment, useEffect, useState} from 'react';
import FooterBottom from "./FooterBottom";
import logoFooter from '../../../assets/images/icons/footer/logo-footer.svg'
// import eureka from '../../../assets/images/icons/footer/eureka.svg'
import webpay from '../../../assets/images/icons/footer/webpay.svg'
import phone from '../../../assets/images/icons/footer/phone.svg'
import email from '../../../assets/images/icons/footer/email.svg'
// import twitter from '../../../assets/images/icons/footer/twitter.svg'
import facebook from '../../../assets/images/icons/footer/facebook.svg'
import instagram from '../../../assets/images/icons/footer/instagram.svg'
import {CONFIG} from "../../../Config";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import Icon from "../../../components/general/Icon";
import {Link} from "react-router-dom";
import * as Services from "../../../Services";
import {v4 as uuidv4} from 'uuid';

const Footer = () => {

    const [responsibleConsumption, setResponsibleConsumption] = useState({
        file: ''
    });

    const [alliances, setAlliances] = useState([]);

    const [sections, setSections] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.FOOTER;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setResponsibleConsumption(response.data.responsible_consumption);
                    setAlliances(response.data.alliances);
                    setSections(response.data.sectionsFooter);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <div className="footer d-flex py-5">
                <div className="container my-auto">
                    <div className="row" style={{marginLeft: '-25px !important'}}>
                        <div className="col-lg-auto text-center flex-footer-column">
                            <div className="mb-3">
                                <img className="logo-footer" src={logoFooter} alt={CONFIG.APP_NAME}/>
                            </div>
                            <div className="font-10 regular text-white">Una alianza con</div>
                            {
                                alliances.map((alliance, index) => {
                                    return (
                                        <div className="mb-3" key={index * 7777}>
                                            <img src={alliance.public_footer_image} alt={CONFIG.APP_NAME}/>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className="col-lg">
                            <ul className="nav flex-column">
                                <li className="nav-item text-center text-lg-left">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.ABOUT_US.path}>Sobre nosotros</Link>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.FAQ.path}>Preguntas Frecuentes
                                        FAQ</Link>
                                </li>
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.TERMS_AND_CONDITIONS.path}>Términos y
                                        Condiciones</Link>
                                </li>
                                {
                                    sections.map((section) => {
                                        let sectionKey = uuidv4();
                                        return (
                                            <li className="nav-item text-center text-lg-left footer-nav-item"
                                                key={sectionKey}>
                                                <a className="nav-link" href={section.link} target="_blank">
                                                    {section.name}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <a className="nav-link"
                                       href={responsibleConsumption && 'public_file' in responsibleConsumption ? responsibleConsumption.public_file : ''}
                                       target="_blank">Consumo responsable</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg">
                            <ul className="nav flex-column">
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link className="nav-link"
                                          to={(PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path).replace(':section', 'politicas-de-privacidad')}>Políticas
                                        de Privacidad</Link>
                                </li>
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link className="nav-link"
                                          to={(PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path).replace(':section', 'carta-de-desabastecimiento')}>Carta
                                        de Desabastecimiento</Link>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <Link className="nav-link"
                                          to={(PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path).replace(':section', 'plazos-y-costos-entrega')}>Plazos
                                        y costos de entrega</Link>
                                </li>

                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.CLAIM.path}>Libro de Reclamos</Link>
                                </li>

                                <li className="nav-item text-center text-lg-left">
                                    <Link className="nav-link" to={PUBLIC_ROUTES.BLOG.path}>Blog</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-auto">
                            <ul className="nav flex-column">
                                <li className="nav-item d-flex" style={{height: '34px'}}>
                                    <div className="px-3 my-auto mx-auto mx-lg-0 font-15 bold font-poppins text-white">
                                        CONTACTO
                                    </div>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <a className="nav-link" href="tel:232451883"><Icon path={phone}/>
                                        <span>{' '}(2) 3245 1883</span>
                                    </a>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <a className="nav-link" href="mailto:contacto@anticonceptivo.cl"><Icon
                                        path={email}/>
                                        <span>{' '}contacto@anticonceptivo.cl</span>
                                    </a>
                                </li>
                            </ul>

                            <div className="row pl-3 pt-2 justify-content-lg-start justify-content-center">
                                {/* <div className="col-auto">
                                    <Link to="#" target="_blank">
                                        <Icon path={twitter}/>
                                    </Link>
                                </div> */}
                                <div className="col-auto">
                                    <a href="https://www.facebook.com/Anticonceptivo.cl/" target="_blank">
                                        <Icon path={facebook}/>
                                    </a>
                                </div>
                                <div className="col-auto">
                                    <a href="https://www.instagram.com/anticonceptivo_cl/" target="_blank">
                                        <Icon path={instagram}/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-auto flex-footer-column footer-nav-item">
                            <div className="mx-auto mx-lg-0">
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
