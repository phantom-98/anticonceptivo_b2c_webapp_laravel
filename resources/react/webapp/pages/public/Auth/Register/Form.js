import React, {useState} from 'react';

import {Card} from "react-bootstrap";
import {setCleanInputError} from "../../../../helpers/GlobalUtils";
import * as Services from "../../../../Services";
import toastr from "toastr";
import SocialMediaButtons from "../SocialMedia/SocialMediaButtons";


const Form = ({authType}) => {


    const [data, setData] = useState({
        auth_name: '',
        auth_email: '',
        auth_password: '',
        auth_action: 'register',
        auth_mode : 'app',
        auth_type : authType
    });

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const doRegister = () => {
        let url = Services.ENDPOINT.AUTH.REGISTER;

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    window.location.href = `/verificar/${response.data.token}/${response.data.email}`
                },
                error: () => {
                    toastr.error(response.message);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    return (
        <Card style={{width: '454px', minHeight: '500px'}}>
            <Card.Body>
                <div className="p-4">
                    <form onSubmit={e => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
                        <div className="row">

                            <div className="col-12">
                                <h2 className="font-signika font-25 bold text-primary mb-4">
                                    Registro {authType == 'professional' ? 'Profesional' : 'Empresa'}
                                </h2>
                            </div>

                            <div className="col-12">
                                <div className="form-group form-group-w2">
                                    <input
                                        type="text"
                                        id="auth_name"
                                        name="auth_name"
                                        value={data.auth_name}
                                        onChange={onChange}
                                        onFocus={setCleanInputError}
                                        className={`form-control form-control-w2 ${data.auth_name.length ? 'has-value' : ''}`}
                                    />
                                    <label
                                        htmlFor="auth_name">{authType == 'professional' ? 'Nombre' : 'Nombre Empresa'}</label>
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group form-group-w2">
                                    <input
                                        type="email"
                                        id="auth_email"
                                        name="auth_email"
                                        value={data.auth_email}
                                        onChange={onChange}
                                        onFocus={setCleanInputError}
                                        className={`form-control form-control-w2 ${data.auth_email.length ? 'has-value' : ''}`}
                                    />
                                    <label htmlFor="auth_email">Email</label>
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group form-group-w2">
                                    <input
                                        type="password"
                                        id="auth_password"
                                        name="auth_password"
                                        value={data.auth_password}
                                        onChange={onChange}
                                        onFocus={setCleanInputError}
                                        className={`form-control form-control-w2 ${data.auth_password.length ? 'has-value' : ''}`}
                                    />
                                    <label htmlFor="auth_password">Password</label>
                                    <div className="invalid-feedback"/>
                                </div>
                            </div>


                            <div className="col-12 text-center pt-3">
                                <button type="button" onClick={doRegister}
                                        className="btn btn-form btn-primary btn-rounded px-4">
                                    <span>Registrar</span>
                                </button>
                            </div>

                            <div className="col-12 py-2">
                                <div className="row">
                                    <div className="col">
                                        <hr/>
                                    </div>
                                    <div className="col-auto d-flex">
                                        <div className="my-auto color-939292">o</div>
                                    </div>
                                    <div className="col">
                                        <hr/>
                                    </div>
                                </div>
                            </div>

                            <SocialMediaButtons authType={authType} actionType="register"/>
                        </div>
                    </form>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Form;
