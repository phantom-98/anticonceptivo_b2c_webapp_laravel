import React, {Fragment} from 'react';
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import {Link} from "react-router-dom";
import Icon from "../../../../components/general/Icon";
import checkCircle from "../../../../assets/images/icons/checkmark-circle-outline.svg";
import {formatMoney} from "../../../../helpers/GlobalUtils";
import moment from "moment";
import useGoogleAnalyticsEcommerce from '../../../../components/customHooks/UseGoogleAnalyticsEcommerce';

const Success = ({order}) => {

    console.log('Success', order);

    const {addTransaction, addItems, transaction, items, send} = useGoogleAnalyticsEcommerce();

    // const [order, setOrder] = useState({
    //     id: '',
    // });
    // const [load, setLoad] = useState(true);
    //
    // useEffect(() => {
    //     getData();
    // }, []);

    // useEffect(() => {
    //     if (transaction.id && items.length) {
    //         // console.log('useEffect send GA !');
    //         send();
    //     }
    // }),[items, transaction]
    //
    // const getData = () => {
    //     let url = Services.ENDPOINT.NO_AUTH.CHECKOUT.GET_ORDER;
    //
    //     const formData = new FormData();
    //
    //     formData.append('product_count', productCount);
    //     formData.append('order_id', orderId);
    //     formData.append('prescription_radio', productCount > 0 ? prescriptionRadio : null);
    //     formData.append('without_prescription_answer', withoutPrescriptionAnswer);
    //
    //     let fileList = [...files]
    //
    //     for (let i = 0; i < fileList.length; i++) {
    //         formData.append('attachments[]', fileList[i]);
    //         formData.append('productIds[]', fileList[i].product_id);
    //     }
    //
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     }
    //
    //     Services.DoPost(url, formData, config).then(response => {
    //         Services.Response({
    //             response: response,
    //             success: () => {
    //                 setOrder(response.data.order);
    //                 setLoad(false);
    //
    //                 addTransaction({
    //                     'id': response.data.order.id,
    //                     'affiliation': 'Anticonceptivo',
    //                     'revenue': response.data.order.subtotal,
    //                     'shipping': response.data.order.dispatch,
    //                     'tax': response.data.order.subtotal*0.19,
    //                 })
    //
    //                 addItems(response.data.order.order_items);
    //             },
    //         });
    //     }).catch(error => {
    //         Services.ErrorCatch(error)
    //     });
    // }

    if (!order) return null;
    return (
        <div className="row pb-5">
            <div className="col-md-8 offset-md-2">
                <div className="panel">
                    <div className="panel-body panel-bordered">
                        <div className="text-center mb-3">
                            <Icon path={checkCircle}/>
                        </div>
                        <div className="text-center mb-5">
                            <span className="bold font-poppins font-26 d-block">Pago Aprobado</span>
                        </div>

                        <Fragment>
                            <div className="row">
                                <div className="col-md-12">
                                            <span
                                                className="font-poppins font-18 regular color-005A86">Pedido número <span
                                                className="bold">{order.id}</span></span>
                                </div>
                            </div>
                            <div style={{marginBottom: "20px"}}>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th colSpan="2" className="bold text-center"
                                            style={{marginBottom: "20px"}}>
                                            DATOS DEL CLIENTE
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="bold w-25">NOMBRE</td>
                                        <td>{order.customer.full_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="bold w-25">EMAIL</td>
                                        <td><a className="text-info" href="mailto:"
                                               target="_blank">{order.customer.email}</a></td>
                                    </tr>
                                    <tr>
                                        <td className="bold w-25">TELÉFONO</td>
                                        <td><a className="text-info" href="tel:+56"
                                               target="_blank">+56{order.customer.phone}</a></td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div style={{marginBottom: "20px"}}>
                                <table className="table" style={{marginBottom: "20px"}}>
                                    <thead>
                                    <tr>
                                        <th colSpan="5" className="bold text-center">
                                            DATOS DEL PEDIDO
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="bold w-25">FECHA</td>
                                        <td colSpan="4">{moment(order.updated_at).format('DD/MM/YYYY')}</td>
                                    </tr>
                                    <tr>
                                        <td className="bold w-25">MÉTODO DE PAGO</td>
                                        <td colSpan="4">{order.payment_type}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bold w-25">DIRECCIÓN</td>
                                        <td colSpan="4">{order.delivery_address ?? 'Dirección no registrada'}</td>
                                    </tr>
                                    <tr>
                                        <td className="bold w-25">COMENTARIO DE DIRECCIÓN</td>
                                        <td colSpan="4">{order.comments ?? 'Sin comentario'}</td>
                                    </tr>
                                    <tr>
                                        <td className="bold w-25">SUBTOTAL</td>
                                        <td className="bold w-25">ENVÍO</td>
                                        <td className="bold w-25">DESC.</td>
                                        <td className="bold w-25">TOTAL</td>
                                    </tr>
                                    <tr>
                                        <td className=" w-25">{formatMoney(order.subtotal)}</td>
                                        <td className=" w-25">{formatMoney(order.dispatch)}</td>

                                        <td className=" w-25">{formatMoney(order.discount)}</td>
                                        <td className=" w-25">{formatMoney(order.total)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{marginBottom: "20px"}}>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th colSpan="5" className="bold text-center"
                                            style={{marginBottom: "20px"}}>
                                            DETALLE DEL PEDIDO
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="bold">PRODUCTO</td>
                                        <td className="bold">P. UNI.</td>
                                        <td className="bold">CANT.</td>
                                        <td className="bold">SUBTOTAL</td>
                                    </tr>
                                    {
                                        order.order_items.map((item) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        {item.name}
                                                        {item.subscription_plan_id != null ? '(suscripción)' : ''}
                                                    </td>
                                                    <td className="text-right">
                                                        {formatMoney((item.subscription_plan_id != null ? item.subtotal : item.price))}
                                                    </td>
                                                    <td style={{textAlign: "center"}}>{(item.subscription_plan_id != null ? (item.subscription_plan.months + ' Ciclos') : item.quantity)}</td>
                                                    <td className="text-right">
                                                        {formatMoney((item.subscription_plan_id != null ? item.subtotal : item.price * item.quantity))}

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    <tr>
                                        <td colSpan="1"></td>
                                        <td colSpan="2" className="text-right">SUBTOTAL</td>
                                        <td className="bold w-25"
                                            className="text-right"> {formatMoney(order.subtotal)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="1" style={{border: "none"}}></td>
                                        <td colSpan="2" className="text-right">ENVÍO</td>
                                        <td className="bold w-25"
                                            className="text-right"> {formatMoney(order.dispatch)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="1" style={{border: "none"}}></td>
                                        <td colSpan="2" className="text-right">DESCUENTO</td>
                                        <td className="bold w-25 text-right"> {formatMoney(order.discount)}</td>
                                    </tr>

                                    <tr>
                                        <td colSpan="1" style={{border: "none"}}></td>
                                        <td colSpan="2" className="text-right">TOTAL</td>
                                        <td className="bold w-25 text-right"><b> {formatMoney(order.total)}</b>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
                                <div className="col-md-4 offset-md-4 mt-5">
                                    <Link to={PUBLIC_ROUTES.HOME.path}
                                          className="btn btn-bicolor btn-block d-flex">
                                                <span
                                                    className="m-auto font-poppins font-14 bold">VOLVER A COMPRAR</span>
                                    </Link>
                                </div>
                            </div>
                        </Fragment>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success
