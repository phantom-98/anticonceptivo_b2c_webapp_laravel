import React, {useContext, useEffect, useState} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import LazyLoading from "../../../../components/LazyLoading";
import PanelHeader from "../../../../components/ProfessionalProfile/sections/PanelHeader";
import AboutMe from "../../../../components/ProfessionalProfile/sections/AboutMe";
// import EmploymentHistory from "../../../../components/ProfessionalProfile/sections/EmploymentHistory";
import ProfessionalType from "../../../../components/ProfessionalProfile/sections/ProfessionalType";
import ProfesionalDescription from "../../../../components/ProfessionalProfile/sections/ProfesionalDescription";
import ExtraInfo from "../../../../components/ProfessionalProfile/sections/ExtraInfo";
import {AuthContext} from "../../../../context/AuthProvider";
import * as Services from "../../../../Services";
import toastr from "toastr";
import PlatformEvaluation from "../../../../components/PlatformEvaluation";

const Profile = () => {

    const {auth} = useContext(AuthContext)
    const [loaded, setLoaded] = useState(false);
    const [editable, setEditable] = useState(true);
    const [professional, setProfessional] = useState();
    const [projects, setProjects] = useState(0);

    const [review, setReview] = useState();

    const [showPlatformReview, setShowPlatformReview] = useState(false);
    const handleClosePlatformReview = () => setShowPlatformReview(false);
    const handleShowPlatformReview = () => setShowPlatformReview(true);

    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.PROFILE.path,
            name: PANEL_PROFESSIONAL_ROUTES.PROFILE.title
        }
    ];

    useEffect(() => {
        getEvaluation();
        getProfile();
    }, [])

    useEffect(() => {
        if (review) {
            handleShowPlatformReview()
        }
    },[review])

    const getEvaluation = () => {

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.EVALUATIONS.GET_EVALUATION;

        Services.DoPost(url, {
            professional_id : auth.professional_id
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setReview(response.data.review)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const getProfile = () => {

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.GET_PROFILE;

        Services.DoPost(url, {
            professional_id : auth.professional_id
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessional(response.data.professional)
                    setProjects(response.data.projects)
                    setLoaded(true);
                },
                error: () => {
                    toastr.error(response.message);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <BasePanel
            // title="Mi Perfil"
            breadcrumbs={breadcrumbs}>
            <div className="row">
                <div className="col-12">
                    {
                        loaded ? 
                            <div className="row">
                                <div className="col-12">
                                    <PanelHeader
                                        editable={editable}
                                        professional={professional}
                                        setProfessional={setProfessional}
                                    />
                                </div>
                                <div className="col-7">
                                    <AboutMe
                                        title="Sobre mi"
                                        urlPost={Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.UPDATE_ABOUT_ME}
                                        professionalId={professional.id}
                                        initialText={professional.about_me}
                                        editable={editable}
                                    />
                                    <ProfesionalDescription
                                        title="Descripción corta profesional"
                                        urlPost={Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.UPDATE_PROFESIONAL_DESCRIPTION}
                                        professionalId={professional.id}
                                        initialText={professional.professional_description}
                                        editable={editable}
                                    />
                                    {/* <EmploymentHistory
                                        title="Historia laboral"
                                        urlPost={Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.UPDATE_EMPLOYMENT_HISTORY}
                                        professionalId={professional.id}
                                        initialText={professional.employment_history}
                                        editable={editable}
                                    /> */}
                                    <ProfessionalType
                                        urlPost={Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.UPDATE_PROFESSIONAL_TYPE}
                                        professionalId={professional.id}
                                        is_agency={professional.is_agency}
                                        is_freelance={professional.is_freelance}
                                        editable={editable}
                                    />
                                </div>
                                <div className="col-5">
                                    <ExtraInfo
                                        skills={professional.skills}
                                        languages={professional.languages}
                                        workExperiences={professional.work_experiences}
                                        academyExperiences={professional.academy_experiences}
                                        experienceYears={professional.years_experience}
                                        totalProjects={projects}
                                    />
                                </div>
                                {
                                    review ?
                                        <PlatformEvaluation
                                            show={showPlatformReview}
                                            handleClose={handleClosePlatformReview}
                                            review={review}
                                        /> 
                                    : null
                                }
                            </div> 
                        : <LazyLoading/>
                    }

                </div>
            </div>
        </BasePanel>
    );
};

export default Profile;
