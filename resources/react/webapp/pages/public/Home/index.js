import React, {Fragment, useEffect, useState, useContext} from 'react';
import OurBrands from "./OurBrands";
import Subscribe from "../../../components/sections/Subscribe";
import BestSeller from "../../../components/sections/BestSellers";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";
import BannerCarousel from "../../../components/sections/BannerCarousel";
import BannerStatic from "../../../components/sections/BannerStatic";
import * as Services from "../../../Services";

const Home = ({match}) => {

    const {token} = match.params;

    const {showModalAuth, setTokenModalAuth} = useContext(AppContext);

    const [topBanners, setTopBanners] = useState([]);
    const [middleBanners, setMiddleBanners] = useState([]);
    const [bottomBanners, setBottomBanners] = useState([]);
    
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
                  setTopBanners(response.data.top_banners);
                  setMiddleBanners(response.data.middle_banners);
                  setBottomBanners(response.data.bottom_banners);
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <div className="bg-FAFAFA">
                <BannerCarousel topBanners={topBanners}/>

                <ProductsCarousel title="Destacados" />

                <BannerStatic banners={middleBanners}/>

                <BestSeller/>

                <BlogCarousel title="BLOG" showButton={true} buttonTitle="VER MÁS NOTICIAS" />

                <BannerStatic banners={bottomBanners}/>

                <OurBrands/>

                <Subscribe/>
            </div>
        </Fragment>
    );
};

export default Home;
