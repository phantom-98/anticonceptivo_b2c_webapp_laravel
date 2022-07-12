import React from 'react';
import H2Title from "../general/H2Title";
import ProductCard from "../shopping/ProductCard";
import { v4 as uuidv4 } from 'uuid';

const CondomProduct = ({condomProducts}) => {

    return (
        <div className="py-5">
            <div className="container">
                <div className="row py-3">
                    <div className="col-12">
                        <H2Title text="Preservativos"/>
                    </div>
                </div>

                <div className="row py-3">
                    {
                        condomProducts.map((product, index) => {
                            let uuid = uuidv4();
                            return (<div className="col-md-5th-1 mb-3" key={uuid}>
                                <ProductCard product={product} className="product-card-small"/>
                            </div>)
                        })
                    }
                </div>

                <div className="row py-3">
                    <div className="col-12 text-center">
                        <a href="">Ver más</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CondomProduct