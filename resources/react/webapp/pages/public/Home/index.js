import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Presentation from "./sections/Presentation";
import HowItIsWork from "./sections/HowItIsWork";
import ForCompany from "./sections/ForCompany";
import Testimonials from "./sections/Testimonials";
import WhatCanDo from "../Common/WhatCanDo";

const Home = () => {
    return (
        <Fragment>

            <Presentation/>
            <HowItIsWork />
            <ForCompany />
            <WhatCanDo />
            <Testimonials />
        </Fragment>
    );
};

export default Home;
