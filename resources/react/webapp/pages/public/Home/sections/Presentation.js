import React,{useEffect, useState} from 'react';
import {Link} from "react-router-dom";
// import SearchBar from "../../../../components/SearchBar";
import Counter from "../components/Counter";
import * as Services from "../../../../Services";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";

const Presentation = () => {

    const [counters, setCounters] = useState({
        professionals: 0,
        companies: 0,
        hours: 0,
    });

    useEffect(() => {
        getCounters()
    },[])

    const getCounters = () => {
        let url = Services.ENDPOINT.NO_AUTH.PRESENTATION.GET_RESOURCES;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
            response: response,
            success: () => {
                setCounters(response.data.counters);
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <section className="pb-5">
            <div className="container pb-5" style={{maxWidth: '983px'}}>
                <div className="row">
                    <div className="col-md-7">
                        <h1 className="font-45 light">
                            <span className="d-block">Miles de <span className="text-primary bold">empresas</span> y
                            </span>
                            <span className="d-block"> <span className="text-secondary bold">profesionales</span> listos para
                            </span>
                            <span className="d-block">
                                comenzar a trabajar en tu
                            </span>
                            <span className="d-block">
                                objetivo
                           </span>
                        </h1>
                        <div className="py-4">
                            <Link to={PUBLIC_ROUTES.HOW_ITS_WORK.path} className="btn btn-primary btn-rounded px-4">
                                <span className="font-12 regular">Cómo Funciona</span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <img src="/themes/web/assets/images/home/header.svg" alt="Ikiru"/>
                    </div>
                </div>
                {/* <div className="row py-5">
                    <div className="col-md-10 offset-md-1">
                        <SearchBar/>
                    </div>
                </div> */}
                <div className="row mt-5">
                    <div className="col-md-4">
                        <Counter
                            count={counters.professionals}
                            title="PROFESIONALES"
                            imgPath="/themes/web/assets/images/home/count-professional.svg"
                        />
                    </div>
                    <div className="col-md-4">
                        <Counter
                            count={counters.companies}
                            title="EMPRESAS"
                            imgPath="/themes/web/assets/images/home/count-company.svg"
                        />
                    </div>
                    <div className="col-md-4">
                        <Counter
                            count={counters.hours}
                            title="HORAS"
                            imgPath="/themes/web/assets/images/home/count-hours.svg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Presentation;
