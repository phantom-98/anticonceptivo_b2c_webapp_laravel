import React from 'react';
import ReactDOM from 'react-dom';

const PersonalInfo = ({model, setModel, countries}) => {
    return (
        <div className="row pb-4">
            <div className="col-12">
                <h3 className="font-signika font-24 bold text-primary">
                    Información personal
                </h3>
            </div>

            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group form-group-w2 mb-1">
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={model.first_name}
                                onChange={(e) => {
                                    setModel({
                                        ...model,
                                        first_name : e.target.value
                                    })
                                }}
                                className={`form-control form-control-w2 ${
                                    model.first_name &&
                                    model.first_name.length
                                        ? "has-value"
                                        : ""
                                }`}
                            />
                            <label htmlFor="first_name">Nombre completo</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group form-group-w2 mb-1">
                            <input
                                type="number"
                                name="price_hour"
                                id="price_hour"
                                value={model.price_hour}
                                onChange={(e) => {
                                    setModel({
                                        ...model,
                                        price_hour : e.target.value
                                    })
                                }}
                                className={`form-control form-control-w2 ${
                                    model.price_hour
                                        ? "has-value"
                                        : ""
                                }`}
                            />
                            <label htmlFor="price_hour">Valor Hora *</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group form-group-w2 mb-1">
                            <select
                                name="country"
                                id="country"
                                value={model.country}
                                onChange={(e) => {setModel({...model,country : e.target.value})}}
                                className={`
                                form-control form-control-w2 
                                ${model.country && model.country.length? "has-value" : ""}`}
                            >
                                <option disabled={true} selected={true}></option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="country">País</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PersonalInfo;
