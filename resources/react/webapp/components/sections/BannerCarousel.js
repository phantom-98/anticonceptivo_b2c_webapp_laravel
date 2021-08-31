import React, {Fragment} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";

const BannerCarousel = ({topBanners}) => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 4500, // 4500
        // cssEase: "linear"
    };

    return (
        <Slider {...settings}>
            {
                topBanners.length ?
                    topBanners.map((banner) => {
                        let topBannerKey = uuidv4();
                        return (        
                            banner.button_title ? 
                                <div key={topBannerKey}>
                                    <img src={banner.public_file} alt={CONFIG.APP_NAME} width="100%"/>
                                    <div className="banner-buttons font-poppins font-35 bold color-033F5D">
                                        <span style={{backgroundColor: 'white'}}>{banner.title}</span>
                                    </div>
                                    <div className="banner-buttons-2 font-poppins font-35 bold color-033F5D">
                                        <a href={banner.button_link} target={banner.button_target} className="btn btn-bicolor btn-block">
                                            <span style={{lineHeight:'35px'}}>{banner.button_title}</span>
                                        </a>
                                    </div> 
                                </div>
                            :
                                <div key={topBannerKey}>
                                    <a href={banner.button_link} target={banner.button_target}>
                                        <img src={banner.public_file} alt={CONFIG.APP_NAME} width="100%"/>
                                        <div className="banner-buttons font-poppins font-35 bold color-033F5D">
                                            <span style={{backgroundColor: 'white'}}>{banner.title}</span>
                                        </div>
                                    </a>
                                </div>
                        )
                    })
                : null
            }
        </Slider>
    );
};

export default BannerCarousel
