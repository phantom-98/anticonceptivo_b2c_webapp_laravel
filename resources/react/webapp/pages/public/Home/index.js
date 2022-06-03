import React, {useEffect, useState, useContext} from 'react';
import OurBrands from "./OurBrands";
import Subscribe from "../../../components/sections/Subscribe";
// import BestSeller from "../../../components/sections/BestSellers";
import OutstandingCarousel from "../../../components/sections/OutstandingCarousel";
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
    var MessageBirdChatWidgetSettings = {
        widgetId: '98cafb52-fed5-4d0c-b382-d8bc49b3ddda',
        initializeOnLoad: true,
    };

    !function(){"use strict";if(Boolean(document.getElementById("live-chat-widget-script")))console.error("MessageBirdChatWidget: Snippet loaded twice on page");else{var e,t;window.MessageBirdChatWidget={},window.MessageBirdChatWidget.queue=[];for(var i=["init","setConfig","toggleChat","identify","hide","on","shutdown"],n=function(){var e=i[d];window.MessageBirdChatWidget[e]=function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];window.MessageBirdChatWidget.queue.push([[e,i]])}},d=0;d<i.length;d++)n();var a=(null===(e=window)||void 0===e||null===(t=e.MessageBirdChatWidgetSettings)||void 0===t?void 0:t.widgetId)||"",o=function(){var e,t=document.createElement("script");t.type="text/javascript",t.src="https://livechat.messagebird.com/bootstrap.js?widgetId=".concat(a),t.async=!0,t.id="live-chat-widget-script";var i=document.getElementsByTagName("script")[0];null==i||null===(e=i.parentNode)||void 0===e||e.insertBefore(t,i)};"complete"===document.readyState?o():window.attachEvent?window.attachEvent("onload",o):window.addEventListener("load",o,!1)}}();

    const {token} = match.params;

    const {showModalAuth, setTokenModalAuth} = useContext(AppContext);

    const [topBanners, setTopBanners] = useState([]);
    const [bannerCategories, setBannerCategories] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [middleBanners, setMiddleBanners] = useState([]);
    const [bottomBanners, setBottomBanners] = useState([]);
    const [brands, setBrands] = useState([]);
    const [outstandings, setOutstandings] = useState([]);
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

            <BannerStatic banners={middleBanners}/>
            <BannerCategories bannerCategories={bannerCategories}/>

            {/* <BestSeller bestSellers={bestSellers}/> */}

            {/* <BlogCarousel title="BLOG" showButton={true} buttonTitle="VER MÁS NOTICIAS" /> */}

            {/*<BannerStatic banners={bottomBanners}/>*/}

            {/*<BlogPosts blogPosts={blogPosts} isLoaded={isLoaded}/>*/}

            <OutstandingCarousel title="Destacados" outstandings={outstandings}/>

            {/* <OurBrands brands={brands}/> */}

            <Subscribe/>
        </div>
    );
};

export default Home;
