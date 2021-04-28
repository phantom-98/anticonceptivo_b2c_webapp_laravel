import React from 'react';

import {Card} from "react-bootstrap";

const TaskItem = ({task, index, hoursLeft, hoursSelected, handleProject, removeTask}) => {


    return (
        <div className="row mb-4" key={index}>
            <div className="col-12">
                <div className="mb-3">
                    <Card style={{height: "auto", background: "#F7B589"}}>
                        <Card.Body style={{padding: "0.75rem 1.25rem"}}>
                            <div className="row">
                                <div className="col">
                                    <span className="font-18 bold text-white">
                                        Tarea {index + 1}
                                    </span>
                                </div>
                                <div className="col text-right">
                                    <span className="pointer text-primary" onClick={() => removeTask(index)}>
                                        <i className="fa fa-trash"/>
                                    </span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <div className="col-8">
                <div className="mb-3">
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label
                                            className="font-14 bold text-primary"
                                            htmlFor="name"
                                        >
                                            Nombre de la tarea
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom form-control-custom-45"
                                            // id="name"
                                            name="name"
                                            onChange={e =>
                                                handleProject(e, index)
                                            }
                                            value={task.name}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label
                                            className="font-14 bold text-primary"
                                            htmlFor="description"
                                        >
                                            Descripción de la tarea
                                        </label>
                                        <textarea
                                            rows="4"
                                            className="form-control form-control-custom form-control-custom-45"
                                            // id="description"
                                            name="description"
                                            onChange={e =>
                                                handleProject(e, index)
                                            }
                                            value={task.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="col-4">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-3">
                            <Card>
                                <Card.Body>
                                    <div className="form-group">
                                        <label
                                            className="font-14 bold text-primary"
                                            htmlFor={"file." + index}
                                        >
                                            Agregar Documento
                                        </label>
                                        <div
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "file." + index
                                                    )
                                                    .click()
                                            }
                                            className="form-control form-control-custom form-control-custom-45"
                                            style={{
                                                height: "45px",
                                                lineHeight: "29px"
                                            }}
                                        >
                                            {task.file && "name" in task.file
                                                ? task.file.name
                                                : ""}
                                        </div>
                                        <input
                                            type="file"
                                            // className="form-control form-control-custom form-control-custom-45"
                                            id={"file." + index}
                                            name="file"
                                            style={{
                                                height: "0px",
                                                display: "none"
                                            }}
                                            onChange={e =>
                                                handleProject(e, index)
                                            }
                                            // value={task.file.name}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="mb-3">
                            <Card>
                                <Card.Body>
                                    <div className="form-group">
                                        <label
                                            className="font-14 bold text-primary"
                                            htmlFor="name"
                                        >
                                            Seleccionar Horas
                                        </label>
                                        <select
                                            className="form-control form-control-custom form-control-custom-45"
                                            // id="name"
                                            name="hours"
                                            onChange={e =>
                                                handleProject(e, index)
                                            }
                                            value={task.hours}
                                        >
                                            {Array.from(
                                                Array(hoursSelected),
                                                (e, i) => {
                                                    return (
                                                        <option key={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    );
                                                }
                                            )}
                                            {/*{*/}
                                            {/*    tasks.map((i, e) =>{*/}
                                            {/*        return <option key={i + 1}>{i + 1}</option>*/}
                                            {/*    })*/}
                                            {/*}*/}
                                        </select>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
