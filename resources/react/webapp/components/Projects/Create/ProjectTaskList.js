import React, {Fragment, useState, useEffect} from 'react';
import {Card} from "react-bootstrap";
import TaskFields from "./TaskFields";

const ProjectTaskList = ({tasks, setTasks, store, availableHours}) => {

    const defaultTask = {
        name: '',
        description: '',
        files: [],
        hours: '',
    };

    const [hours, setHours] = useState(0);
    const [totalHours, setTotalHours] = useState(0);

    useEffect(() => {
        if (availableHours != null) {
            onBlurTask();
            setTotalHours(availableHours-hours)
        }
    },[hours,tasks])

    const onChangeTask = (e, index) => {
        let newList = [...tasks]
        let found = newList.findIndex((o, i) => i === index);

        if (e.target.name === 'files') {
            let temp_element = { ...newList[found] };
            temp_element.files = [
                ...temp_element.files,
                e.target.files[0]
            ]
            newList[found] = temp_element;
        }else{
            newList[found] = {
                ...newList[found],
                [e.target.name]: e.target.value
            };
        }
        setTasks(newList)
    }

    const onBlurTask = () => {
        var taskHours = 0
        if (tasks.length > 0) {
            tasks.map((task, index) =>{
                if (!task.hours == '') {
                    taskHours += parseInt(task.hours)   
                }
            })
        }
        setHours(taskHours);
    }

    const removeTask = (index) => {
        const list = tasks.filter((t, i) => i !== index)
        setTasks(list)
    }

    const removeTaskFile = (index, fileIndex) => {
        let list = [...tasks];
        let elements = list[index].files;
        let mutator = elements.filter((e, i) => i !== fileIndex)

        list[index].files = mutator;

        setTasks(list)
    }

    const addTask = () =>{
        setTasks([
            ...tasks,
            defaultTask
        ])
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 mb-3 pl-0">
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col">
                                    <h2 className="font-signika font-20 bold text-secondary mb-0">
                                        Tareas del objetivo ({tasks.length}) {' '}
                                        {
                                            availableHours != null ? 
                                            <span className={`${totalHours > 0 ? 'text-warning' : totalHours < 0 ? 'text-danger' : ''}`}>Horas Disponible: { totalHours }</span>
                                            : ''
                                        }
                                    </h2>
                                </div>
                                <div className="col-auto">
                                    {
                                        totalHours === 0 || availableHours == null ? 
                                            totalHours === 0 ? 
                                                <button onClick={store}
                                                className={`btn btn-primary btn-rounded btn-form`}>
                                                    <span className="font-12 regular">
                                                        <i className="fa fa-plus"/> Crear Objetivo
                                                    </span>
                                                </button> : null
                                        : null
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div className="row task-list">
                {
                    tasks.map((task, index) => {
                        return <TaskFields
                            key={index}
                            index={index}
                            task={task}
                            onChangeTask={onChangeTask}
                            onBlurTask={ availableHours != null ? onBlurTask : null}
                            removeTask={removeTask}
                            removeTaskFile={removeTaskFile}
                        />
                    })
                }
            </div>

            <div className="row">
                <div className="col-12 mb-3 pl-0">
                    <div className="mb-3">
                        <Card style={{height: 'auto', background: '#F2F7FD'}}>
                            <Card.Body>
                                <div className="text-right">
                                    {/*<span className="font-13 regular color-3C3C3E">Horas restantes: {hoursLeft}</span>*/}
                                    <div onClick={addTask} className="pointer">
                                           <span className="font-13 regular color-3C3C3E">
                                               Agregar nueva tarea <img
                                               src="/themes/web/assets/images/icons/add-task.svg" rel="nofollow"/>
                                           </span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProjectTaskList;
