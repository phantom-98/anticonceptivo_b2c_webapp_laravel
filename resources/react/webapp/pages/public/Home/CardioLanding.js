import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import { ModalAuthMode } from "../../../Globals";
import * as Services from "../../../Services";
import LazyLoading from "../../../components/LazyLoading";
import SwiperCarousel from "../../../components/sections/SwiperCarousel";
import OutstandingCarousel from "../../../components/sections/OutstandingCarousel";
const CardioLanding = ({ match }) => {
    const { token } = match.params;

    const { showModalAuth, setTokenModalAuth, currentStore } =
        useContext(AppContext);

    const [topBanners, setTopBanners] = useState([]);

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
            <OutstandingCarousel
                brand={currentStore}
                title={"Más Destacados"}
            />
        </div>
    );
};

export default CardioLanding;
