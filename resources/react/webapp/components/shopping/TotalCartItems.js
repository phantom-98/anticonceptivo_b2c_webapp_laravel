import React, {useContext, useEffect, useState} from 'react';

import {CartContext} from "../../context/CartProvider";

const TotalCartItems = () =>{

    const {cartItems} = useContext(CartContext);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(()=>{
        let _total = 0;
        cartItems.map((item) =>{
            _total = _total + item.quantity
        })
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
