import React from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import RowCol from "../../../../../components/general/RowCol";

const Detail = ({order, goBack}) => {
    return (
        <div className="panel-bordered  py-3">
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
                <RowCol name="RUT" value="10.346.819-8"/>
                <RowCol name="NOMBRE" value="ENRIQUE SILVA"/>
                <RowCol name="EMAIL" value="e.silva@gmail.com"/>
                <RowCol name="TELÉFONO" value="+56 9 3864 2831"/>
                <RowCol name="DIRECCIÓN" value="10 norte 365, Viña del mar, REGIÓN DE VALPARAÍSO"/>
            </div>

            <div className="row py-3">
                <H3Panel title="DETALLE DEL PEDIDO" className="mb-0"/>
                <RowCol name="GYNERA 75/20 ETINILESTRADIOL / GESTODENO" value="Cantidad 01" firstColSize="8"/>
                <RowCol name="GYNERA 75/20 ETINILESTRADIOL / GESTODENO" value="Cantidad 01" firstColSize="8"/>
            </div>

            <div className="row py-3">
                <H3Panel title="DATOS DEL PEDIDO" className="mb-0"/>
                <RowCol name="FECHA" value="23-12-2020"/>
                <RowCol name="TIPO DOCUMENTO" value="BOLETA"/>
                <RowCol name="MÉTODO DE PAGO" value="Webpay"/>
                <RowCol name="MÉTODO DE ENVÍO" value="Bluexpress"/>
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
