import React from 'react';
import {Accordion, Card} from "react-bootstrap";
import {formatProjectStatus, formatTaskStatus} from "../../../helpers/HelperStatus";

const ProjectDetail = ({name, description, projectStatus}) => {
    return (
        <Card>
            <Card.Header className="card-header-custom">
                <div className="row">
                    <div className="col">
                        <h2 className="font-signika font-20 bold text-secondary mb-0">
                            Datos del objetivo
                        </h2>
                    </div>
                    {
                        projectStatus !== 'CREATED' && projectStatus !== '' ?
                            <div className="col-auto">
                                {
                                    formatProjectStatus(projectStatus)
                                }
                            </div>
                            :
                            null
                    }
                </div>
            </Card.Header>
            <Card.Body>
                <div className="row">
                    <div className="col-12 mb-3">
                        <h3 className="font-signika font-16 bold text-primary mb-1">
                            Nombre del objetivo
                        </h3>
                        <div className="font-14 light color-3C3C3E">
                            {name}
                        </div>
                    </div>
                    {
                        description ?
                            <div className="col-12 mb-3">
                                <h3 className="font-signika font-16 bold text-primary mb-1">
                                    Descripción del objetivo
                                </h3>

                                <div className="font-14 light color-3C3C3E">
                                    <div dangerouslySetInnerHTML={{__html: description}} style={{
                                        whiteSpace: 'pre-line'
                                    }}/>
                                </div>
                            </div>
                            : null
                    }

                </div>
            </Card.Body>
        </Card>
    );
};

export default ProjectDetail;
