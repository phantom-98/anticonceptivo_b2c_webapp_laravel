import React, {useContext, useEffect, useState} from 'react';
import {CONFIG} from "../../Config";
import {formatMoney} from "../../helpers/GlobalUtils";
import Icon from "../general/Icon";
import iconRemove from "../../assets/images/icons/remove-mini-cart.svg";
import {CartContext} from "../../context/CartProvider";
import QuantityInput from "./QuantityInput";

const ProductItemList = ({item}) => {

    const {removeFromCart, updateQuantity} = useContext(CartContext);

    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        updateQuantity(quantity, item.product, item.subscription)
    }, [quantity])

    return (
        <div className="col-12 product-item">
            <div className="row">
                <div className="col-auto">
                    <img src={item.product.images ? item.product.images[0].public_file : null} alt={CONFIG.APP_NAME} style={{width: '77px'}}/>
                </div>
                <div className="col d-flex">
                    <div className="my-auto">
                        <div className="font-poppins font-12 color-009BE8 mb-1"> {item.product.sku}</div>
                        <div className="font-poppins font-14 bold text-black">
                        {
                        item.subscription == null ? item.product.name : item.product.name + ' ('+ 'suscripción' +')'
                        }
                        </div>
                    </div>
                </div>
                <div className="col-auto d-flex">
                    <div className="my-auto font-poppins font-16 bold color-009BE8">

                    {
                        item.subscription == null ?
                            formatMoney(item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price))
                        : formatMoney(item.subscription.price*item.subscription.quantity * item.quantity) + ' ('+ formatMoney(item.subscription.price)+' c/u)'
                    }

                    </div>
                </div>
                <div className="col-auto d-flex">
                    <div className="row my-auto">
                        <div className="col pt-2">

                            {item.subscription != null
                            ? null
                                : <QuantityInput quantity={item.quantity} setQuantity={setQuantity} maxQuantity={item.product.stock >= item.product.subcategory.category.quantity_limit ? item.product.subcategory.category.quantity_limit : item.product.stock}/>
                            }

                        </div>
                        <div className="col-auto pt-1 text-center pointer" onClick={() => removeFromCart(item)}>
                            <div><Icon path={iconRemove}/></div>
                            <div className="font-poppins font-12 color-A3A3A3">BORRAR</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line" />
        </div>
    );
};

export default ProductItemList
