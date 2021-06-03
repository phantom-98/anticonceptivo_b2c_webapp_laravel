import React from 'react';
import {Form} from 'react-bootstrap'

const ContactForm = () => {

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="first_name">Nombres</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="first_name"
                           name="first_name"
                           placeholder="Nombres"
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="last_name">Apellidos</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="last_name"
                           name="last_name"
                           placeholder="Apellidos"
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="subject">Asunto</label>
                    <select
                        className="form-control form-control-custom pl-2"
                        id="subject"
                        name="subject"
                    >
                        <option value="1">Quiero saber el estado de mi pedido</option>
                        <option value="2">Quiero cambiar un producto</option>
                        <option value="3">Disponibilidad y Precio Producto(s)</option>
                        <option value="4">Felicitaciones</option>
                        <option value="5">Reclamos</option>
                    </select>
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="order_id">¿Cuál es el número de tu orden?</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="order_id"
                           name="order_id"
                           placeholder="Apellidos"
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email"
                           className="form-control form-control-custom"
                           id="email"
                           name="email"
                           placeholder="E-Mail"
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="phone_code">Código</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="phone_code"
                                name="phone_code"
                            >
                                <option value="+56">+56</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="phone"
                                   name="phone"
                                   placeholder="987 654 321"
                            />
                        </div>
                    </div>
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
                            label={<span className="font-inter font-12 regular color-707070">Aceptar <span
                                className="link pointer" onClick={() => alert('Términos y condiciones')}>Términos y condiciones</span> y <span
                                className="link pointer" onClick={() => alert('Políticas de privacidad')}>Políticas de privacidad</span></span>}
                        />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-bicolor px-5"
                                onClick={() => alert('ENVIAR')}>
                            <span className="px-5">ENVIAR</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm