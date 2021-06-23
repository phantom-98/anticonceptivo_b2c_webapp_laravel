import React, {useEffect, useState} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import Subscribe from "../../../components/sections/Subscribe";
import {CONFIG} from "../../../Config";
import eurekaLogo from '../../../assets/images/pages/about-us/eureka-logo.png'
import H2Title from "../../../components/general/H2Title";
// import handsWhite from '../../../assets/images/icons/hands-white.svg'
import {Tabs, Tab} from 'react-bootstrap';
import BannerCarousel from "../../../components/sections/BannerCarousel";
import * as Services from "../../../Services";
import { v4 as uuidv4 } from 'uuid';

const AboutUs = () => {

    const [key, setKey] = useState('vision');
    const [banners, setBanners] = useState([]);
    const [aboutUs, setAboutUs] = useState({});
    const [values, setValues] = useState([]);
    const [alliances, setAlliances] = useState([]);

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
        let url = Services.ENDPOINT.PUBLIC_AREA.ABOUT_US;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
            response: response,
            success: () => {
                setBanners(response.data.banners);
                setAboutUs(response.data.about_us);
                setValues(response.data.values);
                setAlliances(response.data.alliances)
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div>
            <BannerCarousel topBanners={banners}/>

            <BasePanelOne
                breadcrumbs={breadcrumbs}
            >
                <div className="px-3">
                    <div className="row pb-5 mb-5">
                        <div className="col-3">

                        </div>
                        <div className="col-9">
                            <div dangerouslySetInnerHTML={{ __html: aboutUs.review}}/>
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
                                        <div dangerouslySetInnerHTML={{ __html: aboutUs.view}}/>
                                    </div>
                                </Tab>
                                <Tab eventKey="mission" title="Misión">
                                    <div className="panel-bordered p-5">
                                        <div dangerouslySetInnerHTML={{ __html: aboutUs.mission}}/>
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
                            values.map((value, index) => {
                                let valueKey = uuidv4();
                                return (
                                    <div key={valueKey} className="col-md-4 d-flex">
                                        <div className="row">
                                            <div className="col-12 mb-5">
                                                <div className="circle-about-us mx-auto">
                                                    <img className="m-auto" src={value.public_image} alt={CONFIG.APP_NAME}/>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="font-poppins font-14 regular">
                                                    {value.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        alliances.map((alliance, index) => {
                            let allianceKey = uuidv4();
                            return(
                                <div key={allianceKey} className="row pb-5 mb-5">
                                    <div className="col-3">

                                    </div>
                                    <div className="col-9">
                                        <div className="mb-5">
                                            <img src={alliance.public_image} alt={CONFIG.APP_NAME}/>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html:alliance.description}}/>
                                        {/* <h3 className="font-poppins font-22 bold color-033F5D mb-3">
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
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </BasePanelOne>

            <Subscribe/>

        </div>
    );
};

export default AboutUs
