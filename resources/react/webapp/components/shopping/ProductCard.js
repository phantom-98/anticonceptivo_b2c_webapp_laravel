import React, { useState, Fragment } from "react";
import { CONFIG } from "../../Config";
import { formatMoney } from "../../helpers/GlobalUtils";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import { Link } from "react-router-dom";
import AddCartCard from "./AddCartCard";
import noImage from "../../assets/images/producto-default.png";
import IsImmediateLabel from "./IsImmediateLabel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({ product, className = "", subscriptionFilter = [] }) => {
    const [quantity, setQuantity] = useState(1);

    const handleSubscriptionImage = (prod) => {
        let plan_img = prod.plans.find(
            (x) => x.subscription_plan_id == subscriptionFilter[0]
        );

        if (plan_img && plan_img.public_image) {
            return plan_img.public_image;
        }

        return noImage;
    };

    const handlePrice = (prod) => {
        let plan_price = prod.plans.find(
            (x) => x.subscription_plan_id == subscriptionFilter[0]
        );

        if (plan_price) {
            return plan_price.price;
        }

        return 0;
    };

    const handleText = (prod, mobile = false) => {
        let product_plan = prod.plans.find(
            (x) => x.subscription_plan_id == subscriptionFilter[0]
        );

        if (product_plan) {
            return (
                <>
                    <span
                        className={`font-poppins ${
                            !mobile ? "font-16" : "font-12"
                        } ${mobile ? "d-block" : ""} bold color-009BE8 ${
                            !mobile ? "ml-2" : ""
                        }`}
                    >
                        Al mes c/u
                    </span>
                    <span
                        className={`font-poppins ${
                            !mobile ? "font-16" : "font-12"
                        } ${mobile ? "d-block" : ""} bold color-78d2ff ${
                            !mobile ? "ml-2" : ""
                        }`}
                    >
                        (Ahorra un{" "}
                        {Math.round(
                            ((prod.price - product_plan.price) / prod.price) *
                                100
                        )}{" "}
                        %)
                    </span>
                </>
            );
        }

        return null;
    };

    const handleSubscription = (prod) => {
        if (prod.plans) {
            let product_plan = prod.plans.find(
                (x) => x.subscription_plan_id == subscriptionFilter[0]
            );

            if (product_plan) {
                return product_plan;
            }
        }

        return null;
    };

    // console.group('PRODUCT CARD');
    // console.log(product);
    // console.log('slug' in product ? 'TIENE SLUG' : 'NO TIENE SLUG');
    // console.groupEnd();

    return (
        <Fragment>
            <div
                className={`d-none d-md-block product-card ${className}`}
                style={{
                    position: "relative",
                }}
            >
                <IsImmediateLabel product={product} />
                <div className="product-card-image">
                    <Link
                        to={PUBLIC_ROUTES.PRODUCT_DETAIL.path.replace(
                            ":slug?",
                            product.slug
                        )}
                        style={{ textDecoration: "none", color: "#000000" }}
                    >
                        <LazyLoadImage
                            alt={`${CONFIG.APP_NAME} - ${product.name}`}
                            placeholderSrc={noImage}
                            effect="blur"
                            src={
                                subscriptionFilter.length
                                    ? handleSubscriptionImage(product)
                                    : product.images.length
                                    ? product.images[0].public_file
                                    : noImage
                            }
                        />
                    </Link>
                </div>
                <div className="product-card-body text-left">
                    <div className="product-card-brand">
                        {product.laboratory.name}
                    </div>
                    <div className="product-card-name">
                        <Link
                            to={PUBLIC_ROUTES.PRODUCT_DETAIL.path.replace(
                                ":slug?",
                                product.slug
                            )}
                            style={{ textDecoration: "none", color: "#000000" }}
                        >
                            <div className="col-md-12 text-truncate p-0">
                                {product.name}
                            </div>
                        </Link>
                    </div>
                    <div className="product-card-price ">
                        {formatMoney(
                            subscriptionFilter.length
                                ? handlePrice(product)
                                : product.is_offer
                                ? product.offer_price
                                : product.price
                        )}
                        {subscriptionFilter.length ? (
                            handleText(product)
                        ) : product.is_offer ? (
                            <span className="font-poppins font-16 bold offer-price-color mx-1">
                                <s> {formatMoney(product.price)}</s>
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="product-card-cart">
                    <AddCartCard
                        quantity={quantity}
                        setQuantity={setQuantity}
                        product={product}
                        subscription={handleSubscription(product)}
                    />
                </div>
            </div>

            {/* mobile*/}

            <div
                className={`d-md-none d-block product-card ${className}`}
                style={{
                    position: "relative",
                }}
            >
                <div className="row">
                    <div className="col-12">
                        <IsImmediateLabel product={product} />
                    </div>
                    <div className="col-12 text-center">
                        <Link
                            to={PUBLIC_ROUTES.PRODUCT_DETAIL.path.replace(
                                ":slug?",
                                product.slug
                            )}
                            style={{ textDecoration: "none", color: "#000000" }}
                        >
                            <LazyLoadImage
                                alt={`${CONFIG.APP_NAME} - ${product.name}`}
                                className="mobile-producto-img mb-2"
                                placeholderSrc={noImage}
                                effect="blur"
                                src={
                                    subscriptionFilter.length
                                        ? handleSubscriptionImage(product)
                                        : product.images.length
                                        ? product.images[0].public_file
                                        : noImage
                                }
                            />
                        </Link>
                    </div>
                    <div className="col-12 text-left">
                        <div className="product-card-brand">
                            {product.laboratory.name}
                        </div>
                        <div className="product-card-name">
                            <Link
                                to={PUBLIC_ROUTES.PRODUCT_DETAIL.path.replace(
                                    ":slug?",
                                    product.slug
                                )}
                                style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                }}
                            >
                                <div className="col-md-12 text-truncate p-0">
                                    {product.name}
                                </div>
                            </Link>
                        </div>
                        <div className="product-card-price">
                            {formatMoney(
                                subscriptionFilter.length
                                    ? handlePrice(product)
                                    : product.is_offer
                                    ? product.offer_price
                                    : product.price
                            )}
                        </div>
                    </div>
                </div>
                <div className="row pt-3">
                    <div className="col">
                        <div className="product-card-cart">
                            <AddCartCard
                                quantity={quantity}
                                setQuantity={setQuantity}
                                product={product}
                                subscription={handleSubscription(product)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductCard;
