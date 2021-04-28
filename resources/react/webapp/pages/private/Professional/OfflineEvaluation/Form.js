import React, {useState} from 'react';
import {Card, Modal} from "react-bootstrap";
import * as Services from "../../../../Services";
import ReactStars from "react-rating-stars-component";
import {setCleanInputError} from "../../../../helpers/GlobalUtils";
import toastr from "toastr";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";

const Form = ({setView, token}) => {

    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

    const handleDescription = e => {
        setDescription(e.target.value)
    }

    const handleRating = (rating) => {
        setRating(rating)
    }


    const setEvaluation = () => {

        if(rating === 0){
            toastr.warning('Seleccione una puntuación de 1 a 5.')
        }

        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.OFFLINE_EVALUATIONS.SET_EVALUATION;

        let data = {
            token : token,
            rating_point : rating,
            rating_description : description
        }

        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setView('success')
                    },
                    error: () => {
                        setView('error')
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <div className="row">
            <div className="col-12 py-2">
                <h3 className="font-30 black text-primary text-center mb-0">Evaluación del Profesional</h3>
                <div className="pt-3 pb-2">
                    <form noValidate className="form needs-validation av-invalid" onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
                        <div className="row mx-4">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="category" className="text-secondary bold">Puntuación</label>
                                    <ReactStars
                                        edit={true}
                                        count={5}
                                        value={rating}
                                        onChange={handleRating}
                                        emptyIcon={<i className="fa fa-star-o"/>}
                                        halfIcon={<i className="fa fa-star-half-o"/>}
                                        filledIcon={<i className="fa fa-star"/>}
                                        isHalf={false}
                                        size={24}
                                        activeColor="rgb(253,156,0)"
                                    />
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="description" className="text-secondary bold">Comentario</label>
                                    <textarea className="form-control"
                                              style={{resize: 'none'}}
                                              rows="5"
                                              maxLength="500"
                                              id="description"
                                              name="description"
                                              onChange={handleDescription}
                                              value={description}
                                              onFocus={setCleanInputError}
                                    />
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center pt-3">
                            <div className="row no-gutters">
                                <div className="col-6 px-1 text-right">
                                    <button
                                        onClick={() => {
                                            window.location.href = PUBLIC_ROUTES.HOME.path;
                                        }}
                                        className="btn btn-form btn-outline-primary btn-rounded px-4">
                                        <span>CANCELAR</span>
                                    </button>
                                </div>
                                <div className="col-6 px-1 text-left">
                                    <button className="btn btn-primary btn-rounded btn-form"
                                            onClick={setEvaluation}><span>ENVIAR</span></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
