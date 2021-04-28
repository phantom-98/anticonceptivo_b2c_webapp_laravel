import React, {useEffect, useState} from 'react';

import ProjectDetail from "./ProjectDetail";
import TaskDetailEditable from "./TaskDetailEditable";
import TaskDetail from "./TaskDetail";


const ShowDetailEditable = ({project, quotation}) => {

    const [flag, setFlag] = useState(true);

    useEffect(() => {
        if (quotation.slots.length > 0) {
            setFlag(false)
        }
    },[quotation])

    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <ProjectDetail
                            id={project.id}
                            name={project.name}
                            description={project.description}
                            projectStatus={''}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {
                            project.project_tasks.map((task, index) => {
                                const taskPrice = quotation.tasks_prices.find(tp => tp.task_id == task.id)
                                return <TaskDetailEditable
                                    key={index}
                                    index={index}
                                    task={task}
                                    flag={flag}
                                    taskPrice={taskPrice}
                                    quotationId={quotation.id}
                                    quotationStatus={quotation.status}
                                    projectStatus={''}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetailEditable;

