import React from 'react';
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import {Link} from "react-router-dom";
import H3Panel from "../../../../components/general/H3Panel";
import RowCol from "../../../../components/general/RowCol";

const Success = ({order}) => {
    console.log('order: ',order);
    return (
        <div className="row pb-5">
            <div className="col-md-8 offset-md-2">
                <div className="panel">
                    <div className="panel-body">
                        <div className="text-center mb-5">
                            <span className="bold font-poppins font-26 d-block">Pago Aprobado</span>
                        </div>
                        
                        
                        <div className="row">
                            <div className="col-md-12">
                                <span className="font-poppins font-18 regular color-005A86">Pedido número <span className="bold">{order.id}</span></span>
                            </div>
                        </div>

                        <div className="row py-3">
                            <H3Panel title="DATOS DEL CLIENTE" className="mb-0"/>
                            <RowCol name="RUT" value={order.customer.id_number}/>
                            <RowCol name="NOMBRE" value={order.customer.full_name}/>
                            <RowCol name="EMAIL" value={order.customer.email}/>
                            <RowCol name="TELÉFONO" value={order.customer.full_phone}/>
                            <RowCol name="DIRECCIÓN" value={order.delivery_address}/>
                        </div>

                        {/* <div className="row py-3">
                            <H3Panel title="DETALLE DEL PEDIDO" className="mb-0"/>
                            {
                                order.order_items.map((item) => {
                                    return(
                                        <RowCol name={item.name} value={'Cantidad ' + item.quantity} firstColSize="8"/>
                                    )
                                })
                            }
                        </div> */}

                        <div className="row py-3">
                            <H3Panel title="DATOS DEL PEDIDO" className="mb-0"/>
                            <RowCol name="FECHA DE ENVÍO" value={order.delivery_date}/>
                            <RowCol name="TIPO DOCUMENTO" value={order.document_type}/>
                            <RowCol name="MÉTODO DE PAGO" value={order.payment_type}/>
                            <RowCol name="MÉTODO DE ENVÍO" value={order.shipping_type}/>
                        </div>

                        <div className="row">
                            <div className="col-md-4 offset-md-4 mt-5">
                                <Link to={PUBLIC_ROUTES.HOME.path} className="btn btn-bicolor btn-block d-flex">
                                    <span className="m-auto font-poppins font-14 bold">VOLVER A COMPRAR</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success