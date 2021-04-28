import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import * as Services from "../../../../../Services";
import toastr from 'toastr';
import PersonalInfo from "./PersonalInfo";
import Areas from "./Areas";
import Languages from "./Languages";
import Skills from "./Skills";
import AcademyExperiences from "./AcademyExperiences";
import WorkExperiences from "./WorkExperiences";

const Form = ({professional, setProfessional,setEditMode}) => {

    const defaultModel = {
        professional_id: professional.id,
        first_name: professional.first_name,
        price_hour: professional.price_hour,
        country: professional.country,
        areas: [],
        skills: [],
        languages: [],
        academy_experiences: [],
        work_experiences: []
    };
    const [model, setModel] = useState(defaultModel);
    const [areas, setAreas] = useState([]);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (professional) {
            //langs
            let tempLanguages = []
            professional.languages.map(language => {
                tempLanguages.push({
                    id: (language.id).toString(),
                    level: language.pivot.level
                })
            })

            ///skills
            let tempSkills = []
            professional.skills.map(skill => {
                tempSkills.push({
                    id: skill.id,
                    level: skill.pivot.level
                })
            })

            //areas
            let tempAreas = []
            professional.areas.map(area => {
                tempAreas.push({
                    id: area.id
                })
            })

            //academy
            let tempAcademy = []
            professional.academy_experiences.map(academy_experience => {
                tempAcademy.push({
                    start_at: academy_experience.start_at,
                    finish_at: academy_experience.finish_at,
                    job_title: academy_experience.job_title,
                    university: academy_experience.university,
                    description: academy_experience.description
                })
            })

            //works
            let tempWorks = []
            professional.work_experiences.map(work_experience => {
                tempWorks.push({
                    start_at: work_experience.start_at,
                    finish_at: work_experience.finish_at,
                    job_title: work_experience.job_title,
                    company_name: work_experience.company_name,
                    description: work_experience.description
                })
            })

            setModel({
                ...model,
                languages: tempLanguages,
                skills: tempSkills,
                areas: tempAreas,
                academy_experiences: tempAcademy,
                work_experiences: tempWorks
            })

        }
    }, [professional])

    useEffect(() => {
        getResources();
    }, [])

    const getResources = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.GET_RESOURCES;
        let data = {}
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setAreas(response.data.areas)
                        setLanguages(response.data.languages)
                        setSkills(response.data.skills)
                        setCountries(response.data.countries);
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const store = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.PROFILE.UPDATE_PROFILE;
        Services.DoPost(url, model)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success('Perfil actualizado correctamente.')
                        setProfessional(response.data.professional);
                        setEditMode(false)
                    },
                    error: () => {
                        toastr.error('No se ha podido actualizar el perfil.')
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const controlNext = () => {
        if (model.first_name && model.price_hour > 0 && model.areas.length > 0 && model.skills.length > 0 && model.languages.length > 0) {
            return <button type="button" onClick={store} className="btn btn-form btn-primary btn-rounded px-4">
                <span>Guardar</span>
            </button> ;
        }
        return <button type="button" className="btn btn-form btn-primary btn-rounded disabled px-4">
            <span>Guardar</span>
        </button>
    }

    return (
        <div className="row">
            <div className="col-12">

                <PersonalInfo model={model} setModel={setModel} countries={countries}/>

                <Areas model={model} setModel={setModel} areas={areas}/>

                <Skills model={model} setModel={setModel} skills={skills}/>

                <Languages model={model} setModel={setModel} languages={languages}/>

                <AcademyExperiences model={model} setModel={setModel} />

                <WorkExperiences model={model} setModel={setModel} />

                <div className="row justify-content-end">
                    <div className="col-auto pr-2">
                        <button type="button" onClick={() => setEditMode(false)} className="btn btn-form btn-outline-primary btn-rounded px-4">
                            <span>Cancelar</span>
                        </button>
                    </div>
                    <div className="col-auto pl-2">
                        {
                            controlNext()
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
