import React, {Fragment, useContext, useState, useEffect} from 'react';
import TotalCartItems from "../../../components/shopping/TotalCartItems";
import {CONFIG} from "../../../Config";
import ProductItem from "../../../components/shopping/MiniCart/ProductItem";
import TotalCartPrice from "../../../components/shopping/TotalCartPrice";
import logoWebpay from "../../../assets/images/webpayColor.svg";
import {CartContext} from "../../../context/CartProvider";
import {AuthContext} from "../../../context/AuthProvider";
import TotalCartPriceFinal from "../../../components/shopping/TotalCartPriceFinal";
import WebPayProccess from "./Payment/WebPayProccess";
import * as Services from "../../../Services";
import toastr from "toastr";

const Resume = ({
    showFinal,
    data,
    file,
    address,
    subscription,
    setFinishWebpayProccess,
    setWebpayProccessSuccess,
    setOrderId,
    total,
    subtotal,
    setSubtotal,
    setTotal,
    setDispatchDate,
    installment,
    validateData,
    hasAddress,
    view,
    customerId
    }) => {

    const [dispatch , setDispatch] = useState(0);
    const [showResumenCart, setShowResumenCart] = useState(false)
    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState(0);
    const [discountCode, setDiscountCode] = useState("");

    const {cartItems} = useContext(CartContext);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        // console.log(address)
        let url = Services.ENDPOINT.PAYMENTS.GET_DISPATCH;

        let data = {
            commune_id: address.commune_id
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                setDispatch(response.data.dispatch)
                setDispatchDate(response.data.date_dispatch)
              },

            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });

    },[address])


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
              success: () => {if (response.data.discount_type === 1) {
                  setDiscountType(1)

                  setDiscount(response.data.discount/100)
                }else{
                  setDiscountType(0)

                  setDiscount(response.data.discount)
                }
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
                        <div className="col-auto pl-0">
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
                                <>
                                    <div className="col-md-12">
                                    <TotalCartPrice/>
                                    </div>
                                    {
                                        view === 'user-form' ? 
                                            <div className="col-md-12 mt-2">
                                                <button className="btn btn-bicolor btn-block" disabled={cartItems.length ? false : true} onClick={ auth ? () =>  hasAddress() : () => validateData()}>
                                                    <span className="font-14 px-5">CONTINUAR</span>
                                                </button>
                                            </div>
                                        : null
                                    }
                                </>
                                :
                                <div className="col-md-12">
                                    <TotalCartPriceFinal
                                        discount={discount}
                                        discountType={discountType}
                                        total={total}
                                        setTotal={setTotal}
                                        subtotal={subtotal}
                                        setSubtotal={setSubtotal}
                                        dispatch={dispatch}
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
                                    subscription={subscription}
                                    setFinishWebpayProccess={setFinishWebpayProccess}
                                    setWebpayProccessSuccess={setWebpayProccessSuccess}
                                    setOrderId={setOrderId}
                                    dispatch={dispatch}
                                    discount={discount}
                                    discountType={discountType}
                                    total={total}
                                    subtotal={subtotal}
                                    discountCode={discountCode}
                                    installment={installment}
                                    customerId={customerId}
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
