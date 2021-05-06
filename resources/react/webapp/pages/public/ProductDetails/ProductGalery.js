import React from 'react';
import {CONFIG} from "../../../Config";

const ProductGallery = ({product}) => {
    return (
        <div className="row">
            <div className="col-auto mr-0 pr-0" style={{width: '118px'}}>
                {
                    [1, 2, 3, 4].map((img, index) => {
                        return <div key={index} className="img-box-product-mini mb-3 pointer">
                            <img src={product.image} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                        </div>
                    })
                }
            </div>
            <div className="col">
                <div className="img-box-product">
                    <img src={product.image} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery
