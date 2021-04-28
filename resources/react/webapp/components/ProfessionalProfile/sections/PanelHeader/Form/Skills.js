import React from 'react';
import ReactDOM from 'react-dom';
import NoRegisterExits from "../../../../NoRegisterExists";

const Skills = ({model, setModel, skills}) => {

    const defaultSkill = {
        id: '',
        level: ''
    }

    const handleSkills = (e, index) => {

        const arraySkills = [...model.skills];
        arraySkills[index] = {
            ...arraySkills[index],
            [e.target.name]: e.target.value
        };
        setModel({
            ...model,
            skills: arraySkills
        });
    }

    const addSkills = () => {
        setModel({
            ...model,
            skills: [...model.skills, defaultSkill]
        })
    }

    const destroySkill = (index) => {
        const arraySkills = model.skills;
        arraySkills.splice(index, 1);
        setModel({
            ...model,
            skills: arraySkills
        })
    }
    return (
        <div className="row pb-4">
            <div className="col-12">
                <div className="row mb-3">
                    <div className="col">
                        <h3 className="font-signika font-24 bold text-primary">
                            Habilidades
                        </h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" onClick={() => addSkills()}
                                className="btn btn-form btn-primary btn-rounded btn-block">
                            <span>Agregar Habilidad</span>
                        </button>
                    </div>
                </div>

            </div>

            <div className="col-md-12">

                {
                    model.skills.length > 0 ? model.skills.map((skill, index) => {
                        return <div className="row" key={index}>
                            <div className="col">
                                <div className="form-group form-group-w2">
                                    <select
                                        name="id"
                                        id={`skills.${index}`}
                                        // className="form-control form-control-w2"
                                        className={`form-control form-control-w2 ${
                                            model.skills[index].id
                                                ? "has-value"
                                                : ""
                                        }`}
                                        value={model.skills[index].id}
                                        onChange={(e) => handleSkills(e, index)}
                                    >
                                        <option disabled={true} defaultValue={true}></option>
                                        {
                                            skills ? skills.map(skill => {
                                                    return (
                                                        <option key={skill.id} value={skill.id}>
                                                            {
                                                                skill.name
                                                            }
                                                        </option>
                                                    );
                                                })
                                                : null
                                        }
                                    </select>
                                    <label id={`skills.${index}`}>Elige habilidad</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group form-group-w2">
                                    <select
                                        name='level'
                                        id={`level.${index}`}
                                        value={model.skills[index].level}
                                        onChange={(e) => handleSkills(e, index)}
                                        // className={`form-control form-control-w2`}
                                        className={`form-control form-control-w2 ${
                                            model.skills[index].level
                                                ? "has-value"
                                                : ""
                                        }`}
                                    >
                                        <option disabled={true} defaultValue={true}></option>
                                        <option value={1}>Bajo</option>
                                        <option value={2}>Medio</option>
                                        <option value={3}>Alto</option>
                                    </select>
                                    <label htmlFor={`level.${index}`}>Nivel de conocimiento</label>
                                </div>
                            </div>
                            <div className="col-auto">
                                <button
                                    className="btn btn-link text-danger my-auto"
                                    style={{borderRadius: 0, width: '33px', height: '33px'}}
                                    onClick={() => destroySkill(index)}
                                >
                                    <i className="fa fa-trash"/>
                                </button>
                            </div>
                        </div>
                    }) : <NoRegisterExits/>
                }

            </div>
        </div>
    );
};

export default Skills;
