import React from 'react'
import Slider from "react-slick";

const ProductGaleryMobile = ({images}) => {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {
                images.map(image => {
                    return(
                        <div className="col-12">
                            <img src={image.public_file} style={{width: '100%'}}/>
                        </div>
                    )
                })
            }
        </Slider>
    );
}

export default ProductGaleryMobile;