import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import LevelSkill from "../../LevelSkill";
import Experiences from "../../Experiences";

const ExtraInfo = ({skills, languages, totalProjects = 0, experienceYears = 0, workExperiences, academyExperiences, professional}) => {

    return (
        <div className="mb-3">
            <Card>
                <Card.Body>
                    {
                        skills.length > 0 ? <div className="row pb-2">
                            <div className="col-12">
                                <h2 className="font-24 bold text-primary">Habilidades</h2>
                                {
                                    skills.map((skill, index) => (
                                        <LevelSkill key={index}
                                                    name={skill.name}
                                                    level={skill.pivot.level}/>))
                                }
                            </div>
                        </div> : null
                    }
                    {/* <div className="row pb-2">
                        <div className="col-12">
                            <h2 className="font-24 bold text-primary">Experiencia</h2>
                        </div>
                        <div className="col-12">
                            <p className="font-12 light color-3C3C3E">{experienceYears} Años</p>
                        </div>
                    </div> */}
                    <div className="row pb-2">
                        <div className="col-12">
                            <h2 className="font-24 bold text-primary">Objetivos Finalizados</h2>
                            <p className="font-12 light color-3C3C3E">{totalProjects}</p>
                        </div>
                    </div>
                    {
                        languages.length > 0 ?
                            <div className="row pb-2">
                                <div className="col-12">
                                    <h2 className="font-24 bold text-primary">Idiomas</h2>
                                    {
                                        languages.map((language, index) => (
                                            <LevelSkill key={index}
                                                        name={language.name}
                                                        level={language.pivot.level}/>))
                                    }
                                </div>
                            </div> : null
                    }
                    {
                         academyExperiences && academyExperiences.length > 0 ?
                            <div className="row pb-2">
                                <div className="col-12">
                                    <h2 className="font-24 bold text-primary">Experiencias Académicas</h2>
                                    {
                                        academyExperiences.map((academyExperience, index) => (
                                            <Experiences
                                                key={index}
                                                name={academyExperience.university}
                                                jobTitle={academyExperience.job_title}
                                                startAt={academyExperience.start_at}
                                                finishAt={academyExperience.finish_at}
                                                description={academyExperience.description}
                                            />
                                        ))
                                    }
                                </div>
                            </div> : null
                    }
                    {
                         workExperiences && workExperiences.length > 0 ?
                            <div className="row pb-2">
                                <div className="col-12">
                                    <h2 className="font-24 bold text-primary">Experiencias Laborales</h2>
                                    {
                                        workExperiences.map((workExperience, index) => (
                                            <Experiences
                                                key={index}
                                                name={workExperience.company_name}
                                                jobTitle={workExperience.job_title}
                                                startAt={workExperience.start_at}
                                                finishAt={workExperience.finish_at}
                                                description={workExperience.description}
                                            />
                                        ))
                                    }
                                </div>
                            </div> : null
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default ExtraInfo;
