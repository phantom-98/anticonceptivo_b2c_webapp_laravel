import React, {Fragment, useContext} from 'react';
import OffCanvas from "../../general/OffCanvas";
import {CartContext} from "../../../context/CartProvider";
import ProductItem from "./ProductItem";
import TotalCartItems from "../../../pages/public/ProductDetails/TotalCartItems";

const MiniCart = () => {

    const {
        showingMiniCart,
        cartItems,
        hideMiniCart
    } = useContext(CartContext);

    return (
        <Fragment>
            <OffCanvas showCanvas={showingMiniCart} closeCanvas={hideMiniCart}>
                <div className="row">
                    <div className="col">
                        <h3 className="font-poppins font-21 bold color-0869A6">TU CARRO <span
                            className="font-poppins font-16 regular color-6C6B6B">(<TotalCartItems />)</span></h3>
                    </div>
                </div>
                <div className="row mini-cart-list">

                    {
                        cartItems.map((item, index) => {
                            return <ProductItem item={item} key={index}/>
                        })
                    }

                </div>
            </OffCanvas>
        </Fragment>
    );
};

export default MiniCart
