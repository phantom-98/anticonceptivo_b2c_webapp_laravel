import React, {Fragment, useEffect, useState, useContext} from 'react';

import slider from '../../../assets/images/dummy/slider.png'
import {CONFIG} from "../../../Config";
import OurBrands from "./OurBrands";
import Subscribe from "../../../components/sections/Subscribe";
import BestSeller from "../../../components/sections/BestSellers";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";
import{AuthContext} from "../../../context/AuthProvider";

const Home = ({match}) => {

    const {token} = match.params;

    const {showModalAuth, setTokenModalAuth} = useContext(AppContext);
    
    useEffect(() => {
        if (token  && token.length > 15) {
            setTokenModalAuth(token);
            showModalAuth(ModalAuthMode.SET_NEW_PASSWORD); 
        }
    }, [])

    return (
        <Fragment>
           <div className="bg-FAFAFA">
               <div className="">
                   <img src={slider} alt={CONFIG.APP_NAME} width="100%"/>
               </div>

               <ProductsCarousel title="Destacados" />

               <div className="container">
                   <div className="row">
                       <div className="col-md-12">
                           <img src="/themes/web/blog/banner-1.png" alt={CONFIG.APP_NAME} style={{ width : '100%'}}/>
                       </div>
                   </div>
               </div>

               <BestSeller/>

               <BlogCarousel title="BLOG" showButton={true} buttonTitle="VER MÁS NOTICIAS" />

               <div className="container">
                   <div className="row">
                       <div className="col-md-12">
                           <img src="/themes/web/blog/banner-2.png" alt={CONFIG.APP_NAME} style={{ width : '100%'}}/>
                       </div>
                   </div>
               </div>

               <OurBrands/>

               <Subscribe/>
           </div>
        </Fragment>
    );
};

export default Home;
