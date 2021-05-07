import React from 'react';

import H2Title from "../general/H2Title";
import {dummy_products} from "../../helpers/productsData";
import ProductCard from "../shopping/ProductCard";

const BestSeller = () => {
    return (
        <div className="py-5">
            <div className="container">
                <div className="row py-3">
                    <div className="col-12">
                        <H2Title text="Más vendidos"/>
                    </div>
                </div>

                <div className="row py-3">
                    {
                        dummy_products.map((product, index) => {
                            return <div className="col-md-5th-1 mb-3" >
                                <ProductCard product={product} className="product-card-small"/>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default BestSeller
