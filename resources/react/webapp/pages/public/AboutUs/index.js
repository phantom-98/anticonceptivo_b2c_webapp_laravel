import React, {useEffect, useState} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import Subscribe from "../../../components/sections/Subscribe";
import {CONFIG} from "../../../Config";
import H2Title from "../../../components/general/H2Title";
import {Tabs, Tab} from 'react-bootstrap';
import BannerCarousel from "../../../components/sections/BannerCarousel";
import * as Services from "../../../Services";
import { v4 as uuidv4 } from 'uuid';
import logoFull from "../../../assets/images/logo-full.svg";

const AboutUs = () => {

    const [key, setKey] = useState('mission');
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
                        <div className="col-md-9 offset-md-3 col-xs-12">
                            {/* <h3 className="font-poppins font-22 bold color-033F5D mb-3 responsive-d-none">
                                {aboutUs.title_review}
                            </h3> */}
                            <img className="responsive-d-display w-100 my-3" src={logoFull} alt={CONFIG.APP_NAME}/>
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
                                <Tab eventKey="mission" title="Misión">
                                    <div className="panel-bordered responsive-padding-tabs">
                                        <div dangerouslySetInnerHTML={{ __html: aboutUs.mission}}/>
                                    </div>
                                </Tab>
                                <Tab eventKey="vision" title="Visión">
                                    <div className="panel-bordered responsive-padding-tabs">
                                        <div dangerouslySetInnerHTML={{ __html: aboutUs.view}}/>
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
                                                    <img className="m-auto" style={{width:125, height:125, borderRadius:'50%'}} src={value.public_image} alt={CONFIG.APP_NAME}/>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <H2Title text={value.description} className="font-16"/>
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
                                    <div className="col-md-9 offset-md-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <a href={alliance.website} target="_blank">
                                                    <img className="img-alliance-responsive" src={alliance.public_image} alt={CONFIG.APP_NAME}/>
                                                </a>
                                            </div>

                                            {/* <div className="col-12 font-poppins font-22 bold color-033F5D mb-3">
                                                {alliance.name}
                                            </div> */}

                                            <div className="col-12">
                                                <div dangerouslySetInnerHTML={{ __html:alliance.description}}/>
                                            </div> 
                                        </div>
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
