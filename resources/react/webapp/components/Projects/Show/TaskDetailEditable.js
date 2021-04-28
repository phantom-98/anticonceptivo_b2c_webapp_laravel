import React, {useContext, useEffect, useState, Fragment} from 'react';
import {Card} from "react-bootstrap";
import {formatMoney} from "../../../helpers/GlobalUtils";
import {AuthType} from "../../../Globals";
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";
import toastr from 'toastr';
import {formatTaskStatus} from "../../../helpers/HelperStatus";
import Header from "./TaskDetailSections/Header";
import Description from "./TaskDetailSections/Description";
import Cost from "./TaskDetailSections/Cost";

const TaskDetailEditable = ({task, index, taskPrice, quotationId, quotationStatus, projectStatus, flag}) => {

    const taskId = taskPrice.task_id ? taskPrice.task_id : -1;
    const totalHours = taskPrice.total_minutes ? (taskPrice.total_minutes / 60) : 0;
    const priceHour = taskPrice.price_hour ? (taskPrice.price_hour) : 0;
    const total = totalHours * priceHour;
    const deadline = taskPrice.deadline ? taskPrice.deadline : '';

    const defaultModel = {
        quotation_id: quotationId,
        task_id: taskId,
        total_hours: totalHours,
        price_hour: priceHour,
        total: total,
        deadline: deadline
    }

    const [model, setModel] = useState(defaultModel)

    const {authType} = useContext(AuthContext)

    const [editable, setEditable] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setModel(defaultModel)
    }, [taskPrice])

    const handleForm = (e) => {
        setModel({
            ...model,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const handleDeadline = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const cancel = () => {
        setModel(defaultModel)
        setEditable(false)
        setUpdating(false)
    }

    const update = () => {
        setUpdating(true)

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.QUOTATIONS.UPDATE_TASK;

        Services.DoPost(url, model)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success('Valores actualizados.')
                        setEditable(false)
                        setUpdating(false)
                    },
                    error: () => {
                        toastr.error('No ha sido posible actualizar.')
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };


    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <Card>
                    <Header
                        index={index}
                        taskId={task.id}
                        taskStatus={task.status}
                        projectStatus={projectStatus}
                    />

                    <Card.Body>

                        <Description task={task}/>

                        {
                            !editable ?
                                <Cost
                                    totalHours={model.total_hours}
                                    priceHour={model.price_hour}
                                    deadline={model.deadline}
                                    total={total}
                                    setEditable={setEditable}
                                    quotationStatus={quotationStatus}
                                    flag={flag}
                                />
                                : <Fragment>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group form-group-w2 mb-1">
                                            <input
                                                type="number"
                                                name="total_hours"
                                                id="total_hours"
                                                value={model.total_hours}
                                                onChange={handleForm}
                                                className={`form-control form-control-w2 ${
                                                    model.total_hours
                                                        ? "has-value"
                                                        : ""
                                                }`}
                                            />
                                            <label htmlFor="total_hours">Horas</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-w2 mb-1">
                                            <input
                                                type="number"
                                                name="price_hour"
                                                id="price_hour"
                                                value={model.price_hour}
                                                onChange={handleForm}
                                                className={`form-control form-control-w2 ${
                                                    model.price_hour
                                                        ? "has-value"
                                                        : ""
                                                }`}
                                            />
                                            <label htmlFor="price_hour">Valor Hora</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-w2 mb-1">
                                            <input
                                                type="date"
                                                name="deadline"
                                                id="deadline"
                                                value={model.deadline}
                                                onChange={handleDeadline}
                                                className={`form-control form-control-w2 has-value`}
                                            />
                                            <label htmlFor="deadline">Fecha limite</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pull-right">
                                    {
                                        authType == AuthType.PROFESSIONAL ?
                                            <div className="col-auto mt-3">
                                                <button
                                                    onClick={cancel}
                                                    type="button"
                                                    className="btn btn-form btn-outline-secondary btn-rounded px-4">
                                                    <span>Cancelar</span>
                                                </button>

                                                {
                                                    !updating ?
                                                        <button
                                                            onClick={update}
                                                            type="button"
                                                            className="btn btn-form btn-primary btn-rounded px-4 ml-2">
                                                            <span>Actualizar</span>
                                                        </button>
                                                        :
                                                        <button
                                                            type="button"
                                                            className="btn btn-form btn-primary btn-rounded disabled px-4 ml-2">
                                                            <span>Actualizar</span>
                                                        </button>
                                                }
                                            </div>
                                            : null
                                    }
                                </div>
                            </Fragment> 
                        }


                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default TaskDetailEditable;
