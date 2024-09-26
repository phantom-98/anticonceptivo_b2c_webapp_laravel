import React, { useContext, useEffect, useState } from "react";
import { CONFIG } from "../../../Config";
import { formatMoney } from "../../../helpers/GlobalUtils";
import Icon from "../../general/Icon";
import iconRemove from "../../../assets/images/icons/remove-mini-cart.svg";
import { CartContext } from "../../../context/CartProvider";
import QuantityInput from "../QuantityInput";
import noImage from "../../../assets/images/producto-default.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductItem = ({ item }) => {
    // console.log(item);
    const { removeFromCart, updateQuantity } = useContext(CartContext);

    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        updateQuantity(quantity, item.product, item.subscription);
    }, [quantity]);

    return (
        <div className="col-12 product-item">
            <div className="row">
                <div className="col-auto">
                    <LazyLoadImage
                        alt={CONFIG.APP_NAME}
                        title="Anticonceptivo"
                        width={77}
                        rel="nofollow"
                        effect="blur"
                        src={
                            item.product.images.length
                                ? item.product.images[0].public_file
                                : noImage
                        }
                    />
                </div>
                <div className="col">
                    <h3 className="font-poppins font-12 color-009BE8">
                        {item.product.sku}
                    </h3>
                    <h3 className="font-poppins font-14 bold text-black">
                        {item.subscription == null
                            ? item.product.name
                            : item.product.name + " (" + "suscripción" + ")"}
                    </h3>
                    <div className="font-poppins font-16 bold color-009BE8">
                        {item.subscription == null
                            ? formatMoney(
                                  item.quantity *
                                      (item.product.is_offer
                                          ? item.product.offer_price
                                          : item.product.price)
                              )
                            : formatMoney(
                                  item.subscription.price *
                                      item.subscription.quantity *
                                      item.quantity
                              ) +
                              " (" +
                              formatMoney(item.subscription.price) +
                              " c/u)"}
                    </div>

                    <div className="row">
                        <div className="col pt-2">
                            {item.subscription != null ? null : (
                                <QuantityInput
                                    quantity={item.quantity}
                                    setQuantity={setQuantity}
                                    maxQuantity={
                                        item.product.stock >=
                                        item.product.subcategory.category
                                            .quantity_limit
                                            ? item.product.subcategory.category
                                                  .quantity_limit
                                            : item.product.stock
                                    }
                                />
                            )}
                        </div>
                        <div
                            className="col-auto pt-1 text-center pointer"
                            onClick={() => removeFromCart(item)}
                        >
                            <div>
                                <Icon path={iconRemove} />
                            </div>
                            <h4 className="font-poppins font-12 color-A3A3A3">
                                BORRAR
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line" />
        </div>
    );
};

export default ProductItem;
