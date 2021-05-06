import React from 'react';
import {CONFIG} from "../../Config";
import {formatMoney} from "../../helpers/GlobalUtils";

const ProductCard = ({product}) => {

    return (
        <div className="product-card">
            <div className="product-card-image">
                <img src={product.image} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
            </div>
            <div className="product-card-body">
                <div className="product-card-brand">{product.brand.name}</div>
                <div className="product-card-name">{product.name}</div>
                <div className="product-card-price">{formatMoney(product.price)}</div>
            </div>
            <div className="product-card-cart">
                <div className="row">
                    <div className="col-auto ml-1">
                        qat
                    </div>
                    <div className="col mr-1">
                        <button className="btn btn-outline-bicolor btn-add-cart btn-block">
                            <span>AGREGAR AL CARRO</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard
