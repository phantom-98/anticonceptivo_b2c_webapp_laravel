import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LazyLoading from "../LazyLoading";
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";
import {Link} from "react-router-dom";

const BannerCarousel = ({topBanners}) => {

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 150000, // 4500
        cssEase: "linear"
    };

    return (
        <Slider {...settings}>
            {
                topBanners.length ?
                    topBanners.map((banner) => {
                        let topBannerKey = uuidv4();
                        return (
                            <div>
                                <img key={topBannerKey} src={banner.public_file} alt={CONFIG.APP_NAME} width="100%"/>
                                <div className="testing font-poppins font-35 bold color-033F5D">
                                    <span style={{backgroundColor: 'white'}}>{banner.title}</span>
                                </div>
                                {
                                    banner.button_title ? 
                                    <div className="testing-2 font-poppins font-35 bold color-033F5D">
                                        <Link to={'#'} className="btn btn-bicolor btn-block">
                                            <span style={{lineHeight:'35px'}}>{banner.button_title}</span>
                                        </Link>
                                    </div> : null
                                }
                            </div>
                        )
                    })
                : <LazyLoading/>
            }
        </Slider>
    );
};

export default BannerCarousel
