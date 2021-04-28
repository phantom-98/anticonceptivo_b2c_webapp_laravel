import React, {useState, useEffect} from 'react';
import * as Services from "../../../../Services";

const ExtraInfo = ({professional, setProfessional, setShowingSection}) => {

    const defaultLanguage = {
        id: '',
        level: ''
    }

    const defaultSkill = {
        id: '',
        level: ''
    }

    const [model, setModel] = useState({
        professional_id: professional.id,
        about_me: professional.about_me,
        languages: [defaultLanguage],
        skills: [defaultSkill]
    });

    const [languages, setLanguages] = useState(null);
    const [skills, setSkills] = useState(null);

    useEffect(() => {
        getResources();
    }, []);

    const getResources = () => {
        let url = Services.ENDPOINT.PANEL.COMMON.COMPLETE_PROFILE.RESOURCES.EXTRA_INFO;
        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setLanguages(response.data.languages)
                    setSkills(response.data.skills)
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const store = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.COMPLETE_PROFILE.EXTRA_INFO;

        Services.DoPost(url, model).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessional(response.data.professional);
                    setShowingSection('completed');
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const handleForm = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const handleLanguages = (e, index) => {

        const arrayLanguages = [...model.languages];
        arrayLanguages[index] = {
            ...arrayLanguages[index],
            [e.target.name]: e.target.value
        };
        setModel({
            ...model,
            languages: arrayLanguages
        });
    }

    const addLanguages = () => {
        setModel({
            ...model,
            languages: [...model.languages, defaultLanguage]
        })
    }

    const destroyLanguage = (index) => {
        const arrayLanguages = model.languages;
        arrayLanguages.splice(index, 1);
        setModel({
            ...model,
            languages: arrayLanguages
        })
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
            skills: [...model.skills, defaultLanguage]
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

    const back = () => {
        setShowingSection('basicInfo')
    }

    const controlNext = () => {

        if (model.about_me && model.languages[model.languages.length-1].id != ''  && model.languages[model.languages.length-1].level != '' 
        && model.skills[model.skills.length-1].id != ''  && model.skills[model.skills.length-1].level != '') {
            return <button type="button" onClick={store} className="btn btn-form btn-primary btn-rounded px-4">
                <span>Siguiente</span>
            </button>;
        }
        return <button type="button" className="btn btn-form btn-primary btn-rounded disabled px-4">
            <span>Siguiente</span>
        </button>
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <h4 className="font-signika font-25 bold text-primary mb-4">
                    {professional.full_name}, Completa tu perfil para comenzar a enviar propuestas
                </h4>
            </div>
            <div className="col-12 py-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group form-group-w2">
                            <textarea
                                rows="4"
                                name="about_me"
                                id="about_me"
                                className="form-control form-control-w2 has-value"
                                value={model.about_me}
                                onChange={handleForm}
                            />
                            <label htmlFor="about_me">Sobre mí</label>
                        </div>
                    </div>
                    <div className="col-md-12 pb-3">
                        <div className="row mb-3">
                            <div className="col">
                                <h3 className="font-signika font-24 bold text-primary">
                                    Habilidades
                                </h3>
                            </div>
                            <div className="col-auto">
                                <button type="button" onClick={() => addSkills()}
                                        className="btn btn-form btn-primary btn-rounded btn-block"
                                        disabled={model.skills[model.skills.length-1].id != '' && 
                                        model.skills[model.skills.length-1].level != '' ? false : true}
                                >
                                    <span>Agregar Habilidades</span>
                                </button>
                            </div>
                        </div>

                        {model.skills.map((skill, index) => {
                            return <div className="row" key={index}>
                                <div className="col">
                                    <div className="form-group form-group-w2">
                                        <select
                                            name="id"
                                            id={`skills.${index}`}
                                            // className="form-control form-control-w2"
                                            className={`form-control form-control-w2 ${
                                                model.skills[index].id &&
                                                model.skills[index].id.length
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
                                        <label id={`skills.${index}`}>Elige idioma</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group form-group-w2">
                                        <select
                                            name='level'
                                            id={`level.${index}.skill`}
                                            value={model.skills[index].level}
                                            onChange={(e) => handleSkills(e, index)}
                                            // className={`form-control form-control-w2`}
                                            className={`form-control form-control-w2 ${
                                                model.skills[index].level &&
                                                model.skills[index].level.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        >
                                            <option disabled={true} defaultValue={true}></option>
                                            <option value={1}>Bajo</option>
                                            <option value={2}>Medio</option>
                                            <option value={3}>Alto</option>
                                        </select>
                                        <label htmlFor={`level.${index}.skill`}>Nivel de conocimiento</label>
                                    </div>
                                </div>
                                <div className="col-auto d-flex">
                                    <button
                                        className="btn btn-link text-danger my-auto"
                                        style={{borderRadius: 0, width: '33px', height: '33px'}}
                                        onClick={() => destroySkill(index)}
                                        disabled={index == 1 ? false : true}
                                    >
                                        <i className="fa fa-trash"/>
                                    </button>
                                </div>
                            </div>
                        })}

                    </div>
                    
                    <div className="col-md-12 pb-3">
                        <div className="row mb-3">
                            <div className="col">
                                <h3 className="font-signika font-24 bold text-primary">
                                    Idiomas
                                </h3>
                            </div>
                            <div className="col-auto">
                                <button type="button" onClick={() => addLanguages()}
                                        className="btn btn-form btn-primary btn-rounded btn-block"
                                        disabled={model.languages[model.languages.length-1].id != '' && 
                                        model.languages[model.languages.length-1].level != '' ? false : true}
                                >
                                    <span>Agregar Lenguaje</span>
                                </button>
                            </div>
                        </div>

                        {model.languages.map((language, index) => {
                            return <div className="row" key={index}>
                                <div className="col">
                                    <div className="form-group form-group-w2">
                                        <select
                                            name="id"
                                            id={`languages.${index}`}
                                            // className="form-control form-control-w2"
                                            className={`form-control form-control-w2 ${
                                                model.languages[index].id &&
                                                model.languages[index].id.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                            value={model.languages[index].id}
                                            onChange={(e) => handleLanguages(e, index)}
                                        >
                                            <option disabled={true} defaultValue={true}></option>
                                            {
                                                languages ? languages.map(language => {
                                                        return (
                                                            <option key={language.id} value={language.id}>
                                                                {
                                                                    language.name
                                                                }
                                                            </option>
                                                        );
                                                    })
                                                    : null
                                            }
                                        </select>
                                        <label id={`languages.${index}`}>Elige idioma</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group form-group-w2">
                                        <select
                                            name='level'
                                            id={`level.${index}.language`}
                                            value={model.languages[index].level}
                                            onChange={(e) => handleLanguages(e, index)}
                                            // className={`form-control form-control-w2`}
                                            className={`form-control form-control-w2 ${
                                                model.languages[index].level &&
                                                model.languages[index].level.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        >
                                            <option disabled={true} defaultValue={true}></option>
                                            <option value={1}>Bajo</option>
                                            <option value={2}>Medio</option>
                                            <option value={3}>Alto</option>
                                        </select>
                                        <label htmlFor={`level.${index}.language`}>Nivel de conocimiento</label>
                                    </div>
                                </div>
                                <div className="col-auto d-flex">
                                    <button
                                        className="btn btn-link text-danger my-auto"
                                        style={{borderRadius: 0, width: '33px', height: '33px'}}
                                        onClick={() => destroyLanguage(index)}
                                        disabled={index == 1 ? false : true}
                                    >
                                        <i className="fa fa-trash"/>
                                    </button>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </div>


            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <button type="button" onClick={back}
                                className="btn btn-form btn-outline-primary btn-rounded px-4">
                            <span>Anterior</span>
                        </button>
                    </div>
                    <div className="col-6 text-right">
                        {
                            controlNext()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraInfo;
