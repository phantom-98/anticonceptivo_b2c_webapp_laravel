import React from 'react';
import {Modal} from "react-bootstrap";
import CloseModal from "../../../components/general/CloseModal";
import {setCleanInputError} from "../../../helpers/GlobalUtils";

const ModalClaim = ({show, hide, saveClaim, data, handleData}) => {

    return (
        <Modal show={show}
               centered
               backdrop="static"
               keyboard={false}
               onHide={hide}
               dialogClassName="modal-new-claim"
               size={'xl'}
               >
            <Modal.Header>
                <CloseModal hideModal={hide}/>
            </Modal.Header>
            <Modal.Body className="px-5">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="modal-title text-center">Reclamo</h3>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="first_name">Nombres</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="first_name"
                                   name="first_name"
                                   onChange={handleData}
                                   value={data.first_name}
                                   placeholder="Nombres"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="email">E-Mail</label>
                            <input type="email"
                                   className="form-control form-control-custom"
                                   id="email"
                                   name="email"
                                   placeholder="hola@email.com"
                                   value={data.email}
                                   onChange={handleData}
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="phone_code">Código</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="phone_code"
                                name="phone_code"
                                onChange={handleData}
                                value={data.phone_code}
                                onFocus={setCleanInputError}
                            >
                                <option defaultValue value="+56">+56</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="phone"
                                   name="phone"
                                   onChange={handleData}
                                   value={data.phone}
                                   placeholder="9 5643 2653"
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-12">
                         <div className="form-group">
                            <label htmlFor="subject">Asunto</label>
                                <select
                                    className="form-control form-control-custom"
                                    id="subject"
                                    name="subject"
                                    onChange={handleData}
                                    value={data.subject}
                                    onFocus={setCleanInputError}
                                >
                                    <option value={''} disabled>Seleccione</option>
                                    <option value={'Demora en tiempo de despacho'}>Demora en tiempo de despacho</option>
                                    <option value={'Producto en mal estado'}>Producto en mal estado</option>
                                    <option value={'Cobro equivocado'}>Cobro equivocado</option>
                                </select>
                                <div className="invalid-feedback" />
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
                                    placeholder="Ingresar Mensaje..."
                                    onChange={handleData}
                                    value={data.message}
                                    onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-6 offset-3 py-2 mt-4 mb-2 text-center">
                        <button type="button" className="btn btn-bicolor btn-block btn-auth"
                                onClick={saveClaim}>
                            <span>Ingresar</span>
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalClaim