import React, {Fragment} from 'react';
import NoRegisterExits from "../../../../NoRegisterExists";

const AcademyExperiences = ({model, setModel}) => {

    const defaultAcademyExperience = {
        start_at: '',
        finish_at: '',
        job_title: '',
        university: '',
        description: ''
    }

    const handleAcademyExperiences = (e, index) => {

        const arrayAcademyExperience = [...model.academy_experiences];
        arrayAcademyExperience[index] = {
            ...arrayAcademyExperience[index],
            [e.target.name]: e.target.value
        };
        
        setModel({
            ...model,
            academy_experiences: arrayAcademyExperience
        });
    }

    const addAcademyExperience = () => {
        setModel({
            ...model,
            academy_experiences: [...model.academy_experiences, defaultAcademyExperience]
        })
    }

    const destroyAcademyExperience = (index) => {
        const arrayAcademyExperience = model.academy_experiences;
        arrayAcademyExperience.splice(index, 1);
        setModel({
            ...model,
            academy_experiences: arrayAcademyExperience
        })
    }

    return (
        <div className="row pb-4">
            <div className="col-12">
                <div className="row mb-3">
                    <div className="col">
                        <h3 className="font-signika font-24 bold text-primary">
                            Experiencias Académicas
                        </h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" onClick={() => addAcademyExperience()} 
                                className="btn btn-form btn-primary btn-rounded btn-block w-auto"
                                disabled={ model.academy_experiences.length > 0 ?
                                    model.academy_experiences[model.academy_experiences.length-1].start_at != '' && 
                                    model.academy_experiences[model.academy_experiences.length-1].university != '' &&  
                                    model.academy_experiences[model.academy_experiences.length-1].job_title != '' &&  
                                    model.academy_experiences[model.academy_experiences.length-1].description != ''  ? false : true
                                    : false
                                }
                        >
                            <span>Agregar Experencia Académica</span>
                        </button>
                        
                    </div>
                </div>

            </div>

            <div className="col-md-12">

                {
                    model.academy_experiences.length > 0 ?  model.academy_experiences.map((academy_experiences, index) => {
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
                                                value={model.academy_experiences[index].start_at}
                                                onChange={(e) => handleAcademyExperiences(e, index)}
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
                                                value={model.academy_experiences[index].finish_at}
                                                onChange={(e) => handleAcademyExperiences(e, index)}
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
                                                name='university'
                                                id={`university_${index}`}
                                                value={model.academy_experiences[index].university}
                                                onChange={(e) => handleAcademyExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className={`form-control form-control-w2 ${
                                                    model.academy_experiences[index].university
                                                        ? "has-value"
                                                        : ""
                                                }`}
                                            />
                                            <label htmlFor={`university_${index}`}>Universidad</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group form-group-w2">
                                            <input
                                                type="text"
                                                name='job_title'
                                                id={`job_title_${index}`}
                                                value={model.academy_experiences[index].job_title}
                                                onChange={(e) => handleAcademyExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className={`form-control form-control-w2 ${
                                                    model.academy_experiences[index].job_title
                                                        ? "has-value"
                                                        : ""
                                                }`}
                                            />
                                            <label htmlFor={`job_title_${index}`}>Título Profesional</label>
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
                                                value={model.academy_experiences[index].description}
                                                onChange={(e) => handleAcademyExperiences(e, index)}
                                                // className={`form-control form-control-w2`}
                                                className={`form-control form-control-w2 ${
                                                    model.academy_experiences[index].description
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
                                    onClick={() => destroyAcademyExperience(index)}
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

export default AcademyExperiences;
