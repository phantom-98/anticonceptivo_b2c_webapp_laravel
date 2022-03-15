import React, {Fragment, useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ProductItem from "../../../components/shopping/MiniCart/ProductItem";
import ProductItemList from "../../../components/shopping/ProductItemList";
import {CartContext} from "../../../context/CartProvider";
import TotalCartItems from "../../../components/shopping/TotalCartItems";
import TotalCartPrice from "../../../components/shopping/TotalCartPrice";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {CONFIG} from "../../../Config";
import logoWebpay from '../../../assets/images/webpayColor.svg'

const Cart = () => {
    window.dataLayer = window.dataLayer || [];
    useEffect(() => {
        function gtag2(){
            if(window.location.href.includes("carrito")){
                dataLayer.push(arguments);
            }
        }
        gtag2('js', new Date());

        gtag2('config', 'AW-10785537269');
    },[]);



    const {
        cartItems,
    } = useContext(CartContext);

    return (
        <Fragment>
            <div className="pb-5" style={{background: '#FAFAFA'}}>
                <div className="container pt-4">
                    <div className="row pb-5">
                        <div className="col-md-12 mb-3">
                            <h3 className="font-poppins font-21 bold color-0869A6 checkout-mobile-h3" style={{letterSpacing: '2px'}}>
                                CARRO DE COMPRAS <span className="font-poppins font-16 regular color-6C6B6B">(<TotalCartItems/>)</span>
                            </h3>
                        </div>
                        <div className="col-12 col-lg pr-md-2 pb-3">
                            <div className="panel panel-cart r-cart-items">
                                <div className="panel-body">
                                    <div className="row">

                                        {
                                            cartItems.length ? cartItems.map((item, index) => {
                                                return <ProductItemList item={item} key={index}/>
                                            })

                                            :
                                            <div className="col-10 offset-1 alert alert-danger text-center">
                                                <span className="font-12 font-poppins">Carro sin productos</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-auto pl-md-2 panel-cart-total">
                            <div className="panel panel-cart">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="font-poppins font-21 bold color-0869A6 mb-0"
                                                style={{letterSpacing: '2px'}}>
                                                TOTAL
                                            </h3>
                                            <hr className="mb-0 pb-0"/>
                                        </div>

                                        <div className="col-md-12">
                                            <TotalCartPrice/>
                                        </div>

                                        <div className="col-12 mt-2">
                                            <Link to={cartItems.length ? PUBLIC_ROUTES.CHECKOUT.path : '#'}
                                                  className="btn btn-bicolor btn-block d-flex my-2">
                                                <span className="m-auto font-poppins font-14 bold">CONTINUAR AL PAGO</span>
                                            </Link>
                                            <p className="font-poppins font-12 regular color-484848">
                                                *El costo de entrega se calculará al añadir la dirección.
                                            </p>
                                            <hr/>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-6 ">
                                                    <h4 className="font-poppins font-14 bold color-033F5D">
                                                        Métodos de pago
                                                    </h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <img src={logoWebpay} alt={CONFIG.APP_NAME}
                                                         style={{width: '100%'}}/>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                        <div className="col-md-12">
                                            <h4 className="font-poppins font-14 bold color-033F5D">
                                                Cambios y devoluciones
                                            </h4>
                                            <p className="font-poppins font-12 regular color-484848">
                                                Puedes cambiar tus productos en nuestra tienda hasta 30 días después de
                                                la fecha de compra.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Cart
