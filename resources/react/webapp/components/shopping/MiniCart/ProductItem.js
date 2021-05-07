import React, {useContext, useEffect, useState} from 'react';
import {CONFIG} from "../../../Config";
import {formatMoney} from "../../../helpers/GlobalUtils";
import Icon from "../../general/Icon";
import iconRemove from "../../../assets/images/icons/remove-mini-cart.svg";
import {CartContext} from "../../../context/CartProvider";
import QuantityInput from "../QuantityInput";

const ProductItem = ({item}) => {

    const {removeFromCart, updateQuantity} = useContext(CartContext);

    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        updateQuantity(quantity, item.product)
    }, [quantity])

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-auto">
                    <img src={item.product.image} alt={CONFIG.APP_NAME} style={{width: '77px'}}/>
                </div>
                <div className="col">

                    <div className="font-poppins font-12 color-009BE8"> SKU: 190081</div>
                    <div className="font-poppins font-14 bold text-black"> {item.product.name} </div>
                    <div className="font-poppins font-16 bold color-009BE8">
                        {formatMoney(item.product.price * item.quantity)}
                    </div>

                    <div className="row">
                        <div className="col pt-2">
                            <QuantityInput quantity={item.quantity} setQuantity={setQuantity}/>
                        </div>
                        <div className="col-auto pt-1 text-center pointer" onClick={() => removeFromCart(item.product_id)}>
                            <div><Icon path={iconRemove}/></div>
                            <div className="font-poppins font-12 color-A3A3A3">BORRAR</div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <hr/>
                </div>
            </div>

        </div>
    );
};

export default ProductItem
