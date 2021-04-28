import React from 'react';
import CardHowWork from "../components/CardHowWork";
import {Link} from "react-router-dom";


const ForCompany = () => {
    return (
        <section className="bg-for-company py-5" id="forCompany">
            <div className="container mt-5 pt-5">

                <div className="row">
                    <div className="col-md-6 text-right">
                        <img className="w-100" style={{ maxWidth : '459px' }} src="/themes/web/assets/images/home/ikiru-for-companies.svg" alt="Ikiru"/>
                    </div>
                    <div className="col-6 px-5 d-flex">
                        <div className="my-auto">
                            <h2 className="font-35 bold text-secondary">
                                ikiru para empresas
                            </h2>
                            <p className="font-epilogue font-16 light color-121212">
                                <span className="d-block">Entérate como tu empresa puede hacer más con</span>
                                talento freelance.
                            </p>
                            <div className="py-4">
                                <Link to="#" className="btn btn-primary btn-rounded px-5">
                                    <span className="font-12 regular">Descúbrelo</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-5 d-flex">
                        <div className="my-auto">
                            <h2 className="font-35 lh-35 bold">
                                <span className="d-block color-121212 light">Empresas que</span>
                                <span className="text-primary">se potencian</span> <span className="text-secondary">con nosotros</span>
                            </h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="bubble-canvas">
                            <div className="bubble bubble-1">
                                <img src="/themes/web/assets/images/logo.svg" alt="Ikiru - NOMBRE DE LA COMPAÑIA"/>
                            </div>
                            <div className="bubble bubble-2">
                                <img src="/themes/web/assets/images/logo.svg" alt="Ikiru - NOMBRE DE LA COMPAÑIA"/>
                            </div>
                            <div className="bubble bubble-3">
                                <img src="/themes/web/assets/images/logo.svg" alt="Ikiru - NOMBRE DE LA COMPAÑIA"/>
                            </div>
                            <div className="bubble bubble-4">
                                <img src="/themes/web/assets/images/logo.svg" alt="Ikiru - NOMBRE DE LA COMPAÑIA"/>
                            </div>
                            <div className="bubble bubble-5">
                                <img src="/themes/web/assets/images/logo.svg" alt="Ikiru - NOMBRE DE LA COMPAÑIA"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForCompany;
