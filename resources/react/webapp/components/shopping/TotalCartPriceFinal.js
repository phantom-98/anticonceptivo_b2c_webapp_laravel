import React, {Fragment, useContext, useEffect, useState} from 'react';
import {formatMoney} from "../../helpers/GlobalUtils";
import {CartContext} from "../../context/CartProvider";

const TotalCartPriceFinal = ({discount, discountType, total, setTotal, subtotal, setSubtotal}) => {

    const {cartItems} = useContext(CartContext);
    const [dispatch, setDispatch] = useState(0)

    useEffect(() => {
        let _total = 0;

        cartItems.map((item) => {
            if(item.subscription != null){
                _total = _total + (item.quantity * item.subscription.price * item.subscription.quantity)
                
            }else{
                _total = _total + (item.quantity * (item.product.is_offer ? item.product.offer_price : item.product.price))

            }
        })

        setSubtotal(_total);

        if (discountType === 0) {
            _total = _total + dispatch - discount;
        }else{
            _total = (_total*discount) + (dispatch);
        }

        setTotal(_total);
        // setTotalCart(_total);
    }, [cartItems, discount])

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
                    <span className="font-poppins font-12 regular color-1F1F1F">Total Descuento</span>
                </div>
                <div className="col text-right">
                    <span className="font-poppins font-12 regular color-1F1F1F">
                        {
                            formatMoney(discount === 0 ? 0 : (discountType === 0 ? discount : total*discount)*-1)
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
