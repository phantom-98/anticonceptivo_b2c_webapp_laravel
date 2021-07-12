import React, {useContext, useEffect, useState} from 'react';

import {CartContext} from "../../context/CartProvider";

const TotalCartItems = () =>{

    const {cartItems} = useContext(CartContext);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(()=>{
        let _total = 0;
        // console.log(cartItems)
        cartItems.map((item) =>{
            _total = _total + item.quantity
        })
        console.log('_total:', _total);
        setTotalCart(_total);
        // console.log(cartItems);
    },[cartItems])

    return (
        <>
            {totalCart}
        </>
    );
};

export default TotalCartItems
