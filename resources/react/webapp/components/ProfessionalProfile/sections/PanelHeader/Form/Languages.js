import React from 'react';
import ReactDOM from 'react-dom';
import NoRegisterExits from "../../../../NoRegisterExists";

const Languages = ({model, setModel, languages}) => {

    const defaultLanguage = {
        id: '',
        level: ''
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
    return (
        <div className="row pb-4">
            <div className="col-12">
                <div className="row mb-3">
                    <div className="col">
                        <h3 className="font-signika font-24 bold text-primary">
                            Idiomas
                        </h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" onClick={() => addLanguages()}
                                className="btn btn-form btn-primary btn-rounded btn-block">
                            <span>Agregar Lenguaje</span>
                        </button>
                    </div>
                </div>

            </div>

            <div className="col-md-12">

                {
                    model.languages.length > 0 ?  model.languages.map((language, index) => {
                        return <div className="row" key={index}>
                            <div className="col">
                                <div className="form-group form-group-w2">
                                    <select
                                        name="id"
                                        id={`languages.${index}`}
                                        // className="form-control form-control-w2"
                                        className={`form-control form-control-w2 ${
                                            model.languages[index].id
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
                                        id={`level.${index}`}
                                        value={model.languages[index].level}
                                        onChange={(e) => handleLanguages(e, index)}
                                        // className={`form-control form-control-w2`}
                                        className={`form-control form-control-w2 ${
                                            model.languages[index].level
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
                                    onClick={() => destroyLanguage(index)}
                                >
                                    <i className="fa fa-trash"/>
                                </button>
                            </div>
                        </div>
                    }) : <NoRegisterExits />
                }

            </div>
        </div>
    );
};

export default Languages;
