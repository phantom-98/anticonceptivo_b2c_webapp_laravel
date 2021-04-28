import React, {Fragment, useEffect, useState} from 'react';
import TaskItem from "./TaskItem";
import * as Services from "../../../../../../Services";
import {Card} from "react-bootstrap";
import toast from 'toastr';

const Tasks = ({schedulesToBuy, professionalId, companyId}) => {

    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const defaultTask = {
        name: '',
        description: '',
        file: null,
        hours: 0
    }
    const [tasks, setTasks] = useState([]);
    const [hoursLeft, setHoursLeft] = useState(0);
    const [hoursSelected, setHoursSelected] = useState(schedulesToBuy.length);

    useEffect(() => {
        let left = 0;
        let total = schedulesToBuy.length;
        let final = 0;
        tasks.map(task => {
            left = left + parseInt(task.hours);
            console.log('task hours:', task.hours);
        })
        console.log('left: ',left);
        console.log('total: ',total);
        console.log('final: ',total-left);
        final = total - left;
        console.log("schedule to buy: ", schedulesToBuy);
        // setHoursLeft(schedulesToBuy.length - left)
        setHoursLeft(final)

    }, [tasks])

    const addTask = () => {
        setTasks([
            ...tasks,
            defaultTask
        ])
    }

    const removeTask = (index) => {

        const list = tasks.filter((t, i) => i !== index)
        setTasks(list)
    }


    const handleProject = (e, index) => {
        const newList = [...tasks]
        const found = newList.findIndex((o, i) => i === index);

        console.log('sssssssssssssssss');
        console.log('Name: ',e.target.name,' Value: ',e.target.value);

        newList[found] = {
            ...newList[found],
            [e.target.name]: e.target.name === 'file' ? e.target.files[0] : e.target.value
        };

        setTasks(newList)
    }

    const saveTasks = () => {

        setSending(true)

        let url = Services.ENDPOINT.QUOTATION.STORE;
        const formData = new FormData();


        formData.append('professional_id', professionalId)
        formData.append('company_id', companyId)
        formData.append('schedules_to_buy', JSON.stringify(schedulesToBuy));
        // formData.append('tasks', JSON.stringify(tasks));

        tasks.map((task, index) => {
            formData.append('tasks[' + index + '][name]', task.name);
            formData.append('tasks[' + index + '][description]', task.description);
            formData.append('tasks[' + index + '][file]', task.file ? task.file : null);
            formData.append('tasks[' + index + '][hours]', task.hours);
        });


        Services.DoPost(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success('Solicitud enviada correctamente')
                    setSent(true)
                },
                error: () => {
                    toastr.error('No se ha podido enviar su solicitud, por favor re-intente.')
                },
            });
            setSending(false)
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Fragment>
            {
                sent ?
                    <div className="row mt-2">
                        <div className="col-12">
                            <Card>
                                <Card.Body>
                                    <div className="row py-5">
                                        <div className="col-12 text-center pb-3">
                                            <h3 className="font-25 bold text-primary">Solicitud enviada correctamente</h3>
                                            <p className="font-14 light color-3B3B3B">
                                                El profesional se pondrá en contacto con uds.
                                            </p>
                                        </div>
                                        <div className="col-12 text-center py-3">
                                            <button className="btn btn-primary btn-rounded btn-form"  style={{ width : '200px'}}
                                                    onClick={() => window.location.href = '/dashboard/company/professionals'}>
                                                <span className="font-12 regular px-4">VER PROFESIONALES</span>
                                            </button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    :
                    <div className="row mt-2">

                        <div className="col-12">
                            {
                                tasks.map((task, index) => {
                                    return <TaskItem key={index}
                                                     task={task}
                                                     index={index}
                                                     removeTask={removeTask}
                                                     hoursLeft={hoursLeft}
                                                     hoursSelected={hoursSelected}
                                                     handleProject={handleProject}/>
                                })
                            }
                        </div>

                        <div className="col-12">
                            <div className="mb-3">
                                <Card style={{height: 'auto', background: '#F2F7FD'}}>
                                    <Card.Body>
                                        <div className="text-right">
                                            <span className="font-13 regular color-3C3C3E">Horas restantes: {hoursLeft}</span>
                                            <div onClick={addTask} className="pointer">
               <span className="font-13 regular color-3C3C3E">Agregar nueva tarea <img
                   src="/themes/react/images/icons/add-task.svg" rel="nofollow"/></span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>


                        <div className="col-md-12 pt-4">
                            <div className="form-group text-center">
                                {
                                    sending ? <button className="btn btn-primary btn-rounded btn-form" disabled>
                                            <span className="font-12 regular">Enviando Solicitud...</span>
                                        </button> :
                                        <button className="btn btn-primary btn-rounded btn-form" onClick={saveTasks}>
                                            <span className="font-12 regular">Enviar Solicitud</span>
                                        </button>
                                }
                            </div>
                        </div>

                    </div>
            }
        </Fragment>
    );
};

export default Tasks;
