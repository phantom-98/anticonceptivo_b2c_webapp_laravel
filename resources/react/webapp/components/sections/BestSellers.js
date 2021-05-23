import React, {useState, useEffect} from 'react';
import H2Title from "../general/H2Title";
// import {dummy_products} from "../../helpers/productsData";
import ProductCard from "../shopping/ProductCard";
import { v4 as uuidv4 } from 'uuid';
import * as Services from "../../Services";

const BestSeller = () => {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        let url = Services.ENDPOINT.NO_AUTH.PRODUCT.GET;
        let data = {}
        Services.DoGet(url,data).then(response => {
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
        loaded ? 
            <div className="py-5">
                <div className="container">
                    <div className="row py-3">
                        <div className="col-12">
                            <H2Title text="Más vendidos"/>
                        </div>
                    </div>

                    <div className="row py-3">
                        {
                            products.map((product, index) => {
                                let uuid = uuidv4();
                                return (<div className="col-md-5th-1 mb-3" key={uuid}>
                                    <ProductCard product={product} className="product-card-small"/>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        : null
    );
};

export default BestSeller
