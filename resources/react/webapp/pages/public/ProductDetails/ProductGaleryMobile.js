import React, {useEffect, useRef} from 'react'
import Slider from "react-slick";
import {v4 as uuid} from 'uuid';

const ProductGaleryMobile = ({images}) => {

    const slider = useRef(null);

    useEffect(() => {
        slider.current.slickGoTo(0)
    }, [images])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings} ref={slider}>
            {
                images.map(image => {
                    return (
                        <div key={uuid()} className="col-12">
                            <img src={image.public_file} style={{width: '100%'}} alt="anticonceptivo.cl"/>
                        </div>
                    )
                })
            }
        </Slider>
    );
}

export default ProductGaleryMobile;
