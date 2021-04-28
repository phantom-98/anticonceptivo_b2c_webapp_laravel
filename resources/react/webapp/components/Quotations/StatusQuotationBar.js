import React, {Fragment, useContext, useEffect} from 'react';

import {Card} from "react-bootstrap";
import {AuthContext} from "../../context/AuthProvider";
import {AuthType} from "../../Globals";
import QuotationCompanyCard from "./QuotationCompanyCard";
import QuotationProfessionalCard from "./QuotationProfessionalCard";
import * as Services from "../../Services";
import toastr from 'toastr';
import {AppContext} from "../../context/AppProvider";
import PANEL_COMPANY_ROUTES from "../../routes/companyRoutes";
import {createOrder} from "../../pages/private/Company/actions";

const StatusQuotationBar = ({quotation, getQuotation}) => {

    const {authType} = useContext(AuthContext);
    const {pusherNotifyChannel} = useContext(AppContext);

    useEffect(() => {
        pusherNotifyChannel.bind('change-status-quotation', function (data) {
            getQuotation()
            toastr.info('Estado de la solicitud actualizada.')
        });
    }, [])

    const setQuotation = (status) => {
        let url = Services.ENDPOINT.PANEL.COMMON.QUOTATIONS.CHANGE_STATUS;
        let data = {
            quotation_id: quotation.id,
            status: status
        }
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success(response.message)
                        getQuotation()
                    },
                    error: () => {
                        toastr.error(response.message)
                    },
                    warning: () => {

                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }


    return (
        <Card>
            <Card.Body>
                <div className="row">
                    <div className="col" style={{marginTop: '-4px'}}>
                        {
                            authType == AuthType.PROFESSIONAL ?
                                <QuotationCompanyCard company={quotation.company}/> : null
                        }
                        {
                            authType == AuthType.COMPANY ?
                                <QuotationProfessionalCard professional={quotation.professional}/> : null
                        }
                    </div>

                    <div className="col-auto d-flex">
                        {/*<h3 className="font-signika font-16 bold text-primary mb-1 text-right">Acciones</h3>*/}

                        <div className="my-auto">

                            {
                                quotation.status == 'CREATED' && authType == AuthType.PROFESSIONAL ?
                                    <Fragment>
                                        <button type="button"
                                                onClick={() => setQuotation('REJECTED')}
                                                className="btn btn-form btn-danger btn-rounded px-4 ml-2">
                                            <span>Rechazar</span>
                                        </button>
                                        <button type="button"
                                                onClick={() => setQuotation('ACCEPTED')}
                                                className="btn btn-form btn-success btn-rounded px-4 ml-2">
                                            <span>Aprobar</span>
                                        </button>
                                    </Fragment>
                                    : null
                            }

                            {
                                quotation.status == 'CREATED' && authType == AuthType.COMPANY ?
                                    <Fragment>
                                        <button type="button"
                                                onClick={() => setQuotation('CANCELED')}
                                                className="btn btn-form btn-danger btn-rounded px-4 ml-2">
                                            <span>Anular</span>
                                        </button>
                                    </Fragment>
                                    : null
                            }

                            {
                                quotation.status == 'ACCEPTED' && authType == AuthType.COMPANY ?
                                    <Fragment>
                                        <button type="button"
                                                onClick={() => createOrder(quotation.id)}
                                                className="btn btn-form btn-primary btn-rounded px-4 ml-2">
                                            <span>Pagar</span>
                                        </button>
                                    </Fragment>
                                    : null
                            }

                        </div>
                    </div>
                </div>

            </Card.Body>
        </Card>
    );
};

export default StatusQuotationBar;
