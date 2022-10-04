import React, {useEffect, useState} from 'react';
import * as Services from "../../../Services";
import BannerCarousel from "../../../components/sections/BannerCarousel";
import SwiperCarousel from "../../../components/sections/SwiperCarousel";
import LazyLoading from '../../../components/LazyLoading';
import OutstandingCarousel from "../../../components/sections/OutstandingCarousel";

const Home = ({match}) => {
    const [topBanners, setTopBanners] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

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
        <>
            {/* <div className="bg-FAFAFA">
                <BannerCarousel topBanners={topBanners}/>
            </div>
            <div className="col-12 py-4">

            </div>
            <div className="bg-FAFAFA">
                <SwiperCarousel banners={topBanners}/>
            </div>
            <div className="col-12 py-4">

            </div> */}

            <OutstandingCarousel title="Destacados"/>

        </>
    );
};

export default Home;
