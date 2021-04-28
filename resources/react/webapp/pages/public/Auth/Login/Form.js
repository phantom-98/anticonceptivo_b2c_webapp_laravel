import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {setCleanInputError} from "../../../../helpers/GlobalUtils";
import SocialMediaButtons from "../SocialMedia/SocialMediaButtons";
import {doLogin} from "../actions";

const Form = () => {

    const [loginLoading, setLoginLoading] = useState(false)

    const [data, setData] = useState({
        auth_email: '',
        auth_password: '',
        auth_action: 'login',
        auth_mode : 'app',
        auth_type : 'both'
    });

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const login = () =>{
        setLoginLoading(true)
        doLogin(data, (status) => {
            if(status != 'success'){
                setLoginLoading(false)
            }
        })
    }
    return (
        <Card style={{width: '454px', minHeight: '432px'}}>
            <Card.Body>
                <div className="p-4">
                    <form onSubmit={e => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>
                        <div className="row">

                            <div className="col-12">
                                <h2 className="font-signika font-25 bold text-primary mb-4">
                                    Iniciar Sesión
                                </h2>
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
                                {
                                    loginLoading ?
                                        <button type="button" className="btn btn-form btn-primary btn-rounded px-4" disabled>
                                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
                                            <span>Acceder</span>
                                        </button>
                                        :
                                        <button type="button" onClick={login} className="btn btn-form btn-primary btn-rounded px-4">
                                            <span>Acceder</span>
                                        </button>
                                }

                            </div>

                            <div className="col-12 py-2">
                                <div className="row">
                                    <div className="col"><hr/></div>
                                    <div className="col-auto d-flex"><div className="my-auto color-939292">o</div></div>
                                    <div className="col"><hr/></div>
                                </div>
                            </div>

                            <SocialMediaButtons authType="both" actionType="register"/>

                        </div>
                    </form>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Form;
