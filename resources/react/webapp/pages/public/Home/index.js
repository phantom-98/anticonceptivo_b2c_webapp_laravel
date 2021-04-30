import React, {Fragment} from 'react';

import slider from '../../../assets/images/dummy/slider.png'
import {CONFIG} from "../../../Config";
import OurBrands from "./OurBrands";
import Subscribe from "../../../components/sections/Subscribe";

const Home = () => {
    return (
        <Fragment>
            <div className="">
                <img src={slider} alt={CONFIG.APP_NAME} width="100%"/>
            </div>

            <OurBrands />

            <Subscribe />
        </Fragment>
    );
};

export default Home;
