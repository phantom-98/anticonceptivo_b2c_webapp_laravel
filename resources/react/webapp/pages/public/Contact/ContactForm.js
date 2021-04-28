import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import * as Services from "../../../Services";

const ContactForm = ({setShowing}) => {

    const defaultData = {
        name: "",
        email: "",
        message: ""
    };

    const [data, setData] = useState(defaultData);

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const sendMessage = () => {
        let url = Services.ENDPOINT.NO_AUTH.CONTACT.SEND;
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setData(defaultData);
                        setShowing("success");
                        toastr.success(response.message);
                    },
                    error: () => {
                        toastr.error(response.message);
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    return (
        <div className="p-4">
            <form onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
            }}>
                <div className="row">

                    <div className="col-12">
                        <h2 className="font-signika font-25 bold text-primary mb-4">
                            Contacto
                        </h2>
                    </div>

                    <div className="col-12">
                        <div className="form-group form-group-w2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={onChange}
                                className={`form-control form-control-w2 ${data.name.length ? 'has-value' : ''}`}
                            />
                            <label htmlFor="name">Nombre Apellido</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group form-group-w2">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={onChange}
                                className={`form-control form-control-w2 ${data.email.length ? 'has-value' : ''}`}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group form-group-w2">
                            <textarea
                                id="message"
                                name="message"
                                value={data.message}
                                onChange={onChange}
                                style={{resize: 'none', height : '171px'}}
                                className={`form-control form-control-w2 ${data.message.length ? 'has-value' : ''}`}
                            />
                            <label htmlFor="message">Mensaje</label>
                        </div>
                    </div>

                    <div className="col-12 text-center pt-2">
                        <button type="button" onClick={sendMessage} className="btn btn-form btn-primary btn-rounded px-4">
                            <span>Siguiente</span>
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
