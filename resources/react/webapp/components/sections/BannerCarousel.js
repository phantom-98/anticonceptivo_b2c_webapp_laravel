import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import { CONFIG } from "../../Config";
import SliderArrowRight from "../../assets/images/icons/slider-arrow-right.png";
import SliderArrowLeft from "../../assets/images/icons/slider-arrow-left.png";
import { AppContext } from "../../context/AppProvider";
import { BREAKPOINTS } from "../../helpers/vars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BannerCarousel = ({ topBanners }) => {
    const { breakpoint } = useContext(AppContext);

    function Arrow(props) {
        let className = props.type === "next" ? "nextArrow" : "prevArrow";

        className += " arrow";

        let right = {
            position: "absolute",
            height: "45px",
            top: "45%",
            right: "25px",
            zIndex: 1,
        };

        let left = {
            position: "absolute",
            height: "45px",
            top: "45%",
            left: "25px",
            zIndex: 1,
        };

        return props.type == "next" ? (
            <img
                src={SliderArrowRight}
                onClick={props.onClick}
                className={`pointer ${className}`}
                style={right}
                alt="anticonceptivo"
            />
        ) : (
            <img
                src={SliderArrowLeft}
                onClick={props.onClick}
                className={`pointer ${className}`}
                style={left}
                alt="anticonceptivo"
            />
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
        prevArrow: <Arrow type="prev" />,
        nextArrow: <Arrow type="next" />,
    };

    return (
        <Slider {...settings}>
            {topBanners.length
                ? topBanners.map((banner) => {
                      let topBannerKey = uuidv4();
                      return banner.button_title ? (
                          <div key={topBannerKey}>
                              <LazyLoadImage
                                  alt={CONFIG.APP_NAME}
                                  effect="blur"
                                  src={
                                      breakpoint === BREAKPOINTS.MEDIUM ||
                                      breakpoint === BREAKPOINTS.LARGE ||
                                      breakpoint === BREAKPOINTS.EXTRA_LARGE ||
                                      breakpoint ===
                                          BREAKPOINTS.EXTRA_EXTRA_LARGE
                                          ? banner.public_file
                                          : banner.public_file_responsive ??
                                            banner.public_file
                                  }
                                  width={"100%"}
                                  height={"100%"}
                              />
                              <div className="banner-buttons font-poppins font-35 bold color-033F5D">
                                  <span style={{ backgroundColor: "white" }}>
                                      {banner.title}
                                  </span>
                              </div>
                              <div
                                  className={
                                      "font-poppins  color-033F5D " +
                                          breakpoint ===
                                          BREAKPOINTS.MEDIUM ||
                                      breakpoint === BREAKPOINTS.LARGE ||
                                      breakpoint === BREAKPOINTS.EXTRA_LARGE ||
                                      breakpoint ===
                                          BREAKPOINTS.EXTRA_EXTRA_LARGE
                                          ? "banner-buttons-2 "
                                          : "banner-buttons-r-2"
                                  }
                              >
                                  <a
                                      href={banner.button_link}
                                      target={banner.button_target}
                                      className="btn btn-bicolor btn-block white-space text-nowrap"
                                  >
                                      <span
                                          className={
                                              " " +
                                              (breakpoint ===
                                                  BREAKPOINTS.MEDIUM ||
                                              breakpoint ===
                                                  BREAKPOINTS.LARGE ||
                                              breakpoint ===
                                                  BREAKPOINTS.EXTRA_LARGE ||
                                              breakpoint ===
                                                  BREAKPOINTS.EXTRA_EXTRA_LARGE
                                                  ? "font-20 pl-4 pr-4"
                                                  : "font-15 pl-3 pr-3")
                                          }
                                          style={{ lineHeight: "35px" }}
                                      >
                                          {banner.button_title}
                                      </span>
                                  </a>
                              </div>
                          </div>
                      ) : (
                          <div key={topBannerKey}>
                              <a
                                  href={banner.button_link}
                                  target={banner.button_target}
                              >
                                  <LazyLoadImage
                                      alt={CONFIG.APP_NAME}
                                      effect="blur"
                                      src={
                                          breakpoint === BREAKPOINTS.MEDIUM ||
                                          breakpoint === BREAKPOINTS.LARGE ||
                                          breakpoint ===
                                              BREAKPOINTS.EXTRA_LARGE ||
                                          breakpoint ===
                                              BREAKPOINTS.EXTRA_EXTRA_LARGE
                                              ? banner.public_file
                                              : banner.public_file_responsive ??
                                                banner.public_file
                                      }
                                      width={"100%"}
                                      height={"100%"}
                                  />
                                  <div className="banner-buttons font-poppins font-35 bold color-033F5D">
                                      <span
                                          style={{ backgroundColor: "white" }}
                                      >
                                          {banner.title}
                                      </span>
                                  </div>
                              </a>
                          </div>
                      );
                  })
                : null}
        </Slider>
    );
};

export default BannerCarousel;
