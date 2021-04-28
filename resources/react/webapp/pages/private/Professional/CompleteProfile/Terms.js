import React, {Fragment, useState} from 'react';
import ModalTerms from "../../../../components/Modal/ModalTerms";
import ModalPaymentTerms from "../../../../components/Modal/ModalPaymentTerms";
import * as Services from "../../../../Services";

const Terms = ({professional, setProfessional, setShowingSection}) => {

    const [showTerms, setShowTerms] = useState(false);
    const [showPaymentTerms, setShowPaymentTerms] = useState(false);

    const handleCloseTerms = () => setShowTerms(false);
    const handleShowTerms = () => setShowTerms(true);
    const handleClosePaymentTerms = () => setShowPaymentTerms(false);
    const handleShowPaymentTerms = () => setShowPaymentTerms(true);

    const [model, setModel] = useState({
        professional_id: professional.id,
        accepts_moderation: professional.accepts_moderation,
        accepts_payment_conditions: professional.accepts_payment_conditions,
        accepts_terms: professional.accepts_terms,
    });

    const handleCheck = (e) => {
        setModel({
            ...model,
            [e.target.name]: true
        })
    }

    const store = () => {

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.COMPLETE_PROFILE.TERMS;

        Services.DoPost(url, model).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessional(response.data.professional)
                    setShowingSection('abilities')
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    const controlNext = () => {
        if (model.accepts_moderation && model.accepts_payment_conditions && model.accepts_terms) {
            return <button type="button" onClick={store} className="btn btn-form btn-primary btn-rounded px-4">
                <span>Siguiente</span>
            </button>;
        }
        return <button type="button" className="btn btn-form btn-primary btn-rounded disabled px-4">
            <span>Siguiente</span>
        </button>
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="font-signika font-25 bold text-primary mb-4">
                        ¡Hola {professional.full_name}, bienvenid@ a ikiru!
                    </h4>
                    <p className="font-epilogue font-14 light color-3C3C3E lh-25">
                        Aquí te ayudaremos a crear tu perfil como freelancer para que consigas tu primer objetivo. Sigue
                        estos pasos para aprovechar al máximo los beneficios de ikirua la hora de trabajar. ¡Mucha
                        suerte!
                        Importante: Ten en cuenta que tu perfil pasará por una etapa de moderación y este proceso puede
                        tardar hasta 15 días. Para tener más chances de ser elegido no olvides completar todas las
                        instancias: demuestra tu experiencia, agrega tu portfolio de Behance (si corresponde) y suma
                        certificaciones.
                    </p>
                </div>
                <div className="col-12 py-3">
                    <div className="mb-1">
                        <div className="custom-control custom-checkbox">
                            <input className="custom-control-input"
                                   type="checkbox"
                                   name="accepts_moderation"
                                   id="accepts_moderation"
                                   value={model.accepts_moderation}
                                   checked={model.accepts_moderation}
                                   onChange={handleCheck}
                            />
                            <label className="custom-control-label font-epilogue font-14 light"
                                   htmlFor="accepts_moderation">
                                Entiendo que mi perfil debe ser moderado para empezar a trabajar.
                            </label>
                        </div>
                    </div>
                    <div className="mb-1">
                        <div className="custom-control custom-checkbox">
                            <input className="custom-control-input"
                                   type="checkbox"
                                   id="accepts_payment_conditions"
                                   name="accepts_payment_conditions"
                                   value={model.accepts_payment_conditions}
                                   checked={model.accepts_payment_conditions}
                                   onChange={handleCheck}
                            />
                            <label className="custom-control-label font-epilogue font-14 light"
                                   htmlFor="accepts_payment_conditions">
                                Acepto las
                            </label>
                            <span onClick={handleShowPaymentTerms}
                                  className="font-epilogue font-14 light pointer btn-link ml-1">condiciones de pago</span>
                        </div>
                    </div>
                    <div className="mb-1">
                        <div className="custom-control custom-checkbox">
                            <input className="custom-control-input"
                                   type="checkbox"
                                   id="accepts_terms"
                                   name="accepts_terms"
                                   value={model.accepts_terms}
                                   checked={model.accepts_terms}
                                   onChange={handleCheck}
                            />
                            <label className="custom-control-label font-epilogue font-14 light" htmlFor="accepts_terms">
                                Acepto las
                            </label>
                            <span onClick={handleShowTerms}
                                  className="font-epilogue font-14 light pointer btn-link ml-1">términos y condiciones</span>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6"/>
                        <div className="col-6 text-right">
                            {
                                controlNext()
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ModalTerms show={showTerms} handleClose={handleCloseTerms}/>
            <ModalPaymentTerms show={showPaymentTerms} handleClose={handleClosePaymentTerms}/>
        </Fragment>
    );
};

export default Terms;
