import React, {Fragment, useEffect, useState} from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import * as Services from "../../../../../Services";
import toastr from "toastr";
import NotFound from "../../../../../components/NotFound";
import PublicProfileBar from "../../../../../components/ProfessionalProfile/PublicProfileBar";
import LazyLoading from "../../../../../components/LazyLoading";
import AboutMe from "../../../../../components/ProfessionalProfile/sections/AboutMe";
import EmploymentHistory from "../../../../../components/ProfessionalProfile/sections/EmploymentHistory";
import ProfessionalType from "../../../../../components/ProfessionalProfile/sections/ProfessionalType";
import ProfesionalDescription from "../../../../../components/ProfessionalProfile/sections/ProfesionalDescription";
import ExtraInfo from "../../../../../components/ProfessionalProfile/sections/ExtraInfo";

const ProfessionalProfile = ({match}) => {

    const [loaded, setLoaded] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [professional, setProfessional] = useState();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [projects, setProjects] = useState(0);

    useEffect(() => {
        getProfesional();
    }, [])

    const getProfesional = () => {

        let url = Services.ENDPOINT.PANEL.COMPANY.PROFESSIONALS.GET_PROFESSIONAL;

        Services.DoPost(url, {
            username: match.params.username
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {

                    setProfessional(response.data.professional)
                    setProjects(response.data.projects)
                    setLoaded(true);

                    let urlProfile = PANEL_COMPANY_ROUTES.PROFESSIONAL_PROFILE.path;
                    urlProfile = urlProfile.replace(':username', response.data.professional.username);

                    setBreadcrumbs( [
                        {
                            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
                            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
                        },
                        {
                            url: PANEL_COMPANY_ROUTES.PROFESSIONAL_LIST.path,
                            name: PANEL_COMPANY_ROUTES.PROFESSIONAL_LIST.title
                        },
                        {
                            url: urlProfile,
                            name: response.data.professional.full_name
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
            breadcrumbs={breadcrumbs}>
            <div className="row">
               <div className="col-md-12">
                   {

                       notFound ?
                           <NotFound message="Profesional no encontrado."/> :
                           <Fragment>
                               {
                                   loaded ?
                                       <Fragment>
                                           <PublicProfileBar professional={professional} section="profile"/>
                                           <div className="row pb-4">
                                               <div className="col-12">
                                                   <div className="row">
                                                       <div className="col-7">
                                                           <AboutMe
                                                               title="Sobre mi"
                                                               urlPost="#"
                                                               professionalId={professional.id}
                                                               initialText={professional.about_me}
                                                               editable={false}
                                                           />
                                                           <EmploymentHistory
                                                               title="Historia laboral"
                                                               urlPost="#"
                                                               professionalId={professional.id}
                                                               initialText={professional.employment_history}
                                                               editable={false}
                                                           />
                                                           <ProfessionalType
                                                               urlPost="#"
                                                               professionalId={professional.id}
                                                               is_agency={professional.is_agency}
                                                               is_freelance={professional.is_freelance}
                                                               editable={false}
                                                           />
                                                           <ProfesionalDescription
                                                               title="Descripción corta profesional"
                                                               urlPost="#"
                                                               professionalId={professional.id}
                                                               initialText={professional.professional_description}
                                                               editable={false}
                                                           />
                                                       </div>
                                                       <div className="col-5">
                                                           <ExtraInfo
                                                                skills={professional.skills}
                                                                languages={professional.languages}
                                                                experienceYears={professional.years_experience}
                                                                workExperiences={professional.work_experiences}
                                                                academyExperiences={professional.academy_experiences}
                                                                totalProjects={projects}
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

export default ProfessionalProfile;
