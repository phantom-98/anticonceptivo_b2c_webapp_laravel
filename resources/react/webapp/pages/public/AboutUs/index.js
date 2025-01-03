import React, {useEffect, useState, useContext} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import Subscribe from "../../../components/sections/Subscribe";
import {CONFIG} from "../../../Config";
import H2Title from "../../../components/general/H2Title";
import {Tabs, Tab, Card, Accordion} from 'react-bootstrap';
import BannerCarousel from "../../../components/sections/BannerCarousel";
import * as Services from "../../../Services";
import {v4 as uuidv4} from 'uuid';
import logoFull from "../../../assets/images/logo-full.svg";
import {AppContext} from "../../../context/AppProvider";
import {BREAKPOINTS} from "../../../helpers/vars";

const AboutUs = () => {
    const {breakpoint} = useContext(AppContext)

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
    }, [])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.ABOUT_US;
        let data = {}
        Services.DoGet(url, data).then(response => {
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
            <div className="d-none d-md-block">
                <BannerCarousel topBanners={banners}/>
            </div>

            <BasePanelOne
                breadcrumbs={breadcrumbs}
            >
                <div className="px-0 px-md-3">
                    <div className="row pb-5 mb-5">
                        <div className="col-md-12">

                            <img className="d-none d-sm-block my-0 my-md-3"
                                 style={{width: 500, marginRight: 'auto', marginLeft: 'auto'}} src={logoFull}
                                 alt={CONFIG.APP_NAME}/>

                        </div>
                        <div className="col-md-9 offset-md-3 col-xs-12">
                            <img className="responsive-d-display w-100 my-0 my-md-3" src={logoFull}
                                 alt={CONFIG.APP_NAME}/>
                            <div className="about-us-description" dangerouslySetInnerHTML={{__html: aboutUs.review}}/>
                        </div>
                    </div>

                    <div className="row pb-5 mb-5">
                        <div className="col">

                            {
                                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                                    <Tabs
                                        id="vision-mission"
                                        variant="pills"
                                        className="tabs-about-us"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                    >
                                        <Tab eventKey="mission" title="Misión">
                                            <div className="panel-bordered responsive-padding-tabs">
                                                <div dangerouslySetInnerHTML={{__html: aboutUs.mission}}/>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="vision" title="Visión">
                                            <div className="panel-bordered responsive-padding-tabs">
                                                <div dangerouslySetInnerHTML={{__html: aboutUs.view}}/>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                :
                                    <Accordion defaultActiveKey={'0'}>
                                        <Card className="card-faq card-delivery-cost">
                                            <Accordion.Collapse eventKey={'0'}>
                                                <Card.Body className="mt-1" style={{ border : 0}}>
                                                    <div className="font-14 medium color-484848"
                                                         dangerouslySetInnerHTML={{__html: aboutUs.mission}}/>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                            <Accordion.Toggle as={Card.Header} eventKey={'0'}>
                                                <span className="font-16 font-poppins bold">Misión</span>
                                            </Accordion.Toggle>
                                        </Card>

                                        <Card className="card-faq card-delivery-cost">
                                            <Accordion.Collapse eventKey={'1'}>
                                                <Card.Body className="mt-1" style={{ border : 0}}>
                                                    <div className="font-14 medium color-484848"
                                                         dangerouslySetInnerHTML={{__html: aboutUs.view}}/>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                            <Accordion.Toggle as={Card.Header} eventKey={'1'}>
                                                <span className="font-16 font-poppins bold">Visión</span>
                                            </Accordion.Toggle>
                                        </Card>

                                    </Accordion>
                            }

                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-12 pb-0 pb-md-5">
                            <H2Title text="VALORES" className="font-30"/>
                        </div>

                    </div>

                    <div className="row mb-5 justify-content-center px-0 px-md-5">
                        {
                            values.map((value, index) => {
                                let valueKey = uuidv4();
                                return (
                                    <div key={valueKey} className="col-md-4 col-6 d-flex mb-3">
                                        <div className="row">
                                            <div className="col-12 mb-1 mb-md-5">
                                                <div className="circle-about-us mx-auto">
                                                    <img className="m-auto" style={{borderRadius: '50%'}}
                                                         src={value.public_image} alt={CONFIG.APP_NAME}/>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <h2 className="font-21 bold color-033F5D">
                                                    {value.description}
                                                </h2>
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
                            return (
                                <div key={allianceKey} className="row">
                                    <div className="col-md-9 offset-md-3">
                                        <div className="row">
                                            <div className="col-12 mb-3 mb-md-0">
                                                <a href={alliance.website} target="_blank">
                                                    <img className="img-alliance-responsive" src={alliance.public_image}
                                                         alt={CONFIG.APP_NAME}/>
                                                </a>
                                            </div>

                                            <div className="col-12">
                                                <div className="about-us-description"
                                                     dangerouslySetInnerHTML={{__html: alliance.description}}/>
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
