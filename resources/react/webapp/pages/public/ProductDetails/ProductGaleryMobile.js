import React, {useEffect, useRef} from 'react'
import Slider from "react-slick";
import {v4 as uuid} from 'uuid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                Array.isArray(images) ?
                    images.map(image => {
                        return (
                            <div key={uuid()} className="col-12">
                                <LazyLoadImage
                                    alt="anticonceptivo.cl"
                                    title="Anticonceptivo"
                                    width={'100%'}
                                    rel="nofollow"
                                    effect="blur"
                                    src={image ? image.public_file : ''}
                                />
                            </div>
                        )
                    })
                :
                    <div key={uuid()} className="col-12">
                        <LazyLoadImage
                            alt="anticonceptivo.cl"
                            title="Anticonceptivo"
                            width={'100%'}
                            rel="nofollow"
                            effect="blur"
                            src={images}
                        />
                    </div>
            }
        </Slider>
    );
}

export default ProductGaleryMobile;
