import React from 'react';
import {Card} from "react-bootstrap";
import {setCleanInputError} from "../../../helpers/GlobalUtils";

const ProjectFields = ({project, setProject}) => {

    const onChangeProject = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Card>
            <Card.Body>
                <div className="row">
                    <div className="col-12">
                        <h2 className="font-signika font-20 bold text-secondary mb-4">
                            Datos del objetivo
                        </h2>
                    </div>
                    <div className="col-12">
                        <div className="form-group form-group-w2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={project.name}
                                onChange={onChangeProject}
                                onFocus={setCleanInputError}
                                className={`form-control form-control-w2 ${project.name.length ? 'has-value' : ''}`}
                            />
                            <label htmlFor="name">Nombre del objetivo</label>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group form-group-w2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={project.description}
                                        onChange={onChangeProject}
                                        onFocus={setCleanInputError}
                                        style={{resize: 'none', height: '171px'}}
                                        className={`form-control form-control-w2 ${project.description.length ? 'has-value' : ''}`}
                                    />
                            <label htmlFor="description">Descripción del objetivo</label>
                            <div className="invalid-feedback"/>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProjectFields;
