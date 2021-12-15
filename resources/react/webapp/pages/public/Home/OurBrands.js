import React, {useContext} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import H2Title from "../../../components/general/H2Title";
import {CONFIG} from "../../../Config";
import { v4 as uuidv4 } from 'uuid';
import { BREAKPOINTS } from "../../../helpers/vars";
import { AppContext } from "../../../context/AppProvider";
import SliderArrowRight from '../../../assets/images/icons/slider-arrow-right.png';
import SliderArrowLeft from '../../../assets/images/icons/slider-arrow-left.png';

const OurBrands = ({brands}) => {

    const { breakpoint } = useContext(AppContext);

    function Arrow(props) {

        let className = props.type === "next" ? "nextArrow" : "prevArrow";

        className += " arrow";

        let right = {
            position: 'absolute',
            height: '25px',
            top: '15%',
            right: '0px',
            zIndex: 1,
        }

        let left = {
            position: 'absolute',
            height: '25px',
            top: '15%',
            left: '0px',
            zIndex: 1,
        }

        return (
            props.type == 'next' ?
                <img src={SliderArrowRight} onClick={props.onClick} className={`pointer ${className}`} style={right} alt="anticonceptivo" />
                : <img src={SliderArrowLeft} onClick={props.onClick} className={`pointer ${className}`} style={left} alt="anticonceptivo" />
        );
    }

    const settings = {
        className: "center",
        infinite: true,
        centerMode: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        prevArrow: <Arrow type="prev" />,
        nextArrow: <Arrow type="next" />,
    };

    const containerStyle = {
        height: '284px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }

    return (
        <div className="mt-5" style={{ backgroundColor: 'white' }}>
            <div className="container" style={containerStyle}>
                <div className="row mb-4">
                    <div className="col-12">
                        <H2Title text="nuestras marcas" className="text-black" />
                    </div>
                </div>
                {
                    breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                        <div className="row py-3">
                            {
                                brands.map((brand, index) => {
                                    let brandKey = uuidv4();
                                    return <div key={brandKey} className="col">
                                        <a href={brand.url} target="_blank">
                                            <img src={brand.public_image}
                                                alt={CONFIG.APP_NAME}
                                                className="my-auto"
                                                style={{ width: '100%', maxHeight: '50px', objectFit: 'contain' }} />
                                        </a>
                                    </div>
                                })
                            }
                        </div>
                : 
                    <>
                        <Slider {...settings}>
                            {
                                brands.map(brand => (
                                    <div  key={uuidv4()}>
                                        <img
                                            src={brand.public_image}
                                            alt={CONFIG.APP_NAME}
                                            className="mx-auto"
                                            style={{ maxHeight: '40px', objectFit: 'contain' }}
                                        />
                                    </div>
                                ))
                            }
                        </Slider>
                    </>
                }
            </div>
        </div>
    );
};

export default OurBrands
