import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {formatMoney} from "../../../helpers/GlobalUtils";
import {formatProjectStatus, formatTaskStatus} from "../../../helpers/HelperStatus";
import Header from "./TaskDetailSections/Header";
import Description from "./TaskDetailSections/Description";
import Cost from "./TaskDetailSections/Cost";

const TaskDetail = ({task, index, projectStatus, getProject = null}) => {

    const taskId = task.task_id ? task.task_id : -1;
    const totalHours = task.total_minutes ? (task.total_minutes / 60) : 0;
    const priceHour = task.total_price ? (task.total_price) : 0;
    const total = totalHours * priceHour;
    const deadline = task.deadline ? task.deadline : '';

    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <Card>
                    <Header index={index}
                            taskId={task.id}
                            taskStatus={task.status}
                            projectStatus={projectStatus}
                            getProject={getProject}
                            allowEdit={true}
                    />

                    <Card.Body>

                        <Description task={task} />

                        <Cost
                            totalHours={totalHours}
                            priceHour={priceHour}
                            total={total}
                            deadline={deadline}
                        />


                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default TaskDetail;
