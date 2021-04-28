import React, {Fragment, useEffect, useState} from 'react';
import {Card, Modal} from "react-bootstrap";
import QuotationProfessional from "./QuotationProfessional";
import NoRegisterExits from "../../NoRegisterExists";
import {Link} from "react-router-dom";
import * as Services from "../../../Services";
import ProfessionalAddQuotationBlock from "./ProfessionalAddQuotationBlock";
import toastr from 'toastr';

const QuotationList = ({projectId, companyId, quotations, getProject}) => {

    const [showModalAssign, setShowModalAssign] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [assigns, setAssigns] = useState([]);
    const [professionalInQuotation, setProfessionalInQuotation] = useState([]);
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        let list = []

        quotations.map((q) => {
            if (q.status == 'PAID') {
                setPaid(true)
            }

            list.push(q.professional_id)
        })

        setProfessionalInQuotation(list)

    }, [quotations])

    const handleCloseModalAssign = () => {
        setAssigns([])
        setShowModalAssign(false)
    };
    const handleShowModalAssign = () => {
        getProfessionals();
        setShowModalAssign(true)
    };

    const getProfessionals = () => {
        setLoaded(false);

        const url = Services.ENDPOINT.PANEL.COMPANY.PROFESSIONALS.GET_LIST;

        Services.DoPost(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessionals(response.data.professionals)
                    setLoaded(true);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    const addToList = (professional_id) => {
        setAssigns([
            ...assigns,
            professional_id
        ])
    }

    const removeFromList = (professional_id) => {
        const list = assigns.filter(a => a != professional_id)
        setAssigns(list)
    }

    const assignsQuotations = () => {
        let url = Services.ENDPOINT.PANEL.COMPANY.QUOTATIONS.ASSIGNS;
        let data = {
            assigns: assigns,
            project_id: projectId,
            company_id: companyId,
        }
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success(response.message)
                        handleCloseModalAssign();
                        getProject();
                    },
                    error: () => {
                        toastr.error(response.message)
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const destroyQuotation = (quotation_id) => {
        let url = Services.ENDPOINT.PANEL.COMPANY.QUOTATIONS.DELETE;
        let data = {
            quotation_id: quotation_id
        }
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        toastr.success(response.message)
                        getProject();
                    },
                    error: () => {
                        toastr.error(response.message)
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <div className="row">
                        <div className="col-12 pb-3">
                            <h2 className="font-signika font-20 bold text-secondary">
                                Solicitudes del objetivo
                            </h2>
                            <p className="font-epilogue font-12 light color-939292mb-4">
                                Listado de solicitudes enviadas a profesionales.
                            </p>
                        </div>
                        <div className="col-12 pb-3">
                            {
                                quotations.length > 0 ?
                                    <div className="row">
                                        <div className="col-md-12">
                                            {
                                                quotations.map((quotation, index) => {

                                                    return <QuotationProfessional
                                                        key={index}
                                                        index={index}
                                                        quotation={quotation}
                                                        destroyQuotation={destroyQuotation}
                                                    />
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <NoRegisterExits message="No existen solicitudes"/>
                            }
                        </div>
                        {
                            !paid ?
                                <div className="col-12 pb-3">
                                    <button
                                        type="button"
                                        onClick={handleShowModalAssign}
                                        className="btn btn-primary btn-rounded btn-form">
                                        <span className="font-12 regular">
                                            <i className="fa fa-plus"/> Agregar solicitud
                                        </span>
                                    </button>
                                </div>
                                : null
                        }
                    </div>
                </Card.Body>
            </Card>


            <Modal
                show={showModalAssign}
                onHide={handleCloseModalAssign}
                backdrop="static"
                keyboard={false}
                centered
                contentClassName="modal-custom"
                dialogClassName="modal-725"
            >
                <Modal.Body>
                    <div className="row">
                        <div className="col-auto ml-auto pointer">
                            <img onClick={handleCloseModalAssign} src="/themes/web/assets/images/icons/close-modal.svg"
                                 rel="nofollow"/>
                        </div>
                    </div>
                    <div className="pt-4 pb-5 px-4">
                        <div className="row">
                            <div className="col-12 text-center pb-3">
                                <h3 className="font-24 bold text-primary">
                                    Agregar Profesionales
                                </h3>
                                <p className="font-14 light color-3C3C3E">Lista de profesionales para enviarles
                                    solicitud.</p>
                            </div>
                        </div>
                        <div className="row pb-3">
                            {
                                professionals.map((professional, index) => {

                                    if (!professionalInQuotation.includes(professional.id)) {
                                        return <ProfessionalAddQuotationBlock
                                            key={index}
                                            professional={professional}
                                            index={index}
                                            addToList={addToList}
                                            removeFromList={removeFromList}
                                            assigns={assigns}
                                        />
                                    }
                                })


                            }
                        </div>
                        <div className="row">
                            <div className="col-6 text-right">
                                <button className="btn btn-outline-dark btn-rounded btn-form"
                                        onClick={handleCloseModalAssign}>
                                    <span className="font-12 regular">CANCELAR</span>
                                </button>
                            </div>
                            <div className="col-6 text-left">
                                <button className="btn btn-primary btn-rounded btn-form" onClick={assignsQuotations}>
                                    <span className="font-12 regular">ENVIAR SOLICITUDES</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default QuotationList;
