import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {formatTaskStatus} from "../../../../helpers/HelperStatus";
import ModalChangeStatus from "./ModalChangeStatus";

const Header = ({index, taskId, taskStatus, projectStatus, getProject = null, allowEdit = false}) => {

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <Card.Header className="card-header-custom">
            <div className="row">
                <div className="col">
                    <h2 className="font-signika font-20 bold text-secondary mb-0">
                        Datos de la tarea Nº {index + 1}
                    </h2>
                </div>
                {
                    projectStatus !== 'CREATED' &&
                    projectStatus !== '' ?
                        <div className="col-auto">

                            {
                                allowEdit && projectStatus != 'APPROVED'?
                                    <div className="pointer" onClick={handleShowModal}>
                                        {
                                            formatTaskStatus(taskStatus, <i className="fa fa-edit"/>)
                                        }
                                    </div> :
                                    <div>
                                        {
                                            formatTaskStatus(taskStatus)
                                        }
                                    </div>
                            }
                        </div>
                        :
                        null
                }
            </div>
            {
                projectStatus !== 'CREATED' &&
                projectStatus !== '' &&
                allowEdit ?
                    <ModalChangeStatus
                        show={showModal}
                        taskId={taskId}
                        getProject={getProject}
                        projectStatus={projectStatus}
                        handleClose={handleCloseModal}/>
                    : null
            }
        </Card.Header>
    );
};

export default Header;
