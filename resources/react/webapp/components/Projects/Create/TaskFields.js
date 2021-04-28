import React from 'react';
import {Card, Accordion, Button} from "react-bootstrap";
import {setCleanInputError} from "../../../helpers/GlobalUtils";

const TaskFields = ({task, onChangeTask, removeTask, removeTaskFile, index, onBlurTask}) => {

    return (
        <div className="col-12 mb-3 pl-0">
            <Accordion defaultActiveKey={`${index}`}>
                <Card>
                    <Card.Header className="card-header-custom ">

                        <div className="row">

                            <div className="col-auto">
                                <Accordion.Toggle as={props => <div {...props} />} eventKey={`${index}`}>
                                    <h2 className="pointer font-signika font-20 bold text-secondary mb-1">
                                        Tarea Nº {index + 1} <span
                                        className="regular">{task.name.length > 0 ? '-' : ''} {task.name}</span>
                                    </h2>
                                </Accordion.Toggle>
                            </div>
                            <div className="col-auto ml-auto">
                                <div className="pointer"
                                     onClick={() => removeTask(index)}
                                     title={`Eliminar tarea ${index + 1}`}>
                                    <i className="fa fa-trash text-danger"/>
                                </div>
                            </div>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>

                            <div className="row">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group form-group-w2">
                                                <input
                                                    type="text"
                                                    id={`task_name_${index}`}
                                                    name="name"
                                                    value={task.name}
                                                    onFocus={setCleanInputError}
                                                    onChange={(e) => onChangeTask(e, index)}
                                                    className={`form-control form-control-w2 ${task.name.length ? 'has-value' : ''}`}
                                                />
                                                <label htmlFor={`task_name_${index}`}>Nombre de la tarea *</label>
                                                <div className="invalid-feedback"/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group form-group-w2">
                                                <textarea
                                                    id={`task_description_${index}`}
                                                    name="description"
                                                    value={task.description}
                                                    onFocus={setCleanInputError}
                                                    onChange={(e) => onChangeTask(e, index)}
                                                    style={{resize: 'none', height: '171px'}}
                                                    className={`form-control form-control-w2 ${task.description.length ? 'has-value' : ''}`}
                                                />
                                                <label htmlFor={`task_description_${index}`}>
                                                    Descripción de la tarea
                                                </label>
                                                <div className="invalid-feedback"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 pl-0">
                                    <div className="col-12 px-0">
                                        <div className="form-group form-group-w2">
                                            <input
                                                type="number"
                                                step="1"
                                                id={`task_hours_${index}`}
                                                name="hours"
                                                value={task.hours}
                                                onFocus={setCleanInputError}
                                                onChange={(e) => onChangeTask(e, index)}
                                                onBlur={(e) => onBlurTask ? onBlurTask : null}
                                                className={`form-control form-control-w2 ${task.hours.length ? 'has-value' : ''}`}
                                            />
                                            <label htmlFor={`task_hours_${index}`}>Horas *</label>
                                            <div className="invalid-feedback"/>
                                        </div>
                                    </div>
                                    <div className="col-12 px-0">
                                        <div className="form-group">
                                            {
                                                task.files.length > 0 ? 
                                                task.files.map((file, fileIndex) => {
                                                    return (
                                                        <div className="row" key={fileIndex}>
                                                            <div className="col-10 font-12">{file.name}</div>
                                                            <div className="col-2 text-danger">
                                                                <i className="pointer fa fa-trash" onClick={() => removeTaskFile(index, fileIndex)}/>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                : null
                                            }
                                            <label className="btn btn-medium w-100" htmlFor={`file_${index}`} style={{borderRadius:'12px',backgroundColor:'rgb(242, 247, 253)'}}>
                                                <span className="task-file-upload-label pt-1 pl-2">Adjuntar documentos</span>
                                                <img className="img-file-upload pr-2" 
                                                src="/themes/web/assets/images/icons/add-task.svg" rel="nofollow"/>
                                            </label>

                                            <div className="custom-file" style={{height: '0px'}}>
                                                <input type="file"
                                                    className="custom-file-input"
                                                    style={{height: '0px'}}
                                                    id={`file_${index}`}
                                                    name="files"
                                                    onChange={(e) => onChangeTask(e, index)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default TaskFields;
