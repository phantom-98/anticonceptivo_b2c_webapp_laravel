import React, {useState, useEffect, Fragment} from 'react';
import {CONFIG} from "../../Config";
import {formatMoney} from "../../helpers/GlobalUtils";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {Link} from "react-router-dom";
import AddCartCard from "./AddCartCard";
import noImage from "./../../assets/images/no-image.png";

const ProductCard = ({product, className = '', subscriptionFilter}) => {

    const [quantity, setQuantity] = useState(1);
    const [productImage, setProductImage] = useState(product.images[0].public_file);

    useEffect(() => {
        if (subscriptionFilter.length == 1) {
            setProductImage(handleSubscriptionImage(product));
        }
    },[subscriptionFilter])

    const handleSubscriptionImage = (prod) => {
        if (subscriptionFilter.includes(1)) {
            console.log('1')
            return prod.images[3].public_file
        }

        if (subscriptionFilter.includes(2)) {
            console.log('2')
            return prod.images[4].public_file
        }

        if (subscriptionFilter.includes(3)) {
            console.log('3')
            return prod.images[5].public_file
        }

        console.log('4');
    }

    return (
        <Fragment>
            <div className={`d-none d-md-block product-card ${className}`}>
                <div className="product-card-image">
                    <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                          style={{textDecoration: 'none', color: '#000000'}}>
                        <img src={productImage} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                    </Link>
                </div>
                <div className="product-card-body">
                    <div className="product-card-brand">{product.laboratory.name}</div>
                    <div className="product-card-name">
                        <Link  to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                               style={{textDecoration: 'none', color: '#000000'}}>
                            <div className="col-md-12 text-truncate p-0">
                                {product.name}
                            </div>
                            {/*{String(product.name).length >= 23 ? product.name.substring(0, 23) + '...' : product.name }*/}
                        </Link>
                    </div>
                    <div className="product-card-price">{formatMoney(product.is_offer ? product.offer_price : product.price)}
                        {
                            product.is_offer ?
                                <span className="font-poppins font-16 bold color-009BE8"><s>{' '}{formatMoney(product.price)}</s></span>
                                : null
                        }
                    </div>
                </div>
                <div className="product-card-cart">
                    <AddCartCard quantity={quantity} setQuantity={setQuantity} product={product}/>
                </div>
            </div>

            {/* mobile*/}

            <div className={`d-md-none d-block product-card ${className}`}>
                <div className="row">
                    <div className="col-auto">
                        <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                              style={{textDecoration: 'none', color: '#000000'}}>
                            <img className="mobile-producto-img" src={product.images.length ? product.images[0].public_file : noImage} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                        </Link>
                    </div>
                    <div className="col">
                        <div className="product-card-brand">{product.laboratory.name}</div>
                        <div className="product-card-name">
                            <Link  to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                                   style={{textDecoration: 'none', color: '#000000'}}>
                                <div className="col-md-12 text-truncate p-0">
                                    {product.name}

                                </div>
                                {/*{String(product.name).length >= 23 ? product.name.substring(0, 23) + '...' : product.name }*/}
                            </Link>
                        </div>
                        <div className="product-card-price">{formatMoney(product.is_offer ? product.offer_price : product.price)}
                            {
                                product.is_offer ?
                                    <span className="font-poppins font-16 bold color-009BE8"><s>{' '}{formatMoney(product.price)}</s></span>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col">
                        <div className="product-card-cart">
                            <AddCartCard quantity={quantity} setQuantity={setQuantity} product={product}/>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default ProductCard
