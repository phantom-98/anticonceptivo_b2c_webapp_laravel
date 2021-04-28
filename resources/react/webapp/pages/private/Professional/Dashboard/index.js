import React, {useEffect, useState, useContext} from 'react';
import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import LazyLoading from "../../../../components/LazyLoading";
import {AuthContext} from "../../../../context/AuthProvider"
import * as Services from "../../../../Services";

const Dashboard = () => {

    window.location.href = PANEL_PROFESSIONAL_ROUTES.PROFILE.path;
    const { auth } = useContext(AuthContext);


    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        }
    ]

    const [dataLoaded, setDataLoad] = useState(false);

    const [taskTodo, setTaskTodo] = useState(0);
    const [taskDoing, setTaskDoing] = useState(0);
    const [taskInRevision, setTaskInRevision] = useState(0);
    const [tasksPaused,setTasksPaused] = useState(0);
    const [tasksDone,setTasksDone] = useState(0);
    const [tasksFinished,setTasksFinished] = useState(0);
    const [tasksApproved,setTasksApproved] = useState(0);
    const [projectsInProgress, setProjectsInProgress] = useState(0);
    const [projectsAccepted, setProjectsAaccepted] = useState(0);
    const [projectsRejected, setProjectsRejected] = useState(0);
    const [projectsFinished, setProjectsFinished] = useState(0);
    const [quotationsCanceled, setQuotationsCanceled] = useState(0);
    const [quotationsAccepted, setQuotationsAccepted] = useState(0);
    const [quotationsRejected, setQuotationsRejected] = useState(0);
    const [quotationsFinished, setQuotationsFinished] = useState(0);

    useEffect(()=>{
        getResources();
    },[])

    const getResources = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.DASHBOARD.GET_RESOURCES
        let data = {
            professional_id: auth.professional_id
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                setTaskTodo(response.data.tasks_todo);
                setTaskDoing(response.data.tasks_doing);
                setTaskInRevision(response.data.tasks_in_revision);
                setTasksPaused(response.data.tasks_paused);
                setTasksDone(response.data.tasks_done);
                setTasksFinished(response.data.tasks_finished);
                setTasksApproved(response.data.tasks_approved);
                setProjectsInProgress(response.data.projects_in_progress);
                setProjectsAaccepted(response.data.projects_accepted);
                setProjectsRejected(response.data.projects_rejected);
                setProjectsFinished(response.data.projects_finished);
                setQuotationsCanceled(response.data.quotations_canceled);
                setQuotationsAccepted(response.data.quotations_accepted);
                setQuotationsRejected(response.data.quotations_rejected);
                setQuotationsFinished(response.data.quotations_finished);
                setDataLoad(true);

                // toastr.success(response.message);
              },
              error: () => {
                // toastr.error(response.message);
              },
              warning: () => {
                // toastr.warning(response.message);
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <LazyLoading height="80vh"/>
        // <BasePanel
        //     title={"Bienvenido " + auth.professional.full_name}
        //     breadcrumbs={breadcrumbs}
        // >
        //     { dataLoaded ?
        //         <div className="row">
        //             <div className="col-md-4">
        //                 <div className="card">
        //                     <div className="card-body">
        //                         <div className="row mb-3">
        //                             <div className="col-md-12">
        //                                 <h3 className="font-signika font-22 bold text-primary">
        //                                     RESUMEN TAREAS
        //                                 </h3>
        //                             </div>
        //                         </div>
        //                         <div className="row">
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     PENDIENTES
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {taskTodo}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     EN PROGRESO
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {taskDoing}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     PAUSADA
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {tasksPaused}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     REALIZADA
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {tasksDone}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     EN REVISIÓN
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {taskInRevision}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     TERMINADA
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {tasksFinished}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     APROBADA
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {tasksApproved}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-md-4">
        //                 <div className="card">
        //                     <div className="card-body">
        //                         <div className="row mb-3">
        //                             <div className="col-md-12">
        //                                 <h3 className="font-signika font-22 bold text-primary">
        //                                     RESUMEN PROYECTOS
        //                                 </h3>
        //                             </div>
        //                         </div>
        //                         <div className="row">
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     ACEPTADOS
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {projectsAccepted}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     EN PROGRESO
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {projectsInProgress}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     RECHAZADOS
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {projectsRejected}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-12 mb-2">
        //                                 <h3 className="font-signika font-14 text-primary mb-1">
        //                                     TERMINADOS
        //                                 </h3>
        //                                 <div className="text-right">
        //                                     <span className="font-signika font-20 bold text-secondary d-block">
        //                                         {projectsFinished}
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-md-4">
        //             <div className="card">
        //                 <div className="card-body">
        //                     <div className="row mb-3">
        //                         <div className="col-md-12">
        //                             <h3 className="font-signika font-22 bold text-primary">
        //                                 RESUMEN SOLICITUDES
        //                             </h3>
        //                         </div>
        //                     </div>
        //                     <div className="row">
        //                         <div className="col-md-12 mb-2">
        //                             <h3 className="font-signika font-14 text-primary mb-1">
        //                                 ACEPTADAS
        //                             </h3>
        //                             <div className="text-right">
        //                                 <span className="font-signika font-20 bold text-secondary d-block">
        //                                     {quotationsAccepted}
        //                                 </span>
        //                             </div>
        //                         </div>
        //                         <div className="col-md-12 mb-2">
        //                             <h3 className="font-signika font-14 text-primary mb-1">
        //                                 CANCELADAS
        //                             </h3>
        //                             <div className="text-right">
        //                                 <span className="font-signika font-20 bold text-secondary d-block">
        //                                     {quotationsCanceled}
        //                                 </span>
        //                             </div>
        //                         </div>
        //                         <div className="col-md-12 mb-2">
        //                             <h3 className="font-signika font-14 text-primary mb-1">
        //                                 RECHAZADAS
        //                             </h3>
        //                             <div className="text-right">
        //                                 <span className="font-signika font-20 bold text-secondary d-block">
        //                                     {quotationsRejected}
        //                                 </span>
        //                             </div>
        //                         </div>
        //                         <div className="col-md-12 mb-2">
        //                             <h3 className="font-signika font-14 text-primary mb-1">
        //                                 TERMINADAS
        //                             </h3>
        //                             <div className="text-right">
        //                                 <span className="font-signika font-20 bold text-secondary d-block">
        //                                     {quotationsFinished}
        //                                 </span>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         </div>
        //     : <LazyLoading/>}
        // </BasePanel>

    );
};

export default Dashboard;
