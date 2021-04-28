import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/AuthProvider";
import ProjectFields from "./ProjectFields";
import ProjectTaskList from "./ProjectTaskList";
import * as Services from "../../../Services";
import PANEL_COMPANY_ROUTES from "../../../routes/companyRoutes";
import toastr from 'toastr';
import {setInputError} from "../../../helpers/GlobalUtils";

const CreateProjectForm = ({defaultProjectName = null, redirectOnSuccess = null}) => {

    const {auth} = useContext(AuthContext);

    const [project, setProject] = useState({
        name: defaultProjectName ? defaultProjectName : '',
        description: ''
    })

    const [tasks, setTasks] = useState([])


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
                        return window.location.href = redirectOnSuccess ? redirectOnSuccess : PANEL_COMPANY_ROUTES.PROJECTS.path;
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
                />
            </div>
        </div>

    );
};

export default CreateProjectForm;

