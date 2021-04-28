import React, {Fragment, useContext, useEffect, useState} from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import * as Services from "../../../../../Services";
import toastr from "toastr";
import NotFound from "../../../../../components/NotFound";
import PublicProfileBar from "../../../../../components/ProfessionalProfile/PublicProfileBar";
import LazyLoading from "../../../../../components/LazyLoading";
import Contact from "./Contact";
import {AuthContext} from "../../../../../context/AuthProvider";

const ProfessionalContact = ({match}) => {

    const {auth} = useContext(AuthContext);

    const [loaded, setLoaded] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [professional, setProfessional] = useState();
    const [breadcrumbs, setBreadcrumbs] = useState([]);


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
                    setLoaded(true);

                    let urlProfile = PANEL_COMPANY_ROUTES.PROFESSIONAL_PROFILE.path;
                    urlProfile = urlProfile.replace(':username', response.data.professional.username);

                    let urlContrato = PANEL_COMPANY_ROUTES.PROFESSIONAL_CONTACT.path;
                    urlContrato = urlContrato.replace(':username', response.data.professional.username);

                    setBreadcrumbs([
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
                        },
                        {
                            url: urlContrato,
                            name: PANEL_COMPANY_ROUTES.PROFESSIONAL_CONTACT.title
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
                                            <PublicProfileBar professional={professional} section="contact"/>
                                            <div className="row">
                                                <div className="col-12">
                                                    <Contact
                                                        professionalId={professional.id}
                                                        companyId={auth.company_id}/>
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

export default ProfessionalContact;
