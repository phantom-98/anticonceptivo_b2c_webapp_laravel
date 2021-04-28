import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import Terms from "./Terms";
import Abilities from "./Abilities";
import BasicInfo from "./BasicInfo";
import ExtraInfo from "./ExtraInfo";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import {AuthContext} from "../../../../context/AuthProvider";
import {runView} from "./actions";
import * as Services from "../../../../Services";
import LazyLoading from "../../../../components/LazyLoading";
import {Redirect} from "react-router-dom";

const CompleteProfile = () => {

    const {auth} = useContext(AuthContext);

    const [load, setLoad] = useState(false)
    const [showingSection, setShowingSection] = useState('terms');
    const [professional, setProfessional] = useState({});


    useEffect(() =>{
        if(auth){
            getProfile();
        }
    }, [auth]);

    useEffect(() =>{

    }, [professional])

    const getProfile = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.COMPLETE_PROFILE.GET_PROFILE;

        Services.DoPost(url, {professional_id : auth.professional_id}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessional(response.data.professional)
                    setShowingSection(runView(response.data.professional.profile_section_status))
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
                                                showingSection === 'terms' ? <Terms professional={professional}  setProfessional={setProfessional} setShowingSection={setShowingSection}/> : null
                                            }
                                            {
                                                showingSection === 'abilities' ? <Abilities  professional={professional}  setProfessional={setProfessional} setShowingSection={setShowingSection}/> : null
                                            }
                                            {
                                                showingSection === 'basicInfo' ? <BasicInfo  professional={professional}  setProfessional={setProfessional} setShowingSection={setShowingSection}/> : null
                                            }
                                            {
                                                showingSection === 'extraInfo' ? <ExtraInfo  professional={professional}  setProfessional={setProfessional} setShowingSection={setShowingSection}/> : null
                                            }
                                            {
                                                showingSection === 'completed' ? <Redirect to={PANEL_PROFESSIONAL_ROUTES.COMPLETED_PROFILE.path}/> : null
                                            }
                                        </div>
                                        :<LazyLoading height="200px" />

                                }
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div onClick={() => {
                    window.location.href = PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path;
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
