import React, {useState} from 'react';

import {Card} from "react-bootstrap";

import toastr from 'toastr';
import * as Services from "../../../../../Services";

const Contact = ({professionalId, companyId}) => {


    const [message, setMessage] = useState('');


    const send = () => {

        if (message.trim() === '') {
            toastr.warning('Por favor ingrese un mensaje')
            return null;
        }

        if (message.trim().length < 10) {
            toastr.warning('Por favor mas de 10 caracteres')
            return null;
        }

        // if (message.length < 1) return null;

        let url = Services.ENDPOINT.PANEL.GLOBAL_CHAT.STORE;
        let data = {
            professional_id: professionalId,
            company_id: companyId,
            message: message,
            who_send: 'company'
        }

        Services.DoPost(url, data).then(response => {

            Services.Response({
                response: response,
                success: () => {
                    toastr.success('Mensaje enviado correctamente')
                    setMessage('')
                }
                , error: () => {
                    toastr.error('No se ha podido enviar el mensaje')
                }
            });
        }).catch(error => {
            toastr.error('No se ha podido enviar el mensaje')
        });
    }

    return (
        <div className="mb-3">
            <Card>
                <Card.Body>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="font-25 bold text-primary">Si necesitas consultar algo escríbeme</h2>
                        </div>
                        <div className="col-12">
                            <textarea id="message"
                                      name="message"
                                      className="form-control form-control-custom"
                                      value={message}
                                      onChange={(e) => setMessage(e.target.value)}
                                      rows="10"/>
                        </div>
                        <div className="col-12 text-right pt-4">
                            <button className="btn btn-primary btn-rounded btn-form" onClick={send}>
                                <span className="font-12 regular">Enviar</span>
                            </button>
                        </div>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default Contact;
