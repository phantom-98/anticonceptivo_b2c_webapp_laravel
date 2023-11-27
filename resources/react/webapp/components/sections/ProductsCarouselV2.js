import React, {useEffect, useState, useContext} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LazyLoading from "../LazyLoading";
import ProductCard from "../shopping/ProductCard";
import H2Title from "../general/H2Title";
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from "../../context/AppProvider";
import {BREAKPOINTS} from "../../helpers/vars";

const ProductsCarouselV2 = ({title, prods}) => {
    const {breakpoint} = useContext(AppContext)

    const settings = {
        className: "slider variable-width product-carousel",
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? (prods.length > 4 ? 4 : prods.length) : 2,
        slidesToScroll: breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? 4 : 2,
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
                                            breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
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
