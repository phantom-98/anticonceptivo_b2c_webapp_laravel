import React from 'react';
import H2Title from "../general/H2Title";
import ProductCard from "../shopping/ProductCard";
import { v4 as uuidv4 } from 'uuid';

const CondomProduct = ({condomProducts}) => {

    return (
        <div className="py-3" style={{background: '#FFFFFF'}}>
            <div className="container">
                <div className="row py-3">
                    <div className="col-12">
                        <H2Title text="Preservativos"/>
                    </div>
                </div>

                <div className="row py-3">
                    <div className="col-12 pb-3">
                        <div className="row card-products-gutters">
                            {
                                condomProducts.map((product, index) => {
                                    let uuid = uuidv4();
                                    return (<div className="col-6 col-md-6 col-lg-3 mb-3" key={uuid}>
                                        <ProductCard product={product}/>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center">
                        <a style={{textDecoration:"underline"}} href="https://dev.anticonceptivo.tienda.innovaweb.cl/tienda/preservativos/condones">Ver más</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CondomProduct