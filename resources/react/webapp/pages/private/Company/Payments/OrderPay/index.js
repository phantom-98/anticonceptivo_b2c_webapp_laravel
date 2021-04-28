import React, {Fragment, useEffect, useState} from 'react';
import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import * as Services from "../../../../../Services";
import NotFound from "../../../../../components/NotFound";
import LazyLoading from "../../../../../components/LazyLoading";
import Resume from "./Resume";
import PaymentMethods from "./PaymentMethods";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../../routes/publicRoutes";
import PRIVATE_ROUTES from "../../../../../routes/privateRoutes";

const OrderPay = ({match}) => {

    const [loaded, setLoaded] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [order, setOrder] = useState({});

    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        getOrderToPay();
    }, [])

    const getOrderToPay = () => {

        let url = Services.ENDPOINT.PANEL.PAYMENTS.GET_ORDER_TO_PAY;
        let data = {
            order_auth_token: match.params.orderAuthToken
        }

        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {

                        let url = PANEL_COMPANY_ROUTES.ORDER_PAY.path;
                        url = url.replace(':orderAuthToken', response.data.order.order_auth_token)

                        setBreadcrumbs([{
                            url: url,
                            name: 'Pagar Orden Nº ' + response.data.order.id
                        }])
                        setOrder(response.data.order)
                        setLoaded(true)
                    },
                    error: () => {
                        setNotFound(true)
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <BasePanel
            title={PANEL_COMPANY_ROUTES.ORDER_PAY.title}
            breadcrumbs={breadcrumbs}>
            <div className="row">
                <div className="col-md-12">
                    {

                        notFound ?

                            <Fragment>
                                <NotFound
                                    message="Orden ya procesada"
                                    text="Esta orden ya ha sido procesada"
                                    padding="py-4"
                                />
                                <div className="col-12 py-4 text-center">
                                    <p className="font-epilogue font-14 light">
                                        <Link to={PANEL_COMPANY_ROUTES.QUOTATIONS.path} className="btn-link">Volver</Link>
                                    </p>
                                </div>
                            </Fragment> :

                            <Fragment>
                                {
                                    loaded ?
                                    <Fragment>
                                        <div className="row pb-4">
                                            <div className="col-12 pb-3">
                                                <Resume order={order} />
                                            </div>

                                            <div className="col-12">
                                                <PaymentMethods order={order} setOrder={setOrder} />
                                            </div>
                                        </div>
                                    </Fragment>
                                    :
                                    <LazyLoading/>
                                }
                            </Fragment>
                    }
                </div>
            </div>
        </BasePanel>
    );
};

export default OrderPay;
