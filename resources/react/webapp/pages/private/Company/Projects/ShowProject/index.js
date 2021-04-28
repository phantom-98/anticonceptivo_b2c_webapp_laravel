import React, {Fragment, useContext, useEffect, useState} from 'react';

import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import * as Services from "../../../../../Services";
import toastr from "toastr";
import {AuthContext} from "../../../../../context/AuthProvider";
import NotFound from "../../../../../components/NotFound";
import LazyLoading from "../../../../../components/LazyLoading";
import ShowDetail from "../../../../../components/Projects/Show/ShowDetail";
import QuotationList from "../../../../../components/Projects/Show/QuotationsList";

const ShowProject = ({match}) => {

    const {auth} = useContext(AuthContext);

    const [loaded, setLoaded] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [project, setProject] = useState();
    const [breadcrumbs, setBreadcrumbs] = useState([]);


    useEffect(() => {
        getProject();
    }, [])

    const getProject = () => {

        let url = Services.ENDPOINT.PANEL.COMPANY.PROJECTS.GET_PROJECT;

        Services.DoPost(url, {
            project_id: match.params.project_id,
            company_id : auth.company_id
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {

                    setProject(response.data.project)
                    setLoaded(true);

                    let urlProject = PANEL_COMPANY_ROUTES.PROJECTS_SHOW.path;
                    urlProject = urlProject.replace(':project_id', response.data.project.id);

                    setBreadcrumbs([
                        {
                            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
                            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
                        },
                        {
                            url: PANEL_COMPANY_ROUTES.PROJECTS.path,
                            name: PANEL_COMPANY_ROUTES.PROJECTS.title
                        },
                        {
                            url: urlProject,
                            name: response.data.project.name
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
                                                <div className="col">
                                                    <ShowDetail project={project} getProject={getProject} />
                                                </div>
                                                <div className="col-md-4">
                                                    <QuotationList
                                                        companyId={auth.company_id}
                                                        projectId={project.id}
                                                        quotations={project.quotations}
                                                        getProject={getProject}
                                                    />
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

export default ShowProject;
