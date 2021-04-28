import React, {useEffect, useState} from 'react';
import toastr from "toastr";
import {Card} from "react-bootstrap";
import * as Services from "../../../Services";

const ProfessionalType = ({urlPost, professionalId, is_agency, is_freelance, editable = true}) => {

    const [type, setType] = useState('')
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (is_agency) {
            setType('agency')
        } else if (is_freelance) {
            setType('freelance')
        }
    }, [is_agency, is_freelance]);

    const store = () => {
        setEdit(false)
        Services.DoPost(urlPost, {
            professional_id: professionalId,
            type: type
        }).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message);
                    setEdit(false)
                },
                error: () => {
                    toastr.error(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const handleEdit = (type) => {
        if (edit) {
            setType(type)
        }
    }

    return (
        <div className="mb-3">
            <Card>
                <Card.Body>
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="font-24 bold text-primary">Tipo de profesional</h2>
                                </div>
                                <div className="col-12">
                                    <div className="row">

                                        <div className="col pr-2" onClick={() => handleEdit('freelance')}>
                                            <div
                                                className={`profesional-type ${edit ? 'pointer' : ''} ${type === 'freelance' ? 'active' : ''}`}>
                                                <div className="row">
                                                    <div className="col-auto pr-0">
                                                        <div className="font-14 bold color-3C3C3E">Profesional</div>
                                                        <div className="font-9 color-3C3C3E">Trabajo por mi
                                                            cuenta
                                                        </div>
                                                    </div>
                                                    <div className="col-auto ml-auto d-flex">
                                                        {
                                                            type === 'freelance' ?
                                                                <img className="my-auto"
                                                                     src="/themes/web/assets/images/icons/checked-circule.svg"
                                                                     rel="nofollow"/> : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col pl-2" onClick={() => handleEdit('agency')}>
                                            <div
                                                className={`profesional-type ${edit ? 'pointer' : ''} ${type === 'agency' ? 'active' : ''}`}>
                                                <div className="row">
                                                    <div className="col-auto pr-0">
                                                        <div className="font-14 bold color-3C3C3E">Agencia</div>
                                                        <div className="font-9 color-3C3C3E">Trabajo en equipo y
                                                            represento una
                                                            empresa
                                                        </div>
                                                    </div>
                                                    <div className="col-auto ml-auto d-flex">
                                                        {
                                                            type === 'agency' ?
                                                                <img className="my-auto"
                                                                     src="/themes/web/assets/images/icons/checked-circule.svg"
                                                                     rel="nofollow"/> : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 font-12 light color-3C3C3E">
                                    {
                                        !edit ?
                                            null :
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="text-right mt-4">
                                                        <button
                                                            className="btn btn-outline-dark btn-rounded btn-form"
                                                            onClick={() => setEdit(false)}>
                                                            <span className="font-12 regular">CANCELAR</span>
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-rounded btn-form ml-3"
                                                            onClick={store}>
                                                            <span className="font-12 regular">GUARDAR</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                    }
                                </div>
                            </div>

                        </div>
                        {
                            editable && !edit ?
                                <div className="col-auto pl-0">
                                    <div className="my-auto pointer" onClick={() => setEdit(true)}>
                                        <div className="text-center">
                                            <img src="/themes/web/assets/images/icons/edit-secondary.svg"
                                                 rel="nofollow"/>
                                        </div>
                                        <div className="font-12 light color-939292 text-center">
                                            Editar
                                        </div>
                                    </div>
                                </div> :
                                null
                        }
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfessionalType;
