import React, {useEffect, useState, useContext} from 'react';
import OurBrands from "./OurBrands";
import Subscribe from "../../../components/sections/Subscribe";
// import BestSeller from "../../../components/sections/BestSellers";
// import OutstandingCarousel from "../../../components/sections/OutstandingCarousel";
import BannerCategories from "../../../components/sections/BannerCategories";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import {ModalAuthMode} from "../../../Globals";
import {AppContext} from "../../../context/AppProvider";
import BannerCarousel from "../../../components/sections/BannerCarousel";
import BannerStatic from "../../../components/sections/BannerStatic";
import * as Services from "../../../Services";
import LazyLoading from '../../../components/LazyLoading';
import BlogPosts from './BlogPosts';

const Home = ({match}) => {

    const {token} = match.params;

    const {showModalAuth, setTokenModalAuth} = useContext(AppContext);

    const [topBanners, setTopBanners] = useState([]);
    const [bannerCategories, setBannerCategories] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [middleBanners, setMiddleBanners] = useState([]);
    const [bottomBanners, setBottomBanners] = useState([]);
    const [brands, setBrands] = useState([]);
    // const [outstandings, setOutstandings] = useState([]);
    // const [bestSellers, setBestSellers] = useState([]);

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
                    setBottomBanners(response.data.bottom_banners);
                    setBrands(response.data.brands);
                    setBannerCategories(response.data.bannerCategories);
                    setBlogPosts(response.data.blog_posts);
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
            <BannerCarousel topBanners={topBanners}/>

            {/* <OutstandingCarousel title="Destacados" outstandings={outstandings}/> */}

            <BannerStatic banners={middleBanners}/>
            <BannerCategories bannerCategories={bannerCategories}/>

            {/* <BestSeller bestSellers={bestSellers}/> */}

            {/* <BlogCarousel title="BLOG" showButton={true} buttonTitle="VER MÁS NOTICIAS" /> */}

            {/*<BannerStatic banners={bottomBanners}/>*/}

            {/*<BlogPosts blogPosts={blogPosts} isLoaded={isLoaded}/>*/}

            {/*<OurBrands brands={brands}/>*/}

            <Subscribe/>
        </div>
    );
};

export default Home;
