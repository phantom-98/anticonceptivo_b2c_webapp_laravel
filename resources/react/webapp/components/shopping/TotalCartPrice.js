import React, { Fragment, useContext, useEffect, useState } from "react";
import { formatMoney } from "../../helpers/GlobalUtils";
import { CartContext } from "../../context/CartProvider";

const TotalCartPrice = () => {
    const { cartItems } = useContext(CartContext);
    const [totalCart, setTotalCart] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        let _total = 0;
        let _total_discount = 0;
        let _sub_total = 0;
        cartItems.map((item) => {
            let _temp_total = 0;
            let _temp_sub_total = 0;
            let _temp_discount = 0;

            if (item.subscription != null) {
                _temp_total =
                    item.quantity *
                    item.subscription.price *
                    item.subscription.quantity;
                _temp_sub_total =
                    item.quantity *
                    (item.product.price * item.subscription.quantity);
                _temp_discount = _temp_sub_total - _temp_total;
            } else {
                _temp_total =
                    item.quantity *
                    (item.product.is_offer
                        ? item.product.offer_price
                        : item.product.price);
                _temp_sub_total = item.quantity * item.product.price;
                _temp_discount = _temp_sub_total - _temp_total;
            }

            _total += _temp_total;
            _sub_total += _temp_sub_total;
            _total_discount += _temp_discount;
        });
        setTotalDiscount(_total_discount);
        setSubTotal(_sub_total);
        setTotalCart(_total);
    }, [cartItems]);

    return (
        <Fragment>
            <div className="row pt-3">
                <div className="col-auto">
                    <h3 className="font-poppins font-16 regular color-1F1F1F text-uppercase">
                        Sub Total
                    </h3>
                </div>
                <div className="col text-right">
                    <h3 className="font-poppins font-16 regular color-1F1F1F text-uppercase">
                        {formatMoney(subTotal)}
                    </h3>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <h3 className="font-poppins font-16 bold color-033F5D text-uppercase">
                        Descuento
                    </h3>
                </div>
                <div className="col text-right">
                    <h3 className="font-poppins font-16 bold color-033F5D text-uppercase">
                        {formatMoney(totalDiscount)}
                    </h3>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <h3 className="font-poppins font-23 bold color-033F5D text-uppercase">
                        Total
                    </h3>
                </div>
                <div className="col text-right">
                    <h3 className="font-poppins font-23 bold color-033F5D text-uppercase">
                        {formatMoney(totalCart)}
                    </h3>
                </div>
            </div>
        </Fragment>
    );
};

export default TotalCartPrice;
