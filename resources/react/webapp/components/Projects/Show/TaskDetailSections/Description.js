import React from 'react';
import ReactDOM from 'react-dom';

const Description = ({task}) => {
    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col-12 mb-3">
                        <h3 className="font-signika font-16 bold text-primary mb-1">
                            Nombre de la tarea
                        </h3>
                        <div className="font-14 light color-3C3C3E">
                            {task.name}
                        </div>
                    </div>
                    {
                        task.description ?
                            <div className="col-12 mb-3">
                                <h3 className="font-signika font-16 bold text-primary mb-1">
                                    Descripción del objetivo
                                </h3>

                                <div className="font-14 light color-3C3C3E">
                                    <div dangerouslySetInnerHTML={{__html: task.description}}
                                         style={{
                                             whiteSpace: 'pre-line'
                                         }}/>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>

            {
                'project_task_files' in task ? task.project_task_files.map((file, index) => {
                    return(
                        <div className="row font-14 light color-3C3C3E" key={index}>
                            <div className="col-12">
                                <a href={file.file_public} target="_blank" className="pr-2">{file.name}</a>
                                <i className="fa fa-download text-secondary"/>
                            </div>
                        </div>
                    )
                }) : null
            }
        </div>
    );
};

export default Description;

