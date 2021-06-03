import React, {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {dummy_products} from "../../helpers/productsData";
import LazyLoading from "../LazyLoading";
import ProductCard from "../shopping/ProductCard";
import H2Title from "../general/H2Title";
import { v4 as uuidv4 } from 'uuid';

const ProductsCarouselV2 = ({title, prods}) => {

    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: prods.length > 4 ? 4 : prods.length,
        slidesToScroll: 4,
        variableWidth: true
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
                <div className="row pt-5 pb-5 mb-5 ">

                    <div className="col-12 py-4">
                        <H2Title text={title}/>
                    </div>

                    <div className="col-12">
                        <Slider {...settings}>
                            {
                                loaded ?
                                    products.map((product) => {
                                        let uuid = uuidv4();
                                        return (
                                            <div key={uuid} className="px-3 mb-3" style={{ width: 285 }}>
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