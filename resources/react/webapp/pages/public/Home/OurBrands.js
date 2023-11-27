import React, { useState, useContext, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import H2Title from "../../../components/general/H2Title";
import { CONFIG } from "../../../Config";
import { v4 as uuidv4 } from "uuid";
import { BREAKPOINTS } from "../../../helpers/vars";
import { AppContext } from "../../../context/AppProvider";
import SliderArrowRight from "../../../assets/images/icons/slider-arrow-right.png";
import SliderArrowLeft from "../../../assets/images/icons/slider-arrow-left.png";
import * as Services from "../../../Services";

const OurBrands = () => {
    const { breakpoint } = useContext(AppContext);
    const [newBrands, setNewBrands] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (brands?.length) {
            brandBySeven();
        }
    }, [brands]);

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.CARROUSELS.GET_BRANDS;
        let data = {};
        Services.DoGet(url, data)
            .then((response) => {
                console.log(response);
                Services.Response({
                    response: response,
                    success: () => {
                        setBrands(response.data.brands);
                        //console.log(brands);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    function Arrow(props) {
        let className = props.type === "next" ? "nextArrow" : "prevArrow";

        className += " arrow";

        let right = {
            position: "absolute",
            height: "25px",
            top: "15%",
            right: "0px",
            zIndex: 1,
        };

        let left = {
            position: "absolute",
            height: "25px",
            top: "15%",
            left: "0px",
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
        className: "center",
        infinite: true,
        centerMode: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        prevArrow: <Arrow type="prev" />,
        nextArrow: <Arrow type="next" />,
    };

    const containerStyle = {
        height: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    };

    const brandBySeven = () => {
        let _brands = [...brands];
        let _final_brands = [];
        while (_brands.length) {
            _final_brands.push(_brands.splice(0, 7));
        }
        setNewBrands(_final_brands);
    };

    //return <div>{console.log(brands)}</div>;

    return (
        <div className="mt-2" style={{ backgroundColor: "white" }}>
            <div className="container" style={containerStyle}>
                <div className="row mb-4">
                    <div className="col-12">
                        <H2Title
                            text="Nuestras Marcas"
                            className="text-black"
                        />
                    </div>
                </div>
                {breakpoint === BREAKPOINTS.MEDIUM ||
                breakpoint === BREAKPOINTS.LARGE ||
                breakpoint === BREAKPOINTS.EXTRA_LARGE ||
                breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? (
                    newBrands.map((_brands, index) => {
                        return (
                            <div
                                key={uuidv4()}
                                //className="row py-3 justify-content-center"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {_brands.map((brand, indx) => {
                                    return (
                                        <div
                                            className=""
                                            key={uuidv4()}
                                            style={{
                                                // flex: "0 0 9.33333%",
                                                // maxWidth: "9.33333%",
                                                flex: "0 0 20%",
                                                maxWidth: "20%",

                                                margin: "0px 4rem",
                                            }}
                                        >
                                            <span className="m-auto">
                                                <a
                                                    href={brand.url}
                                                    target="_blank"
                                                >
                                                    <img
                                                        src={brand.public_image}
                                                        alt={CONFIG.APP_NAME}
                                                        className=""
                                                        style={{
                                                            width: "100%",
                                                            maxHeight: "100px",
                                                            objectFit:
                                                                "contain",
                                                        }}
                                                    />
                                                </a>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                ) : (
                    <>
                        <Slider {...settings}>
                            {brands.map((brand) => (
                                <div key={uuidv4()}>
                                    <img
                                        src={brand.public_image}
                                        alt={CONFIG.APP_NAME}
                                        className="mx-auto"
                                        style={{
                                            maxHeight: "50px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </>
                )}
            </div>
        </div>
    );
};

export default OurBrands;
