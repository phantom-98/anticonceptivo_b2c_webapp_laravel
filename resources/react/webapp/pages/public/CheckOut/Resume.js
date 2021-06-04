import React, {Fragment, useContext, useState} from 'react';

import TotalCartItems from "../../../components/shopping/TotalCartItems";
import {CONFIG} from "../../../Config";
import ProductItem from "../../../components/shopping/MiniCart/ProductItem";
import TotalCartPrice from "../../../components/shopping/TotalCartPrice";
import logoWebpay from "../../../assets/images/webpayColor.svg";
import {CartContext} from "../../../context/CartProvider";
import TotalCartPriceFinal from "../../../components/shopping/TotalCartPriceFinal";
import WebPay from "./Payment/WebPay";

const Resume = ({showFinal}) => {

    const [showResumenCart, setShowResumenCart] = useState(false)
    const [dispatch, setDispatch] = useState(6990)
    const [discount, setDiscount] = useState(-4990)
    const {cartItems} = useContext(CartContext);

    const addDiscount = () => {
        setDiscount(-4990)
    }

    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body" style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    <div className="row pointer" onClick={() => setShowResumenCart(!showResumenCart)}>
                        <div className="col">
                            <h3 className="font-poppins font-21 bold color-0869A6 mb-0"
                                style={{letterSpacing: '2px'}}>TU CARRO <span
                                className="font-poppins font-16 regular color-6C6B6B">(<TotalCartItems/>)</span></h3>
                        </div>
                        <div className="col-auto">
                            {
                                showResumenCart ?
                                    <img src="/themes/web/assets/images/up.svg" alt={CONFIG.APP_NAME}/>
                                    :
                                    <img src="/themes/web/assets/images/down.svg" alt={CONFIG.APP_NAME}/>
                            }
                        </div>
                    </div>
                    {
                        showResumenCart ?
                            <div className="row mt-3">
                                {
                                    cartItems.map((item, index) => {
                                        return <ProductItem item={item} key={index}/>
                                    })
                                }
                            </div> : null
                    }
                </div>
            </div>

            {
                 showFinal === 1 ?
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control form-control-custom"
                                   placeholder="Ingresar código de descuento"/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-bicolor btn-block" onClick={addDiscount}>
                                <span>APLICAR</span>
                            </button>
                        </div>
                    </div>
                    : null
            }


            <div className="panel panel-cart mb-3">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="font-poppins font-21 bold color-0869A6 mb-0"
                                style={{letterSpacing: '2px'}}>
                                {showFinal === 1 ? 'TOTAL' : 'RESUMEN DE COMPRA'}
                            </h3>
                            <hr className="mb-0 pb-0"/>
                        </div>

                        {
                             showFinal === 1 ?
                                <div className="col-md-12">
                                    <TotalCartPrice/>
                                </div>
                                :
                                <div className="col-md-12">
                                    <TotalCartPriceFinal/>
                                </div>
                        }
                        {
                            showFinal === 1 || showFinal === 2 ?
                                <Fragment>
                                    <div className="col-12 mt-2">
                                        <hr/>
                                        <p className="font-poppins font-12 regular color-484848 mb-0">
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
                                    </div>
                                </Fragment>
                                :  null
                        }

                        {
                            showFinal === 3 ?
                                <WebPay
                                
                                />

                            : null
                        }

                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default Resume
