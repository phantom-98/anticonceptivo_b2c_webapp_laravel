import React, { useEffect, useState, useContext } from "react";
import { ModalAuthMode } from "../../../Globals";
import { AppContext } from "../../../context/AppProvider";
import * as Services from "../../../Services";
import Subscribe from "../../../components/sections/Subscribe";
import BestSeller from "../../../components/sections/BestSellers";
import CondomProduct from "../../../components/sections/CondomProduct";
import BeautyProduct from "../../../components/sections/BeautyProduct";
import PregnancyProduct from "../../../components/sections/PregnancyProduct";
import OutstandingCarousel from "../../../components/sections/OutstandingCarousel";
import BannerCategories from "../../../components/sections/BannerCategories";
// import BannerCarousel from "../../../components/sections/BannerCarousel";
import SwiperCarousel from "../../../components/sections/SwiperCarousel";
import LazyLoading from "../../../components/LazyLoading";
import AccordionComponent from "../../../components/general/AccordionComponent";
import OurBrands from "./OurBrands";
import { Route, Switch } from "react-router-dom";
const Home = ({ match }) => {
    const { token } = match.params;

    const { showModalAuth, setTokenModalAuth, currentStore } =
        useContext(AppContext);
    const [content, setContent] = useState(<>we are in acos</>);
    const [topBanners, setTopBanners] = useState([]);
    const [bannerCategories, setBannerCategories] = useState([]);
    const [middleBanners, setMiddleBanners] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (token && token.length > 15) {
            setTokenModalAuth(token);
            showModalAuth(ModalAuthMode.SET_NEW_PASSWORD);
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        setContent(<OutstandingCarousel title={currentStore} />);
    }, [currentStore]);
    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.BANNERS.HOME.TOP;
        let data = {};
        Services.DoGet(url, data)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        setTopBanners(response.data.top_banners);
                        /* setMiddleBanners(response.data.middle_banners);
                        setBannerCategories(response.data.bannerCategories); */
                        setIsLoaded(true);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    if (!isLoaded) {
        return <LazyLoading />;
    }

    return (
        <div className="bg-FAFAFA">
            <SwiperCarousel banners={topBanners} />
            <OutstandingCarousel title={"AntiConceptivo"} />
            {/*  <OutstandingCarousel title="Destacados" />

            <BeautyProduct
                title="Belleza y Cuidado Personal"
                middleBanners={middleBanners}
            />

            <CondomProduct title="Bienestar Sexual" />

            <PregnancyProduct title="Embarazo" />

            <BestSeller title="Los 12 Más Comprados" />

            <AccordionComponent path="home" />

            <BannerCategories bannerCategories={bannerCategories} />

            <Subscribe /> */}
        </div>
    );
};

export default Home;
