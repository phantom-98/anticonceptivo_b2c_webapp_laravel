import React, {Fragment, useContext} from 'react';
import OffCanvas from "../../general/OffCanvas";
import {CartContext} from "../../../context/CartProvider";

const MiniCart = () =>{

    const {showingMiniCart, hideMiniCart} = useContext(CartContext);

    return (
        <Fragment>
            <OffCanvas showCanvas={showingMiniCart} closeCanvas={hideMiniCart} >

            </OffCanvas>
        </Fragment>
    );
};

export default MiniCart
