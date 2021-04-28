import React, {useState, useEffect} from 'react';
import DivCheckBox from "../../../../components/DivCheckBox";
import * as Services from "../../../../Services";

const PersonalInfo = ({company, setCompany, setShowingSection}) => {

    const types = [
        {
            id: 1,
            subtitle: 'Remota'
        },
        {
            id: 2,
            subtitle: 'Presencial'
        },
    ];

    const [model, setModel] = useState({
        agent_name: company.agent_name,
        agent_position: company.agent_position,
        agent_phone: company.agent_phone,
        agent_email: company.agent_email,
        type: company.work_mode ? company.work_mode == 'REMOTE' ? 1 : 2 : 0,
    });

    // useEffect(() => {
    //     if (company) {
    //     }
    // }, [company]);



    const handleForm = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const handleDivCheckBox = (typeId) => {
        setModel({
            ...model,
            type: typeId
        })
    }
    const store = () => {
        let url = Services.ENDPOINT.PANEL.COMPANY.COMPLETE_PROFILE.PERSONAL_INFO;
        let data = {
            company_id: company.id,
            agent_name: model.agent_name,
            agent_position: model.agent_position,
            agent_phone: model.agent_phone,
            agent_email: model.agent_email,
            type : model.type
        }
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setCompany(response.data.company)
                    setShowingSection('billingInfo');
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    const controlNext = () => {
        if (
            model.agent_name &&
            model.agent_position &&
            model.agent_phone &&
            model.agent_email
        ) {
            return <button type="button" onClick={store} className="btn btn-form btn-primary btn-rounded px-4">
                <span>Siguiente</span>
            </button>;
        }
        return <button type="button" className="btn btn-form btn-primary btn-rounded disabled px-4">
            <span>Siguiente</span>
        </button>
    }

    return (
        <form noValidate className="form needs-validation av-invalid" onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <div className="row">
                <div className="col-md-8 offset-md-2">

                    <div className="row">
                        <div className="col-12 py-3">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="agent_name"
                                            id="agent_name"
                                            value={model.agent_name}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.agent_name &&
                                                model.agent_name.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="agent_name">Nombre Representante</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="agent_position"
                                            id="agent_position"
                                            value={model.agent_position}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.agent_position &&
                                                model.agent_position.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="agent_position">Cargo del representante</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="agent_phone"
                                            id="agent_phone"
                                            value={model.agent_phone}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.agent_phone &&
                                                model.agent_phone.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="agent_phone">Teléfono</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group form-group-w2 mb-1">
                                        <input
                                            type="text"
                                            name="agent_email"
                                            id="agent_email"
                                            value={model.agent_email}
                                            onChange={handleForm}
                                            className={`form-control form-control-w2 ${
                                                model.agent_email &&
                                                model.agent_email.length
                                                    ? "has-value"
                                                    : ""
                                            }`}
                                        />
                                        <label htmlFor="agent_email">Email</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <div>
                                        <div className="font-epilogue font-14 light color-121212 mb-2 pt-3">
                                            Modalidad de trabajo de la empresa
                                        </div>
                                    </div>
                                </div>
                                {
                                    types.map((type, index) => {
                                        return <div className="col-md-6 mb-3" key={index}
                                                    onClick={() => handleDivCheckBox(type.id)}>
                                            <DivCheckBox subtitle={type.subtitle} title={type.name}
                                                         active={model.type == type.id ? true : false}
                                            />
                                        </div>;
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>


                <div className="col-12">
                    <div className="row">
                        <div className="col-12 text-center">
                            {
                                controlNext()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PersonalInfo;
