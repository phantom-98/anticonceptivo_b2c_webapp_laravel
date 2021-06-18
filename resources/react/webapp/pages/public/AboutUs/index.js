import React, {useEffect, useState} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import Subscribe from "../../../components/sections/Subscribe";
import {CONFIG} from "../../../Config";
import eurekaLogo from '../../../assets/images/pages/about-us/eureka-logo.png'
import H2Title from "../../../components/general/H2Title";
import handsWhite from '../../../assets/images/icons/hands-white.svg'
import {Tabs, Tab} from 'react-bootstrap';
import BannerCarousel from "../../../components/sections/BannerCarousel";
import * as Services from "../../../Services";

const AboutUs = () => {

    const [key, setKey] = useState('vision');
    const [banners, setBanners] = useState([]);

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.ABOUT_US.path,
            name: PUBLIC_ROUTES.ABOUT_US.title,
        },
    ];

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.BANNERS.ABOUT_US;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                  setBanners(response.data.banners);
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div>
            <BannerCarousel banners={banners}/>

            <BasePanelOne
                breadcrumbs={breadcrumbs}
            >
                <div className="px-3">
                    <div className="row pb-5 mb-5">
                        <div className="col-3">

                        </div>
                        <div className="col-9">
                            <h3 className="font-poppins font-22 bold color-033F5D mb-3">
                                Wireframes can be pencil drawings or sketches on a whiteboard
                            </h3>
                            <div className="font-poppins font-18 regular color-6C6B6B lh-30">
                                Wireframes can be pencil drawings or sketches on a whiteboard, or they can be produced
                                by
                                means of a broad array of free or commercial software applications. Wireframes are
                                generally
                                created by business analysts, user experience designers, developers, visual designers,
                                and
                                by those with expertise in interaction design, information architecture and user
                                research.
                            </div>
                        </div>
                    </div>

                    <div className="row pb-5 mb-5">
                        <div className="col">
                            <Tabs
                                id="vision-mission"
                                variant="pills"
                                className="tabs-about-us"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                            >
                                <Tab eventKey="vision" title="Visión">
                                    <div className="panel-bordered p-5">
                                        <p className="font-poppins font-14 regular">
                                            Entregar un servicio de salud y bienestar, en un ambiente de cordialidad y
                                            respeto por las personas, con el propósito de cimentar relaciones de largo
                                            plazo con nuestros colaboradores y clientes.
                                        </p>
                                        <p className="font-poppins font-14 regular">
                                            Wireframes can be pencil drawings or sketches on a whiteboard, or they can
                                            be produced by means of a broad array of free or commercial software
                                            applications. Wireframes are generally created by business analysts, user
                                            experience designers, developers, visual designers, and by those with
                                            expertise in interaction design, information architecture and user research.
                                        </p>
                                    </div>
                                </Tab>
                                <Tab eventKey="mission" title="Misión">
                                    <div className="panel-bordered p-5">
                                        <p className="font-poppins font-14 regular">
                                            Wireframes can be pencil drawings or sketches on a whiteboard, or they can
                                            be produced by means of a broad array of free or commercial software
                                            applications. Wireframes are generally created by business analysts, user
                                            experience designers, developers, visual designers, and by those with
                                            expertise in interaction design, information architecture and user research.
                                        </p>
                                        <p className="font-poppins font-14 regular">
                                            Entregar un servicio de salud y bienestar, en un ambiente de cordialidad y
                                            respeto por las personas, con el propósito de cimentar relaciones de largo
                                            plazo con nuestros colaboradores y clientes.
                                        </p>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>

                    <div className="row pb-5 mb-5">
                        <div className="col-12 pb-5">
                            <H2Title text="VALORES" className="font-30"/>
                        </div>
                        {
                            [1, 2, 3].map((_, i) => {
                                return <div key={i} className="col-md-4 d-flex">
                                    <div className="row">
                                        <div className="col-12 mb-5">
                                            <div className="circle-about-us mx-auto">
                                                <img className="m-auto" src={handsWhite} alt={CONFIG.APP_NAME}/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="font-poppins font-14 regular">
                                                Wireframes can be pencil drawings or sketches on a whiteboard, or they
                                                can be produced by means of a broad array of free or commercial software
                                                applications. Wireframes
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>




                    <div className="row pb-5 mb-5">
                        <div className="col-3">

                        </div>
                        <div className="col-9">
                            <div className="mb-5">
                                <img src={eurekaLogo} alt={CONFIG.APP_NAME}/>
                            </div>
                            <h3 className="font-poppins font-22 bold color-033F5D mb-3">
                                Una alianza
                            </h3>
                            <div className="font-poppins font-18 regular color-6C6B6B lh-30">
                                Wireframes can be pencil drawings or sketches on a whiteboard, or they can be produced
                                by
                                means of a broad array of free or commercial software applications. Wireframes are
                                generally
                                created by business analysts, user experience designers, developers, visual designers,
                                and
                                by those with expertise in interaction design, information architecture and user
                                research.
                            </div>
                        </div>
                    </div>
                </div>

            </BasePanelOne>

            <Subscribe/>

        </div>
    );
};

export default AboutUs
