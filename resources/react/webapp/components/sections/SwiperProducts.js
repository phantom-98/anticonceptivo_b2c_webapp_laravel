import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../shopping/ProductCard";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";
import "swiper/scss/autoplay";

// import required modules
import { Pagination, Autoplay } from "swiper";

const SwiperCarousel = ({products}) => {

    return (
        <>
            <Swiper
                slidesPerView={2}
                slidesPerGroup={2}
                breakpoints={{
                    // 1200:{
                    //     slidesPerView: 5,
                    //     slidesPerGroup: 5,
                    // },
                    992: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    576: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                }}
                spaceBetween={16}
                pagination={{
                    clickable: true,
                    type: 'bullets',
                }}
                style={{
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                    /*
                        --swiper-pagination-color: var(--swiper-theme-color);
                        --swiper-pagination-bullet-size: 8px;
                        --swiper-pagination-bullet-width: 8px;
                        --swiper-pagination-bullet-height: 8px;
                        --swiper-pagination-bullet-inactive-color: #000;
                        --swiper-pagination-bullet-inactive-opacity: 0.2;
                        --swiper-pagination-bullet-opacity: 1;
                        --swiper-pagination-bullet-horizontal-gap: 4px;
                        --swiper-pagination-bullet-vertical-gap: 6px;
                    */
                }}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={1500}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="my-swiper-container"
            >
                {
                    products.map((product, index) => {
                        return (
                            <SwiperSlide>
                                <div style={{width:'100%', display: 'inline-block'}}>
                                    <ProductCard
                                        key={index}
                                        product={product}
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    }
                )}
            </Swiper>
        </>
    );
}

export default SwiperCarousel;
