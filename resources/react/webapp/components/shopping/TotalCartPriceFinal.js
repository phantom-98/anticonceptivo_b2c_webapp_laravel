import React, {Fragment, useContext, useEffect, useState} from 'react';
import {formatMoney} from "../../helpers/GlobalUtils";
import {CartContext} from "../../context/CartProvider";

const TotalCartPriceFinal = ({discount, discountType, total, setTotal, subtotal, setSubtotal, dispatch}) => {

    const {cartItems} = useContext(CartContext);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(()=>{
        let _total = 0;
        let _total_discount = discount === 0 ? 0 : (discountType === 0 ? discount : Math.round(subtotal*discount))*-1;
        let _sub_total = 0;

        cartItems.map((item) =>{
            let _temp_total = 0;
            let _temp_sub_total = 0;
            let _temp_discount = 0;

            if(item.subscription != null){
                _temp_total = item.quantity * item.subscription.price * item.subscription.quantity
                _temp_sub_total = item.quantity * (item.product.price * item.subscription.quantity)
                _temp_discount = _temp_sub_total - _temp_total;
            }else{
                _temp_total = item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price)
                _temp_sub_total = item.quantity * item.product.price
                _temp_discount = _temp_sub_total - _temp_total;
            }

            _total += _temp_total;
            _sub_total += _temp_sub_total;
            _total_discount += _temp_discount;
        })

        setSubtotal(_sub_total);
        setTotalDiscount(_total_discount);

        if (discountType === 0) {
            _total = _total + dispatch - discount;
        }else{
            _total = _total - Math.round(_total*discount) + (dispatch);

        }

        setTotal(_total);
    }, [cartItems, discount,dispatch])

    return (
        <Fragment>
            <div className="row pt-3">
                <div className="col-auto">
                    <span className="font-poppins font-16 regular color-1F1F1F text-uppercase">Sub Total</span>
                </div>
                <div className="col text-right">
                    <span
                        className="font-poppins font-16 regular color-1F1F1F text-uppercase">{formatMoney(subtotal)}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <span className="font-poppins font-12 regular color-1F1F1F">Costo despacho</span>
                </div>
                <div className="col text-right">
                    <span
                        className="font-poppins font-12 regular color-1F1F1F">{formatMoney(dispatch)}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <span className="font-poppins font-12 bold color-033F5D">Total Descuento</span>
                </div>
                <div className="col text-right">
                    <span className="font-poppins font-12 bold color-033F5D">
                        {
                            formatMoney(totalDiscount)
                        }
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <hr/>
                </div>
                <div className="col-auto">
                    <span className="font-poppins font-23 bold color-033F5D text-uppercase">Total</span>
                </div>
                <div className="col text-right">
                    <span
                        className="font-poppins font-23 bold color-033F5D text-uppercase">{formatMoney(total)}</span>
                </div>
            </div>

        </Fragment>
    );
};

export default TotalCartPriceFinal
