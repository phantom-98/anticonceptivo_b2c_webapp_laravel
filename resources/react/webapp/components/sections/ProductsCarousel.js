import React, {useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {dummy_products} from "../../helpers/productsData";
import LazyLoading from "../LazyLoading";
import ProductCard from "../shopping/ProductCard";
import H2Title from "../general/H2Title";


const ProductsCarousel = ({title}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        setProducts(dummy_products);
        setLoaded(true)
    }

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
                                    products.map((product, index) => {
                                        return <div key={index} className="px-3 mb-3">
                                            <ProductCard product={product}/>
                                        </div>
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

export default ProductsCarousel
