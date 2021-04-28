import React, {useState} from 'react';

import * as Services from "../../Services";

const SendMessage = ({type, professional_id, company_id, quotation_id, getMessages}) => {

    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState('');

    const store = () => {

        if (message.length < 1) return null;

        setSending(true)

        let url = Services.ENDPOINT.PANEL.COMMON.QUOTATIONS.CHAT.STORE;

        let data = {
            professional_id: professional_id,
            company_id: company_id,
            quotation_id: quotation_id,
            message: message,
            who_send: type
        }

        Services.DoPost(url, data).then(response => {

            Services.Response({
                response: response,
                success: () => {
                    // console.log((response.data.messages));
                    getMessages()
                    // setLoadedMessages(true)
                }
            });
            setSending(false)
            setMessage('')
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="row">
            <div className="col">
                <div className="input-group search-filter-button mb-3">
                    <input type="text"
                           className="form-control form-control-custom"
                           placeholder="Escribir mensaje"
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="input-group-append">
                        {
                            sending ?
                                <button className="btn btn-secondary disabled" type="button">
                                    <i className="fa fa-clock"/>
                                </button>
                                :
                                <button className="btn btn-secondary" type="button" onClick={store}>
                                    Enviar
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMessage;
