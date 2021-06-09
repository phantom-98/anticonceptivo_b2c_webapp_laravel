import React, {Fragment, useContext, useEffect, useState} from 'react';
import {formatMoney} from "../../helpers/GlobalUtils";
import {CartContext} from "../../context/CartProvider";

const TotalCartPriceFinal = () => {

    const {cartItems} = useContext(CartContext);
    const [totalCart, setTotalCart] = useState(0);

    const [dispatch, setDispatch] = useState(0)
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        let _total = 0;
        cartItems.map((item) => {
            if(item.subscription != null){
                _total = _total + (item.quantity * item.subscription.price)
                
            }else{
                _total = _total + (item.quantity * item.product.price)

            }
        })
        _total = _total + dispatch + discount;
        setTotalCart(_total);
    }, [cartItems])

    return (
        <Fragment>
            <div className="row pt-3">
                <div className="col-auto">
                    <span className="font-poppins font-16 regular color-1F1F1F text-uppercase">Sub Total</span>
                </div>
                <div className="col text-right">
                    <span
                        className="font-poppins font-16 regular color-1F1F1F text-uppercase">{formatMoney(totalCart)}</span>
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
                    <span className="font-poppins font-12 regular color-1F1F1F">Total Descuento</span>
                </div>
                <div className="col text-right">
                    <span
                        className="font-poppins font-12 regular color-1F1F1F">{formatMoney(discount)}</span>
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
                        className="font-poppins font-23 bold color-033F5D text-uppercase">{formatMoney(totalCart)}</span>
                </div>
            </div>

        </Fragment>
    );
};

export default TotalCartPriceFinal
