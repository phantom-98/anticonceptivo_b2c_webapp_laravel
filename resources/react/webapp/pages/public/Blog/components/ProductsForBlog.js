import React, { useEffect, useState, useContext } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LazyLoading from "../../../../components/LazyLoading";
import ProductCard from "../../../../components/shopping/ProductCard";
import H2Title from "../../../../components/general/H2Title";
import * as Services from "../../../../Services";
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from "../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../helpers/vars";

const ProductsForBlog = ({ title }) => {

    const {breakpoint} = useContext(AppContext)
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const settings = {
        className: "slider variable-width product-carousel",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? (products.length > 4 ? 4 : products.length) : 2,
        slidesToScroll: breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? 4 : 2,
        variableWidth: false,
    };

    useEffect(() => {
        getProducts();
    }, [])
    

    const getProducts = () => {
        let url = Services.ENDPOINT.NO_AUTH.PRODUCTS_FOR_BLOG;
        let data = {}
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProducts(response.data.products);
                    setLoaded(true);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div style={{ background: '#FFFFFF' }}>
            <div className="container">
                <div className="row pt-5 pb-5 mb-5 ">

                    <div className="col-12 py-4">
                        <H2Title text={title} />
                    </div>

                    <div className="col-12">
                        <Slider {...settings}>
                            {
                                loaded ?
                                    products.map(product => 
                                        <div key={uuidv4()} className="px-3 mb-3">
                                            <ProductCard product={product} />
                                        </div>
                                    )
                                    : <LazyLoading />
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsForBlog
