import React, {useState, useEffect} from 'react';
import {CONFIG} from "../../Config";
import {formatMoney} from "../../helpers/GlobalUtils";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {Link} from "react-router-dom";
import AddCartCard from "./AddCartCard";

const ProductCard = ({product, className = ''}) => {

    const [quantity, setQuantity] = useState(1);

    return (
        <div className={`product-card ${className}`}>
            <div className="product-card-image">
                <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                      style={{textDecoration: 'none', color: '#000000'}}>
                    <img src={product.images[0].file} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                </Link>
            </div>
            <div className="product-card-body">
                <div className="product-card-brand">{product.laboratory.name}</div>
                <div className="product-card-name">
                    <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                          style={{textDecoration: 'none', color: '#000000'}}>
                        {product.name}
                    </Link>
                </div>
                <div className="product-card-price">{formatMoney(product.price)}</div>
            </div>
            <div className="product-card-cart">
                <AddCartCard quantity={quantity} setQuantity={setQuantity} product={product}/>
            </div>
        </div>
    );
};

export default ProductCard
