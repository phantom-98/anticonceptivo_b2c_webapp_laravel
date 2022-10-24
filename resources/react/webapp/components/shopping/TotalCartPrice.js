import React, {Fragment, useContext, useEffect, useState} from 'react';
import {formatMoney} from "../../helpers/GlobalUtils";
import {CartContext} from "../../context/CartProvider";

const TotalCartPrice = () =>{

    const {cartItems} = useContext(CartContext);
    const [totalCart, setTotalCart] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(()=>{
        let _total = 0;
        let _total_discount = 0;
        cartItems.map((item) =>{
            console.log('item', item);
            if(item.subscription != null){
                _total = _total + (item.quantity * item.subscription.price * item.subscription.quantity)
                _total_discount = _total_discount + (item.quantity * (item.product.price - item.subscription.price))
            }else{
                _total = _total + (item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price))
                _total_discount = _total_discount + (item.quantity * (item.product.price - (item.product.is_offer ? item.product.offer_price : item.product.price)))
            }
        })
        setTotalCart(_total);
        setTotalDiscount(_total_discount);
    },[cartItems])

    return (
        <Fragment>
            <div className="row pt-3">
                <div className="col-auto">
                    <span className="font-poppins font-16 regular color-1F1F1F text-uppercase">Sub Total</span>
                </div>
                <div className="col text-right">
                    <span className="font-poppins font-16 regular color-1F1F1F text-uppercase">{formatMoney(totalCart)}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <span className="font-poppins font-16 regular color-1F1F1F text-uppercase">Descuento</span>
                </div>
                <div className="col text-right">
                    <span className="font-poppins font-16 regular color-1F1F1F text-uppercase">{formatMoney(totalDiscount)}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <span className="font-poppins font-23 bold color-033F5D text-uppercase">Total</span>
                </div>
                <div className="col text-right">
                    <span className="font-poppins font-23 bold color-033F5D text-uppercase">{formatMoney(totalCart)}</span>
                </div>
            </div>
        </Fragment>
    );
};

export default TotalCartPrice
