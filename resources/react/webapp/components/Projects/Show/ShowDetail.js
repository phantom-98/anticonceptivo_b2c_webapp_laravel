import React, {Fragment, useContext, useEffect, useState} from 'react';

import ProjectDetail from "./ProjectDetail";
import TaskDetail from "./TaskDetail";
import ProfessionalReview from "../../ProfessionalReview";
import {AuthContext} from "../../../context/AuthProvider";
import {AuthType} from "../../../Globals";

const ShowDetail = ({project, getProject}) => {

    const {authType} = useContext(AuthContext);

    const [showProfessionalReview, setShowProfessionalReview] = useState(false);
    const handleCloseProfessionalReview = () => setShowProfessionalReview(false);
    const handleShowProfessionalReview = () => setShowProfessionalReview(true);

    useEffect(() =>{

        if(project.status == 'APPROVED' && !project.rating_point){
            if(authType == AuthType.COMPANY){
                handleShowProfessionalReview()
            }
        }
    }, [project])

    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <ProjectDetail
                                id={project.id}
                                name={project.name}
                                description={project.description}
                                projectStatus={project.status}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            {
                                project.project_tasks.map((task, index) => {
                                    return <TaskDetail
                                        key={index}
                                        index={index}
                                        task={task}
                                        projectStatus={project.status}
                                        getProject={getProject}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <ProfessionalReview
                show={showProfessionalReview}
                handleClose={handleCloseProfessionalReview}
                project={project}
            />
        </Fragment>
    );
};

export default ShowDetail;

