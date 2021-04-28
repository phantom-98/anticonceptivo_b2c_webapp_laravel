import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Card} from "react-bootstrap";

import PersonalInfo from "./PersonalInfo";
import BillingInfo from "./BillingInfo";

import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import {AuthContext} from "../../../../context/AuthProvider";
import * as Services from "../../../../Services";
import LazyLoading from "../../../../components/LazyLoading";
import {Redirect} from "react-router-dom";
import {runView} from "./actions";

const CompleteProfile = () => {

    const {auth} = useContext(AuthContext);

    const [load, setLoad] = useState(false)
    const [showingSection, setShowingSection] = useState('personalInfo');// personalInfo and billingInfo
    const [company, setCompany] = useState({});


    useEffect(() =>{
        if(auth){
            getProfile();
        }
    }, [auth]);

    useEffect(() =>{

    }, [company])

    const getProfile = () => {
        let url = Services.ENDPOINT.PANEL.COMPANY.COMPLETE_PROFILE.GET_PROFILE;

        Services.DoPost(url, {company_id : auth.company_id}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setCompany(response.data.company)
                    setShowingSection(runView(response.data.company.profile_section_status))
                    setLoad(true)
                },
                error: () => {
                   // toastr.error(response.message);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-12">
                    <Card style={{minHeight: '435px'}}>
                        <Card.Body>
                            <div className="row py-4 px-5">
                                {
                                    load ? 
                                        <div className="col-md-12 px-4">
                                            {
                                                showingSection === 'personalInfo' ? <PersonalInfo company={company}  setCompany={setCompany} setShowingSection={setShowingSection}/> : null
                                            }
                                            {
                                                showingSection === 'billingInfo' ? <BillingInfo company={company} setCompany={setCompany} setShowingSection={setShowingSection}/> : null
                                            }
                                            {
                                                showingSection === 'completed' ? <Redirect to={PANEL_COMPANY_ROUTES.COMPLETED_PROFILE.path}/> : null
                                            }
                                        </div>
                                        :<LazyLoading height="200px" />

                                }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div onClick={() => {
                    window.location.href = PANEL_COMPANY_ROUTES.DASHBOARD.path;
                }} className="col-12 text-center py-3">
                    <span className="font-epilogue font-14 light btn-link pointer">
                        Continuar más tarde
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default CompleteProfile;
