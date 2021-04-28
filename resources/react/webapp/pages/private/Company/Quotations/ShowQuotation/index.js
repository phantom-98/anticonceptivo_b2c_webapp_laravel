import React, {Fragment, useContext, useEffect, useState} from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import * as Services from "../../../../../Services";
import toastr from "toastr";
import {AuthContext} from "../../../../../context/AuthProvider";
import NotFound from "../../../../../components/NotFound";
import LazyLoading from "../../../../../components/LazyLoading";
import ShowDetail from "../../../../../components/Projects/Show/ShowDetail";
import QuotationProfessionalCard from "../../../../../components/Quotations/QuotationProfessionalCard";
import ChatQuotations from "../../../../../components/Quotations/ChatQuotations";
import StatusQuotationBar from "../../../../../components/Quotations/StatusQuotationBar";
import ShowResume from "../../../../../components/Quotations/ShowResume";
import ShowDetailEditable from "../../../../../components/Projects/Show/ShowDetailEditable";
import {AppContext} from "../../../../../context/AppProvider";

const ShowQuotation = ({match}) => {

    const {auth} = useContext(AuthContext);
    const {pusherNotifyChannel} = useContext(AppContext);

    const [loaded, setLoaded] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [quotation, setQuotation] = useState();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [commissions, setCommissions] = useState();

    useEffect(() => {
        getQuotation();
    }, [])

    useEffect(() => {
        if(match.params.quotation_id){
            pusherNotifyChannel.bind('change-status-quotation-' + match.params.quotation_id, function () {
                getQuotation()
            });
        }
    }, [match])

    const getQuotation = () => {

        let url = Services.ENDPOINT.PANEL.COMPANY.QUOTATIONS.GET_QUOTATION;

        Services.DoPost(url, {
            quotation_id: match.params.quotation_id,
            company_id: auth.company_id
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {

                    setQuotation(response.data.quotation)
                    setCommissions(response.data.commissions)
                    setLoaded(true);

                    let urlProject = PANEL_COMPANY_ROUTES.QUOTATIONS_SHOW.path;
                    urlProject = urlProject.replace(':quotation_id', response.data.quotation.id);

                    setBreadcrumbs([
                        {
                            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
                            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
                        },
                        {
                            url: PANEL_COMPANY_ROUTES.QUOTATIONS.path,
                            name: PANEL_COMPANY_ROUTES.QUOTATIONS.title
                        },
                        {
                            url: urlProject,
                            name: response.data.quotation.project.name
                        }
                    ])
                },
                error: () => {
                    setNotFound(true)
                    toastr.error(response.message);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <BasePanel
            // title={PANEL_COMPANY_ROUTES.PROJECTS_CREATE.title}
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                <div className="col-12">
                    {
                        notFound ?
                            <NotFound message="Objetivo no encontrado."/> :
                            <Fragment>
                                {
                                    loaded ?
                                        <Fragment>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <StatusQuotationBar quotation={quotation} getQuotation={getQuotation}/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <ShowDetailEditable
                                                        project={quotation.project}
                                                        quotation={quotation}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="row">
                                                        <div className="col-12 mb-3">
                                                            <ShowResume quotation={quotation} commissions={commissions}/>
                                                        </div>
                                                        {/*<div className="col-12 mb-3">*/}
                                                        {/*    <QuotationProfessionalCard*/}
                                                        {/*        professional={quotation.professional}*/}
                                                        {/*    />*/}
                                                        {/*</div>*/}
                                                        <div className="col-12 mb-3">
                                                            <ChatQuotations
                                                                company_id={quotation.company_id}
                                                                professional_id={quotation.professional_id}
                                                                quotation_id={quotation.id}
                                                                disabled={quotation.status == 'CREATED' || quotation.status == 'ACCEPTED' ? true : false  }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment> :
                                        <LazyLoading/>
                                }
                            </Fragment>
                    }
                </div>
            </div>
        </BasePanel>
    );
};

export default ShowQuotation;
