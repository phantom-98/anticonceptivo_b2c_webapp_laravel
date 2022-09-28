import React, { useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {CONFIG} from "../../Config";
import { AppContext } from "../../context/AppProvider";
import {BREAKPOINTS} from "../../helpers/vars";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";
import "swiper/scss/autoplay";
import "swiper/scss/lazy";

// import required modules
import { Navigation, Pagination, EffectFade, Autoplay, Lazy } from "swiper";

const SwiperCarousel = ({banners}) => {
    const {breakpoint} = useContext(AppContext)

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-navigation-size": "45px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                }}
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                speed={1500}
                effect={"fade"}
                loop={true}
                modules={[
                    Navigation,
                    Pagination,
                    EffectFade,
                    Autoplay,
                    Lazy,
                ]}
                className="my-swiper">
                    {
                        banners.map((banner, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img
                                        alt={CONFIG.APP_NAME}
                                        src={breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? banner.public_file : banner.public_file_responsive ?? banner.public_file}
                                        className="swiper-lazy"
                                    />
                                    {
                                        banner.button_title && (
                                            <div className={"font-poppins  color-033F5D " + breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? "banner-buttons-2-swiper " : "banner-buttons-r-2-swiper"}>
                                            <a href={banner.button_link} target={banner.button_target} className="btn btn-bicolor btn-block white-space text-nowrap">
                                                <span className={" " + (breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? "font-20 pl-4 pr-4" : "font-15 pl-3 pr-3")} style={{lineHeight:'30px'}}>{banner.button_title}</span>
                                            </a>
                                        </div>
                                        )
                                    }
                                </SwiperSlide>
                            )
                        })
                    }
            </Swiper>
        </>
      );
}

export default SwiperCarousel;
