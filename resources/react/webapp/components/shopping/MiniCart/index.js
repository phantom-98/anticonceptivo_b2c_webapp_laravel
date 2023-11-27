import React, {Fragment, useContext} from 'react';
import OffCanvas from "../../general/OffCanvas";
import {CartContext} from "../../../context/CartProvider";
import ProductItem from "./ProductItem";
import TotalCartItems from "../TotalCartItems";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import TotalCartPrice from "../TotalCartPrice";
import {Link} from "react-router-dom";


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
                        <h3 className="font-poppins font-21 bold color-0869A6" style={{ letterSpacing : '2px'}}>TU CARRO <span
                            className="font-poppins font-16 regular color-6C6B6B">(<TotalCartItems />)</span></h3>
                    </div>
                </div>
               <div className="row">
                   <div className="mini-cart-list">

                       {
                           cartItems.map((item, index) => {
                               return <ProductItem item={item} key={index}/>
                           })
                       }

                   </div>
               </div>

                <TotalCartPrice />

                <div className="row">
                    <div className="col-12">
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <Link to={PUBLIC_ROUTES.CART.path} className="btn btn-bicolor btn-block" onClick={hideMiniCart}>
                            <span style={{lineHeight:'35px'}}>Ir al carro</span>
                        </Link>
                    </div>
                    <div className="col-md-12 py-2 mt-2 text-center">
                        <button className="link" onClick={hideMiniCart}>
                            CONTINUAR COMPRANDO
                        </button>
                    </div>
                </div>
            </OffCanvas>
        </Fragment>
    );
};

export default MiniCart
