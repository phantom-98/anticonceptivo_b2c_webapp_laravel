import React, {useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import {AuthContext} from "../../../../../../context/AuthProvider";
import {setInputError} from "../../../../../../helpers/GlobalUtils";
import toastr from "toastr";
import * as Services from "../../../../../../Services";
import PANEL_COMPANY_ROUTES from "../../../../../../routes/companyRoutes";
import ProjectFields from "../../../../../../components/Projects/Create/ProjectFields";
import ProjectTaskList from "../../../../../../components/Projects/Create/ProjectTaskList";
import moment from 'moment';

const Assign = ({professional, slots = null}) => {

    const {auth} = useContext(AuthContext);

    const [assigns, setAssigns] = useState([professional.id]);

    const [project, setProject] = useState({
        // name: 'Objetivo ' + moment().format('YYYYMMDDHHmmss'),
        name: '',
        description: ''
    })

    const [tasks, setTasks] = useState([])
    const [availableHours, setAvailableHours] = useState( slots ? slots.length : null )

    const store = () => {

        if ((project.name).trim().length === 0) {
            // toastr.error('Por favor ingrese un nombre al objetivo.')
            setInputError('name', 'Por favor ingrese un nombre al objetivo.')
            return null;
        }

        if (tasks.length === 0) {
            toastr.error('Por favor cree al menos una tarea.')
            return null;
        }

        let error = false

        tasks.map((task, index) => {
            if ((task.name).trim().length === 0) {
                setInputError(`task_name_${index}`, 'Por favor ingrese un nombre.')
                error = true;
            }
            if ((task.description).trim().length === 0) {
                setInputError(`task_description_${index}`, 'Por favor ingrese una descripción.')
                error = true;
            }
            if ((task.hours).trim().length === 0) {
                setInputError(`task_hours_${index}`, 'Por favor ingrese una cantidad de horas.')
                error = true;
            }
        })

        if (error) {
            return null
        }


        let url = Services.ENDPOINT.PANEL.COMPANY.PROJECTS.CREATE_WITH_TASKS;

        const formData = new FormData();

        formData.append('name', project.name);
        formData.append('description', project.description);
        formData.append('company_id', auth.company_id);
        tasks.map((task, index) => {
            formData.append('task['+index+']', JSON.stringify(task));
            let fileList = [...task.files]
            if (fileList.length > 0) {
                for(let i=0; i < fileList.length; i++){
                    formData.append('task_files_'+index+'[]', fileList[i]);
                }
            }
        })

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        Services.DoPost(url, formData, config)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        assignsQuotations(response.data.project.id);
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
    };

    const assignsQuotations = (projectId) => {
        let url = Services.ENDPOINT.PANEL.COMPANY.QUOTATIONS.ASSIGNS;
        let data = {
            assigns: assigns,
            project_id: projectId,
            company_id: auth.company_id,
            slots : slots
        }
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success(response.message)
                        return window.location.href = PANEL_COMPANY_ROUTES.PROJECTS.path;
                    },
                    error: () => {
                        toastr.error(response.message)
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    return (

        <div className="row">
            <div className="col-4">
                <ProjectFields
                    project={project}
                    setProject={setProject}
                />
            </div>

            <div className="col-8">
                <ProjectTaskList
                    tasks={tasks}
                    setTasks={setTasks}
                    store={store}
                    availableHours={availableHours}
                />
            </div>
        </div>

    );
};

export default Assign;
