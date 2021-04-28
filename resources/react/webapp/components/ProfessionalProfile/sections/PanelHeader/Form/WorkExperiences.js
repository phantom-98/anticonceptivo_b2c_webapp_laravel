import React, {Fragment} from 'react';
import NoRegisterExits from "../../../../NoRegisterExists";

const WorkExperiences = ({model, setModel}) => {

    const defaultWorkExperience = {
        start_at: '',
        finish_at: '',
        job_title: '',
        company_name: '',
        description: ''
    }

    const handleWorkExperiences = (e, index) => {

        const arrayWorkExperience = [...model.work_experiences];
        arrayWorkExperience[index] = {
            ...arrayWorkExperience[index],
            [e.target.name]: e.target.value
        };
        
        setModel({
            ...model,
            work_experiences: arrayWorkExperience
        });
    }

    const addWorkExperience = () => {
        setModel({
            ...model,
            work_experiences: [...model.work_experiences, defaultWorkExperience]
        })
    }

    const destroyWorkExperience = (index) => {
        const arrayWorkExperience = model.work_experiences;
        arrayWorkExperience.splice(index, 1);
        setModel({
            ...model,
            work_experiences: arrayWorkExperience
        })
    }
    return (
        <div className="row pb-4">
            <div className="col-12">
                <div className="row mb-3">
                    <div className="col">
                        <h3 className="font-signika font-24 bold text-primary">
                            Experiencias Laborales
                        </h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" onClick={() => addWorkExperience()}
                                className="btn btn-form btn-primary btn-rounded btn-block w-auto"
                                disabled={ model.work_experiences.length > 0 ?
                                    model.work_experiences[model.work_experiences.length-1].start_at != '' && 
                                    model.work_experiences[model.work_experiences.length-1].company_name != '' &&  
                                    model.work_experiences[model.work_experiences.length-1].job_title != '' &&  
                                    model.work_experiences[model.work_experiences.length-1].description != ''  ? false : true
                                    : false
                                }
                            >
                            <span>Agregar Experencia Laboral</span>
                        </button>
                    </div>
                </div>

            </div>

            <div className="col-md-12">

                {
                    model.work_experiences.length > 0 ?  model.work_experiences.map((work_experiences, index) => {
                        return <Fragment key={index}>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group form-group-w2">
                                            <input
                                                type="date"
                                                name='start_at'
                                                id={`start_at_${index}`}
                                                value={model.work_experiences[index].start_at}
                                                onChange={(e) => handleWorkExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className="form-control form-control-w2 has-value"
                                            />
                                            <label htmlFor={`start_at_${index}`}>Fecha Inicio</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-w2">
                                            <input
                                                type="date"
                                                name='finish_at'
                                                id={`finish_at_${index}`}
                                                value={model.work_experiences[index].finish_at}
                                                onChange={(e) => handleWorkExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className="form-control form-control-w2 has-value"
                                            />
                                            <label htmlFor={`finish_at_${index}`}>Fecha Termino</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-w2">
                                            <input
                                                type="text"
                                                name='company_name'
                                                id={`company_name_${index}`}
                                                value={model.work_experiences[index].company_name}
                                                onChange={(e) => handleWorkExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className={`form-control form-control-w2 ${
                                                    model.work_experiences[index].company_name
                                                        ? "has-value"
                                                        : ""
                                                }`}
                                            />
                                            <label htmlFor={`company_name_${index}`}>Compañia</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-w2">
                                            <input
                                                type="text"
                                                name='job_title'
                                                id={`job_title_${index}`}
                                                value={model.work_experiences[index].job_title}
                                                onChange={(e) => handleWorkExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className={`form-control form-control-w2 ${
                                                    model.work_experiences[index].job_title
                                                        ? "has-value"
                                                        : ""
                                                }`}
                                            />
                                            <label htmlFor={`job_title_${index}`}>Cargo</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group form-group-w2">
                                            <input
                                                type="text"
                                                name='description'
                                                id={`description_${index}`}
                                                value={model.work_experiences[index].description}
                                                onChange={(e) => handleWorkExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className={`form-control form-control-w2 ${
                                                    model.work_experiences[index].description
                                                        ? "has-value"
                                                        : ""
                                                }`}
                                            />
                                            <label htmlFor={`description_${index}`}>Descripción</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto d-flex">
                                <button
                                    className="btn btn-link text-danger my-auto"
                                    style={{borderRadius: 0, width: '33px', height: '33px'}}
                                    onClick={() => destroyWorkExperience(index)}
                                >
                                    <i className="fa fa-trash"/>
                                </button>
                            </div>
                        </div>
                        </Fragment>
                    }) : <NoRegisterExits />
                }

            </div>
        </div>
    );
};

export default WorkExperiences;
