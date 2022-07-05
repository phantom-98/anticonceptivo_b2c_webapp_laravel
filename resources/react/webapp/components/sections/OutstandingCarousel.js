import React, {useContext, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../shopping/ProductCard";
import H2Title from "../general/H2Title";
import { v4 as uuidv4 } from 'uuid';
import {AppContext} from "../../context/AppProvider";
import {BREAKPOINTS} from "../../helpers/vars";

const OutstandingCarousel = ({title, outstandings}) => {
    const {breakpoint} = useContext(AppContext)
    let contSlider = 0

    const settings ={
        dots: true,
        infinite: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 4500,
        slidesToShow: breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? (outstandings.length > 4 ? 4 : outstandings.length) : 2,
        slidesToScroll: breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? 4 : 2,

    };

    return (
        <div style={{background: '#FFFFFF'}}>
            <div className="container">
                <div className="row pt-5 pb-5 mb-5 card-products-gutters">

                    <div className="col-12 py-4">
                        <H2Title text={title}/>
                    </div>

                    <div className="col-12">
                        <Slider
                            {...settings}
                        >
                            {
                                outstandings.map((product, index) => {
                                        let uuid = uuidv4();
                                        let cont = 0
                                        if(outstandings.length -1 === index){
                                            if(breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE){
                                                while((index+1)%4!==0){
                                                    cont++
                                                    index++
                                                }
                                            }else{
                                                while((index+1)%2!==0){
                                                    cont++
                                                    index++
                                                }
                                            }
                                            contSlider = cont
                                        }
                                        return (
                                            <div key={uuid} className="px-2 mb-3">
                                                <ProductCard product={product}/>
                                            </div>
                                        )
                                    })
                            }
                            {
                                [...Array(contSlider).keys()].map((item, index) => {
                                    let uuid = uuidv4();
                                    return (
                                        <div key={uuid} className="px-2 mb-3">
                                            <ProductCard product={outstandings[item]}/>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutstandingCarousel
