import React, {Fragment} from 'react';

import slider from '../../../assets/images/dummy/slider.png'
import {CONFIG} from "../../../Config";
import OurBrands from "./OurBrands";
import Subscribe from "../../../components/sections/Subscribe";
import BestSeller from "../../../components/sections/BestSellers";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";

const Home = () => {
    return (
        <Fragment>
           <div className="bg-FAFAFA">
               <div className="">
                   <img src={slider} alt={CONFIG.APP_NAME} width="100%"/>
               </div>

               <ProductsCarousel title="Destacados" />

               <BestSeller/>

               <OurBrands/>

               <Subscribe/>
           </div>
        </Fragment>
    );
};

export default Home;
