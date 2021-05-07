import React from 'react';
import ReactDOM from 'react-dom';
import H3Panel from "../../../../../components/general/H3Panel";
import RowCol from "../../../../../components/general/RowCol";

const Subscription = () => {
    return (
        <div className="row">
            <H3Panel title="SUSCRIPCIÓN"/>
            <div className="col-md-12">
                <div className="panel-bordered px-4 pt-4 pb-5">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <span className="font-poppins font-18 regular color-484848">Tu suscripción es válida hasta el <span className="bold color-009BE8">12 de abril 2021</span>
                            </span>
                        </div>

                        <H3Panel title="TU TARJETA DE CRÉDITO ACTUAL" className="mb-2" />
                        <RowCol name="TARJETA" value="VISA" />
                        <RowCol name="ÚLTIMOS 4 DÍGITOS" value="2176" />
                        <RowCol name="FECHA DEL COBRO" value="12 DE ABRIL 20221" />

                        <div className="col-12 my-3">
                            <p className="font-poppins font-14 regular color-484848">Si quieres cambiar tu tarjeta de crédito serás redirigido al sistema de pago para registrar tu nueva tarjeta de crédito. No te realizaremos cobros por este proceso.
                            </p>
                        </div>

                       <div className="col-md-12">
                           <div className="row">
                               <div className="col-md-auto">
                                   <button type="button" className="btn btn-outline-bicolor"
                                           onClick={() => alert('CANCELAR')}>
                                       <span className="px-5">CANCELAR</span>
                                   </button>
                               </div>
                               <div className="col-md-auto">
                                   <button type="button" className="btn btn-bicolor"
                                           onClick={() => alert('CAMBIAR TARJETA DE CRÉDITO')}>
                                       <span className="px-5">CAMBIAR TARJETA DE CRÉDITO</span>
                                   </button>
                               </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription
