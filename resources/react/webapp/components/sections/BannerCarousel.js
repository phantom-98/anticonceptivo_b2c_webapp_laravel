import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";
import SliderArrow from '../general/SliderArrow';
import SliderArrowRight from '../../assets/images/icons/slider-arrow-right.svg';
import SliderArrowLeft from '../../assets/images/icons/slider-arrow-left.svg';
import Icon from '../general/Icon';

const BannerCarousel = ({topBanners}) => {

    function Arrow(props) {
        let className = props.type === "next" ? "nextArrow" : "prevArrow";
        className += " arrow";

        let right = {
            position: 'absolute',
            top: '45%',
            right: '10px',
            zIndex: 1,
        }

        let left = {
            position: 'absolute',
            top: '45%',
            left: '10px',
            zIndex: 1,
        }

        return (
            props.type == 'next' ? 
                <img src={SliderArrowRight} onClick={props.onClick} className={`pointer ${className}`} style={right}/>
            : <img src={SliderArrowLeft} onClick={props.onClick} className={`pointer ${className}`} style={left}/>
        );
    }

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 4500,
        // cssEase: "linear",
        prevArrow: <Arrow type="prev"/>,
        nextArrow: <Arrow type="next"/>,
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
                                    <img src={banner.public_file} alt={CONFIG.APP_NAME} style={{height:388, width:'100%'}}/>
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
                                        <img src={banner.public_file} alt={CONFIG.APP_NAME} style={{height:388, width:'100%'}}/>
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
