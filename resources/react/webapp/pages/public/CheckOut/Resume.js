import React, {Fragment, useContext, useState} from 'react';
import TotalCartItems from "../../../components/shopping/TotalCartItems";
import {CONFIG} from "../../../Config";
import ProductItem from "../../../components/shopping/MiniCart/ProductItem";
import TotalCartPrice from "../../../components/shopping/TotalCartPrice";
import logoWebpay from "../../../assets/images/webpayColor.svg";
import {CartContext} from "../../../context/CartProvider";
import TotalCartPriceFinal from "../../../components/shopping/TotalCartPriceFinal";
import WebPayProccess from "./Payment/WebPayProccess";
import * as Services from "../../../Services";
import toastr from "toastr";

const Resume = ({
    showFinal, 
    data, 
    file, 
    address, 
    setFinishWebpayProccess, 
    setWebpayProccessSuccess, 
    setOrderId, 
    total,
    subtotal,
    setSubtotal,
    setTotal
    }) => {

    const [showResumenCart, setShowResumenCart] = useState(false)
    const [dispatch, setDispatch] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const {cartItems} = useContext(CartContext);

    const handleDiscount = (e) => {
        setDiscountCode(e.target.value);
    }

    const addDiscount = () => {
        let url = Services.ENDPOINT.PAYMENTS.DISCOUNT_CODE;

        let data = {
            discount_code: discountCode
        }
        
        Services.DoPost(url, data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                if (response.data.discount_type === 1) {
                    setDiscount(parseFloat('0.'+response.data.discount),5)
                }else{
                    setDiscount(response.data.discount)
                }

                setDiscountType(response.data.discount_type)
                toastr.success(response.message);
              },
              warning: () => {
                toastr.warning(response.message);
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
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
                 showFinal === 3 ?
                    <div className="row mb-3">
                        <div className="col">
                            <input 
                                type="text" 
                                className="form-control form-control-custom"
                                placeholder="Ingresar código de descuento"
                                onChange={handleDiscount}
                                value={discountCode}
                            />
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
                                    <TotalCartPriceFinal
                                        discount={discount}
                                        discountType={discountType}
                                        total={total}
                                        setTotal={setTotal}
                                        subtotal={subtotal}
                                        setSubtotal={setSubtotal}
                                    />
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
                                <WebPayProccess
                                    data={data}
                                    file={file}
                                    address={address}
                                    setFinishWebpayProccess={setFinishWebpayProccess}
                                    setWebpayProccessSuccess={setWebpayProccessSuccess}
                                    setOrderId={setOrderId}
                                    dispatch={dispatch}
                                    discount={discount}
                                    total={total}
                                    subtotal={subtotal}
                                    discountCode={discountCode}
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
