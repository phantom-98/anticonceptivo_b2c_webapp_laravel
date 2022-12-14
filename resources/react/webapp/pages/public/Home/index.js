import React, {useEffect, useState, useContext} from 'react';
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";
import * as Services from "../../../Services";
import Subscribe from "../../../components/sections/Subscribe";
import BestSeller from "../../../components/sections/BestSellers";
import CondomProduct from "../../../components/sections/CondomProduct";
import OutstandingCarousel from "../../../components/sections/OutstandingCarousel";
import BannerCategories from "../../../components/sections/BannerCategories";
// import BannerCarousel from "../../../components/sections/BannerCarousel";
import SwiperCarousel from "../../../components/sections/SwiperCarousel";
import BannerStatic from "../../../components/sections/BannerStatic";
import LazyLoading from '../../../components/LazyLoading';

const Home = ({match}) => {
    const {token} = match.params;

    const {showModalAuth, setTokenModalAuth} = useContext(AppContext);

    const [topBanners, setTopBanners] = useState([]);
    const [bannerCategories, setBannerCategories] = useState([]);
    const [middleBanners, setMiddleBanners] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (token && token.length > 15) {
            setTokenModalAuth(token);
            showModalAuth(ModalAuthMode.SET_NEW_PASSWORD);
        }
    }, [])

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.BANNERS.HOME.TOP;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setTopBanners(response.data.top_banners);
                    setMiddleBanners(response.data.middle_banners);
                    setBannerCategories(response.data.bannerCategories);
                    setIsLoaded(true);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    if (!isLoaded) {
        return (
            <LazyLoading />
        )
    }

    return (
        <div className="bg-FAFAFA">
            <SwiperCarousel banners={topBanners}/>

            <OutstandingCarousel title="Destacados"/>

            <CondomProduct title="Bienestar Sexual"/>

            <BestSeller title="LOS 12 MÁS COMPRADOS"/>

            <BannerStatic banners={middleBanners}/>

            <BannerCategories bannerCategories={bannerCategories}/>

            <Subscribe/>
        </div>
    );
};

export default Home;
