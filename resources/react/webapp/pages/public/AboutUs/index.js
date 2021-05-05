import React from 'react';

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import Subscribe from "../../../components/sections/Subscribe";
import {CONFIG} from "../../../Config";
import eurekaLogo from '../../../assets/images/pages/about-us/eureka-logo.png'

const AboutUs = () => {

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

    return (
        <div>
            <BasePanelOne
                breadcrumbs={breadcrumbs}
            >
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-9">
                        <h3 className="font-poppins font-22 bold color-033F5D mb-3">
                            Wireframes can be pencil drawings or sketches on a whiteboard
                        </h3>
                        <div className="font-poppins font-18 regular color-6C6B6B lh-30">
                            Wireframes can be pencil drawings or sketches on a whiteboard, or they can be produced by
                            means of a broad array of free or commercial software applications. Wireframes are generally
                            created by business analysts, user experience designers, developers, visual designers, and
                            by those with expertise in interaction design, information architecture and user research.
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-9">

                        <div className="mb-3">
                            <img src={eurekaLogo}  alt={CONFIG.APP_NAME}/>
                        </div>
                        <h3 className="font-poppins font-22 bold color-033F5D mb-3">
                            Una alianza
                        </h3>
                        <div className="font-poppins font-18 regular color-6C6B6B lh-30">
                            Wireframes can be pencil drawings or sketches on a whiteboard, or they can be produced by
                            means of a broad array of free or commercial software applications. Wireframes are generally
                            created by business analysts, user experience designers, developers, visual designers, and
                            by those with expertise in interaction design, information architecture and user research.
                        </div>
                    </div>
                </div>

            </BasePanelOne>

            <Subscribe/>

        </div>
    );
};

export default AboutUs
