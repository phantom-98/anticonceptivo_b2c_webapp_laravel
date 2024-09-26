import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LazyLoading from "../LazyLoading";
import ProductCard from "../shopping/ProductCard";
import H2Title from "../general/H2Title";
import * as Services from "../../Services";
import { v4 as uuidv4 } from "uuid";

const ProductsCarousel = ({ title }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        let url = Services.ENDPOINT.NO_AUTH.PRODUCT.GET;
        let data = {};
        Services.DoGet(url, data)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        setProducts(response.data.products);
                        setLoaded(true);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <div style={{ background: "#FFFFFF" }}>
            <div className="container">
                <div className="row pt-5 pb-5 mb-5 ">
                    <div className="col-12 py-4">
                        <H2Title text={title} />
                    </div>

                    <div className="col-12">
                        <Slider {...settings}>
                            {loaded ? (
                                products.map((product, index) => {
                                    let uuid = uuidv4();
                                    return (
                                        <div key={uuid} className="px-3 mb-3">
                                            <ProductCard product={product} />
                                        </div>
                                    );
                                })
                            ) : (
                                <LazyLoading />
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsCarousel;
