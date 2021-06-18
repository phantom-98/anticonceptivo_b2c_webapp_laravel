import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LazyLoading from "../LazyLoading";
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";

const BannerCarousel = ({banners}) => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };

    return (
        <div className="">
            <Slider {...settings}>
                {
                    banners.length ?
                        banners.map((banner) => {
                            let topBannerKey = uuidv4();
                            return (
                                <div>
                                    <img key={topBannerKey} src={banner.public_file} alt={CONFIG.APP_NAME} width="100%"/>
                                </div>
                            )
                        })
                    : <LazyLoading/>
                }
            </Slider>
        </div>
    );
};

export default BannerCarousel
