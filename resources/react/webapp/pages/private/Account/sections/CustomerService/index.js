import React from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import {Form} from 'react-bootstrap';


const CustomerService = () => {
    return (
        <div className="row">
            <H3Panel title="SERVICIO AL CLIENTE"/>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="subject_one">Asunto</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="subject_one"
                                name="subject_one">
                                <option value="claim">Reclamo</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <select
                                className="form-control form-control-custom pl-2"
                                id="subject_two"
                                name="subject_two">
                                <option value="claim">No me llegaron todos los productos</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="message">Mensaje</label>
                            <textarea
                                rows="7"
                                className="form-control form-control-custom"
                                id="message"
                                name="message"
                                placeholder="Mensaje"
                            />
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col">
                                <Form.Check
                                    custom
                                    type="checkbox"
                                    id="accept_terms"
                                    label={<span className="font-inter font-12 regular color-707070">Aceptar <span className="link pointer" onClick={() => alert('Términos y condiciones')}>Términos y condiciones</span> y <span className="link pointer" onClick={() => alert('Políticas de privacidad')}>Políticas de privacidad</span> </span>}
                                />
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-bicolor px-5"
                                        onClick={() => alert('ENVIAR')}>
                                    <span>ENVIAR</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerService
