import React, { Fragment, useContext, useEffect, useState } from "react";
import FooterBottom from "./FooterBottom";
import logoFooter from "../../../assets/images/logo_blanco_alianza.png";
import logoFooterVerde from "../../../assets/images/logo_verde_alianza.png";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import webCheckout from "../../../assets/images/webCheckout_amarillo.png";
import phone from "../../../assets/images/icons/footer/phone.svg";
import email from "../../../assets/images/icons/footer/email.svg";
import bannerBio from "../../../assets/images/icons/footer/slider_slider_banner_bio_min.jpg";
import bannerCITUC from "../../../assets/images/icons/footer/slider_slider_banner_cituc_min.png";
import facebook from "../../../assets/images/icons/footer/facebook.png";
import instagram from "../../../assets/images/icons/footer/instagram.png";
import tiktok from "../../../assets/images/icons/footer/tiktok.png";
import { CONFIG } from "../../../Config";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import Icon from "../../../components/general/Icon";
import { Link } from "react-router-dom";
import * as Services from "../../../Services";
import { v4 as uuidv4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AppContext } from "../../../context/AppProvider";

const Footer = () => {
    const [responsibleConsumption, setResponsibleConsumption] = useState({
        file: "",
    });
    const { currentStore } = useContext(AppContext);
    const [logo, setLogo] = useState(logoFooter);
    const [alliances, setAlliances] = useState([]);
    const [footerCat, setFooterCat] = useState([]);
    const [phoneContact, setPhoneContact] = useState(null);

    const [sections, setSections] = useState([]);

    useEffect(() => {
        if (currentStore === "bioequivalente") {
            setLogo(logoFooterVerde);
        }
        getData();
    }, []);

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.FOOTER;
        let data = {};
        Services.DoGet(url, data)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        setResponsibleConsumption(
                            response.data.responsible_consumption
                        );
                        setAlliances(response.data.alliances);
                        setSections(response.data.sectionsFooter);
                        setPhoneContact(response.data.phone_contact);
                        setFooterCat(response.data.categories);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <Fragment>
            <div className="footer d-flex py-3">
                <div className="container my-auto">
                    <div
                        className="row"
                        style={{ marginLeft: "-25px !important" }}
                    >
                        <div className="col-lg-auto text-center flex-footer-column">
                            {alliances.map((alliance, index) => {
                                return (
                                    <div className="mb-3" key={index * 7777}>
                                        <LazyLoadImage
                                            alt={CONFIG.APP_NAME}
                                            title="Anticonceptivo"
                                            rel="nofollow"
                                            effect="blur"
                                            src={logo}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="col-lg">
                            <ul className="nav flex-column">
                                <li className="nav-item text-center text-lg-left">
                                    <Link
                                        className="nav-link"
                                        to={PUBLIC_ROUTES.ABOUT_US.path}
                                    >
                                        Sobre nosotros
                                    </Link>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <Link
                                        className="nav-link"
                                        to={PUBLIC_ROUTES.FAQ.path}
                                    >
                                        Preguntas Frecuentes FAQ
                                    </Link>
                                </li>
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link
                                        className="nav-link"
                                        to={
                                            PUBLIC_ROUTES.TERMS_AND_CONDITIONS
                                                .path
                                        }
                                    >
                                        Términos y Condiciones
                                    </Link>
                                </li>
                                {sections.map((section) => {
                                    let sectionKey = uuidv4();
                                    return (
                                        <li
                                            className="nav-item text-center text-lg-left footer-nav-item"
                                            key={sectionKey}
                                        >
                                            <a
                                                className="nav-link"
                                                href={section.link}
                                                target="_blank"
                                                rel="nofollow"
                                            >
                                                {section.name}
                                            </a>
                                        </li>
                                    );
                                })}
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <a
                                        className="nav-link"
                                        href={
                                            responsibleConsumption &&
                                            "public_file" in
                                                responsibleConsumption
                                                ? responsibleConsumption.public_file
                                                : ""
                                        }
                                        target="_blank"
                                    >
                                        Consumo responsable
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg">
                            <ul className="nav flex-column">
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link
                                        className="nav-link"
                                        to={PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path.replace(
                                            ":section",
                                            "politicas-de-privacidad"
                                        )}
                                    >
                                        Políticas de Privacidad
                                    </Link>
                                </li>
                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link
                                        className="nav-link"
                                        to={PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path.replace(
                                            ":section",
                                            "carta-de-desabastecimiento"
                                        )}
                                    >
                                        Carta de Desabastecimiento
                                    </Link>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <Link
                                        className="nav-link"
                                        to={PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path.replace(
                                            ":section",
                                            "plazos-y-costos-entrega"
                                        )}
                                    >
                                        Plazos y costos de entrega
                                    </Link>
                                </li>

                                <li className="nav-item text-center text-lg-left footer-nav-item">
                                    <Link
                                        className="nav-link"
                                        to={PUBLIC_ROUTES.CLAIM.path}
                                    >
                                        Libro de Reclamos
                                    </Link>
                                </li>

                                <li className="nav-item text-center text-lg-left">
                                    <Link
                                        className="nav-link"
                                        to={PUBLIC_ROUTES.BLOG.path}
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-auto mb-3">
                            <ul className="nav flex-column">
                                <li
                                    className="nav-item d-flex"
                                    style={{ height: "34px" }}
                                >
                                    <div className="px-3 my-auto mx-auto mx-lg-0 font-15 bold font-poppins text-with-bg">
                                        CONTACTO
                                    </div>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <a
                                        className="nav-link"
                                        href={
                                            "tel:" +
                                            String(phoneContact).replace(
                                                /\D/g,
                                                ""
                                            )
                                        }
                                    >
                                        <FaPhoneAlt className="react-icons" />
                                        <span>{phoneContact}</span>
                                    </a>
                                </li>
                                <li className="nav-item text-center text-lg-left">
                                    <a
                                        className="nav-link"
                                        href="mailto:contacto@anticonceptivo.cl"
                                    >
                                        <IoMailSharp className="react-icons" />
                                        <span> contacto@anticonceptivo.cl</span>
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
                                    <a
                                        href="https://www.facebook.com/Anticonceptivo.cl/"
                                        target="_blank"
                                        rel="nofollow"
                                    >
                                        <Icon
                                            path={facebook}
                                            style={{ width: "75%" }}
                                        />
                                    </a>
                                </div>
                                <div className="col-auto">
                                    <a
                                        href="https://www.instagram.com/anticonceptivo_cl/"
                                        target="_blank"
                                        rel="nofollow"
                                    >
                                        <Icon
                                            path={instagram}
                                            style={{ width: "75%" }}
                                        />
                                    </a>
                                </div>
                                <div className="col-auto">
                                    <a
                                        href="https://www.tiktok.com/@anticonceptivo.cl"
                                        target="_blank"
                                        rel="nofollow"
                                    >
                                        <Icon
                                            path={tiktok}
                                            style={{ width: "75%" }}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-auto text-center">
                            <div className="mb-3 footer-nav-item">
                                <LazyLoadImage
                                    alt={CONFIG.APP_NAME}
                                    title="Anticonceptivo"
                                    rel="nofollow"
                                    effect="blur"
                                    src={webCheckout}
                                />
                            </div>

                            <div className="mb-3">
                                <LazyLoadImage
                                    alt={CONFIG.APP_NAME}
                                    title="Anticonceptivo"
                                    rel="nofollow"
                                    effect="blur"
                                    src={bannerBio}
                                    width={180}
                                />
                            </div>

                            <div className="mb-3">
                                <LazyLoadImage
                                    alt={CONFIG.APP_NAME}
                                    title="Anticonceptivo"
                                    rel="nofollow"
                                    effect="blur"
                                    src={bannerCITUC}
                                    width={180}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-lg-auto text-center ">
                            {footerCat.map((f, i) => (
                                <a
                                    key={f.id}
                                    href={"/tienda/" + f.slug}
                                    title={f.name}
                                    className="text-with-bg"
                                >
                                    {f.name}
                                    {footerCat.length - 1 !== i ? " | " : ""}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FooterBottom />
        </Fragment>
    );
};

export default Footer;
