import React from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import RowCol from "../../../../../components/general/RowCol";

const Detail = ({order, goBack}) => {
    return (
        <div className="panel-bordered py-3">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <button onClick={goBack} className="link" style={{textDecoration: 'none'}}>
                        <span className="font-12">{"< VOLVER"}</span>
                    </button>
                </div>

                <div className="col-md-12">
                    <span className="font-poppins font-18 regular color-005A86">Pedido número <span
                        className="bold">{order.id}</span></span>
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

            <div className="row py-3">
                <H3Panel title="DETALLE DEL PEDIDO" className="mb-0"/>
                {
                    order.order_items.map((item) => {
                        return(
                            <RowCol name={item.name} value={'Cantidad ' + item.quantity} firstColSize="8"/>
                        )
                    })
                }
            </div>

            <div className="row py-3">
                <H3Panel title="DATOS DEL PEDIDO" className="mb-0"/>
                <RowCol name="FECHA DE ENVÍO" value={order.delivery_date}/>
                <RowCol name="TIPO DOCUMENTO" value={order.document_type}/>
                <RowCol name="MÉTODO DE PAGO" value={order.payment_type}/>
                <RowCol name="MÉTODO DE ENVÍO" value={order.shipping_type}/>
            </div>

            <div className="row py-4">
                <div className="col-md-12 ">
                    <button type="button" className="btn btn-bicolor  px-5"
                            onClick={() => alert('VOLVER A COMPRAR')}>
                        <span className="px-5">VOLVER A COMPRAR</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Detail
