import React, {Fragment, useEffect, useState, useContext} from "react";
import BasePanel from "../../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import LazyLoading from "../../../../../components/LazyLoading";
import toastr from "toastr";
import Tasks from "./Tasks";
import CreateProjectForm from "../../../../../components/Projects/Create/CreateProjectForm";
import Calendars from "./Calendars";
import NotFound from "../../../../../components/NotFound";
import {AuthContext} from "../../../../../context/AuthProvider";
import * as Services from "../../../../../Services";
import PublicProfileBar from "../../../../../components/ProfessionalProfile/PublicProfileBar";
import moment from "moment";
import Assign from "./Assign";

const ProfessionalAvailability = ({match}) => {

    const {auth} = useContext(AuthContext);
    const [loaded, setLoaded] = useState(false); // ahora tenemos context
    const [notFound, setNotFound] = useState(false);
    const [professional, setProfessional] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const [showingCreateTasks, setShowingCreateTasks] = useState(false);

    const [schedulesToBuy, setSchedulesToBuy] = useState([]);

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


    const confirmHours = () => {
        if (schedulesToBuy.length === 0) {
            toastr.warning("Seleccione horas");
            return null;
        }
        setShowingCreateTasks(true);
    };

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
                                            <PublicProfileBar professional={professional} section="schedule"/>
                                            <div className="row">
                                                <div className="col-12">
                                                    {
                                                        showingCreateTasks ?
                                                            <Assign professional={professional} slots={schedulesToBuy}/>
                                                            // <Tasks
                                                            //     schedulesToBuy={schedulesToBuy}
                                                            //     professionalId={professional.id}
                                                            //     companyId={auth.company_id}
                                                            // />
                                                            :
                                                            <Calendars
                                                                professionalId={professional.id}
                                                                priceHour={professional.price_hour}
                                                                schedulesToBuy={schedulesToBuy}
                                                                setSchedulesToBuy={setSchedulesToBuy}
                                                                confirmHours={confirmHours}
                                                            />}
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

export default ProfessionalAvailability;
