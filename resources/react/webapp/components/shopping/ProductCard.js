import React, {useState, Fragment} from 'react';
import {CONFIG} from "../../Config";
import {formatMoney} from "../../helpers/GlobalUtils";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import {Link} from "react-router-dom";
import AddCartCard from "./AddCartCard";
import noImage from "../../assets/images/producto-default.png";

const ProductCard = ({product, className = '', subscriptionFilter = []}) => {

    const [quantity, setQuantity] = useState(1);

    const handleSubscriptionImage = (prod) => {
        if (prod.images.length < 6) {
            return noImage;
        }

        if (subscriptionFilter.includes(1)) {
            return prod.images[3].public_file
        }

        if (subscriptionFilter.includes(2)) {
            return prod.images[4].public_file
        }

        if (subscriptionFilter.includes(3)) {
            return prod.images[5].public_file
        }
    }

    const handlePrice = (prod) => {

        if (!prod.plans) {
            return null;
        }

        if (!prod.plans.length) {
            return null;
        }

        if (subscriptionFilter.includes(1)) {
            return prod.plans[0].price;
        }

        if (subscriptionFilter.includes(2)) {
            return prod.plans[1].price;
        }

        if (subscriptionFilter.includes(3)) {
            return prod.plans[2].price;
        }
    }

    const handleText = (prod, mobile = false) => {
        if (!prod.plans.length) {
            return null;
        }

        if (subscriptionFilter.includes(1)) {
            return(
                 <>
                    <span className={`font-poppins ${!mobile ? 'font-16' : 'font-12'} ${mobile ? 'd-block' : ''} bold color-009BE8 ${!mobile ? 'ml-2' : ''}`}>
                        Al mes c/u
                    </span>
                    <span className={`font-poppins ${!mobile ? 'font-16' : 'font-12'} ${mobile ? 'd-block' : ''} bold color-78d2ff ${!mobile ? 'ml-2' : ''}`}>
                        (Ahorra un{" "}{Math.round(((prod.price - prod.plans[0].price) / prod.price) * 100)} %)
                    </span>
                </>
            )
        }

        if (subscriptionFilter.includes(2)) {
            return(
                 <>
                    <span className={`font-poppins ${!mobile ? 'font-16' : 'font-12'} ${mobile ? 'd-block' : ''} bold color-009BE8 ${!mobile ? 'ml-2' : ''}`}>
                        Al mes c/u
                    </span>
                    <span className={`font-poppins ${!mobile ? 'font-16' : 'font-12'} ${mobile ? 'd-block' : ''} bold color-78d2ff ${!mobile ? 'ml-2' : ''}`}>
                        (Ahorra un{" "}{Math.round(((prod.price - prod.plans[1].price) / prod.price) * 100)} %)
                    </span>
                </>
            )
        }

        if (subscriptionFilter.includes(3)) {
            return(
                 <>
                    <span className={`font-poppins ${!mobile ? 'font-16' : 'font-12'} ${mobile ? 'd-block' : ''} bold color-009BE8 ${!mobile ? 'ml-2' : ''}`}>
                        Al mes c/u
                    </span>
                    <span className={`font-poppins ${!mobile ? 'font-16' : 'font-12'} ${mobile ? 'd-block' : ''} bold color-78d2ff ${!mobile ? 'ml-2' : ''}`}>
                        (Ahorra un{" "}{Math.round(((prod.price - prod.plans[2].price) / prod.price) * 100)} %)
                    </span>
                </>
            )
        }
    }

    const handleSubscription = (prod) => {
        if (!prod.plans) {
            return null;
        }

        if (!prod.plans.length) {
            return null;
        }

        if (subscriptionFilter.includes(1)) {
            return prod.plans[0];
        }

        if (subscriptionFilter.includes(2)) {
            return prod.plans[1];
        }

        if (subscriptionFilter.includes(3)) {
            return prod.plans[2];
        }
    }

    return (
        <Fragment>
            <div className={`d-none d-md-block product-card ${className}`}>
                <div className="product-card-image">
                    <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                          style={{textDecoration: 'none', color: '#000000'}}>
                        <img src={subscriptionFilter.length ? handleSubscriptionImage(product) : product.images[0].public_file} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
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
                        </Link>
                    </div>
                    <div className="product-card-price">
                        {
                            formatMoney(
                                subscriptionFilter.length ?
                                    handlePrice(product) : product.is_offer
                                ? product.offer_price : product.price)

                        }
                        {
                            subscriptionFilter.length ?
                                handleText(product)
                            :
                                product.is_offer ?
                                    <span className="font-poppins font-16 bold color-009BE8"><s>{' '}{formatMoney(product.price)}</s></span>
                                : null
                        }
                    </div>
                </div>
                <div className="product-card-cart">
                    <AddCartCard quantity={quantity} setQuantity={setQuantity} product={product} subscription={handleSubscription(product)}/>
                </div>
            </div>

            {/* mobile*/}

            <div className={`d-md-none d-block product-card ${className}`}>
                <div className="row">
                    <div className="col-12 text-center">
                        <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                              style={{textDecoration: 'none', color: '#000000'}}>
                            <img className="mobile-producto-img mb-2" src={subscriptionFilter.length ? handleSubscriptionImage(product) : product.images[0].public_file} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                        </Link>
                    </div>
                    <div className="col-12">
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
                        <div className="product-card-price">
                            {/* {
                                formatMoney(product.is_offer ?
                                    product.offer_price :
                                product.price)}
                            {
                                product.is_offer ?
                                    <span className="font-poppins font-16 bold color-009BE8"><s>{' '}{formatMoney(product.price)}</s></span>
                                    : null
                            } */}

                            {
                                formatMoney(
                                    subscriptionFilter.length ?
                                        handlePrice(product)
                                    : product.is_offer ?
                                        product.offer_price
                                        : product.price)
                            }
                        </div>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col">
                        <div className="product-card-cart">
                            <AddCartCard quantity={quantity} setQuantity={setQuantity} product={product} subscription={handleSubscription(product)}/>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default ProductCard
