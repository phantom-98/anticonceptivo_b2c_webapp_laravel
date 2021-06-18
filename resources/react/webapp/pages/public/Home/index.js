import React, {Fragment, useEffect, useState, useContext} from 'react';
import {CONFIG} from "../../../Config";
import OurBrands from "./OurBrands";
import Subscribe from "../../../components/sections/Subscribe";
import BestSeller from "../../../components/sections/BestSellers";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";
import BannerCarousel from "../../../components/sections/BannerCarousel";
import * as Services from "../../../Services";

const Home = ({match}) => {

    const {token} = match.params;

    const {showModalAuth, setTokenModalAuth} = useContext(AppContext);
    const [banners, setBanners] = useState([]);
    
    useEffect(() => {
        if (token  && token.length > 15) {
            setTokenModalAuth(token);
            showModalAuth(ModalAuthMode.SET_NEW_PASSWORD); 
        }
    }, [])

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.BANNERS.HOME.TOP;
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
        <Fragment>
           <div className="bg-FAFAFA">

               <BannerCarousel banners={banners}/>

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
