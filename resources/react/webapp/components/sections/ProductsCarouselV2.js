import React, {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {dummy_products} from "../../helpers/productsData";
import LazyLoading from "../LazyLoading";
import ProductCard from "../shopping/ProductCard";
import H2Title from "../general/H2Title";
import { v4 as uuidv4 } from 'uuid';
import UseWindowDimensions from "../../helpers/UseWindowDimensions";

const ProductsCarouselV2 = ({title, prods}) => {

    const { width } = UseWindowDimensions();

    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: width > 768 ? (prods.length > 4 ? 4 : prods.length) : 2,
        slidesToScroll: width > 768 ? 4 : 2,
        variableWidth: false
    };

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (prods) {
            setProducts(prods);
            setLoaded(true);
        }
    }, [prods])

    return (
        <div style={{background: '#FFFFFF'}}>
            <div className="container">
                <div className="row pb-5 mb-5 ">
                    {products.length > 0 ?
                        <div className="col-12 py-4">
                            <H2Title text={title}/>
                        </div>
                        : null
                    }

                    <div className="col-12">
                        <Slider {...settings}>
                            {
                                loaded ?
                                    products.map((product) => {
                                        let uuid = uuidv4();
                                        return (
                                            width > 768 ?
                                            <div key={uuid} className="px-3 mb-3" style={{ width: 285 }}>
                                                <ProductCard product={product}/>
                                            </div>
                                            : 
                                            <div key={uuid} className="px-1 mb-1" style={{ width: 285 }}>
                                                <ProductCard product={product}/>
                                            </div>

                                        )
                                    })
                                    : <LazyLoading/>
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsCarouselV2
