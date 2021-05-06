import React, {useState} from 'react';
import {CONFIG} from "../../Config";
import {formatMoney} from "../../helpers/GlobalUtils";
import QuantityInput from "./QuantityInput";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {Link} from "react-router-dom";

const ProductCard = ({product, className = ''}) => {

    const [quantity, setQuantity] = useState(1);

    return (
        <div className={`product-card ${className}`}>
            <div className="product-card-image">
                <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', product.slug)}>
                    <img src={product.image} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                </Link>
            </div>
            <div className="product-card-body">
                <div className="product-card-brand">{product.brand.name}</div>
                <div className="product-card-name">
                    <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', product.slug)}
                          style={{textDecoration: 'none', color: '#000000'}}>
                        {product.name}
                    </Link>
                </div>
                <div className="product-card-price">{formatMoney(product.price)}</div>
            </div>
            <div className="product-card-cart">
                <div className="row">
                    <div className="col-auto pr-1">
                        <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
                    </div>
                    <div className="col pl-1">
                        <button className="btn btn-outline-bicolor btn-add-cart btn-block px-1">
                            <span>AGREGAR AL CARRO</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard
