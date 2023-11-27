import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardList from "../shopping/ProductCardList";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/effect-fade";
import "swiper/scss/autoplay";

// import required modules
import SwiperCore, {Navigation, Pagination, Autoplay } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SwiperProductsList = ({products}) => {

    return (
        <>
            <Swiper
                slidesPerView={2}
                slidesPerGroup={2}
                breakpoints={{
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
                            <SwiperSlide key={product.id}>
                                <div style={{width:'100%', display: 'inline-block'}}>
                                    <ProductCardList
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

export default SwiperProductsList;
