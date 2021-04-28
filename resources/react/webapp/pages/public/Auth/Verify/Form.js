import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import {setCleanInputError} from "../../../../helpers/GlobalUtils";
import * as Services from "../../../../Services";
import toastr from "toastr";
import PinInput from "react-pin-input";

const Form = ({match}) => {

    const [verifyLoading, setVerifyLoading] = useState(false)

    const [data, setData] = useState({
        auth_email: match.params.email,
        auth_token:  match.params.token,
        verify_code: '',
    });

    useEffect(() =>{
        if (match){
            setData({
                ...data,
                auth_email: match.params.email,
                auth_token:  match.params.token,
            })
        }
    }, [match])

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const verify = () =>{

        if(data.verify_code.length < 6){
            toastr.error('Ingrese el código');
            return null
        }

        setVerifyLoading(true)

        let url = Services.ENDPOINT.AUTH.VERIFY;

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message);
                    window.location.href = `/validate-login/${data.auth_token}/${data.auth_email}`
                    setVerifyLoading(true)
                },
                error: () => {
                    toastr.error(response.message);
                    setVerifyLoading(false)
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
            setVerifyLoading(false)
        });
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
                                    Ingresa el código que te enviamos por e-mail
                                </h2>
                                <p className="font-epilogue font-14 light color-707070">
                                    Lo enviamos a <span className="text-info">{data.auth_email}</span> para confirmar que te pertenece. Si no lo encuentras revisa tu carpeta de correo no deseado.
                                </p>
                            </div>

                            <div className="col-12 text-center pb-3">

                                <PinInput
                                    length={6}
                                    initialValue=""
                                    onChange={(value, index) => {
                                        setData({
                                            ...data,
                                            verify_code: value
                                        })
                                    }}
                                    type="numeric"
                                    inputMode="number"
                                    style={{padding: '5px'}}
                                    inputStyle={{
                                        borderColor: '#0f0f0f',
                                        border : 'none',
                                        borderBottom : '1px solid',
                                        margin : '0 5px',
                                        width : '40px',
                                    }}
                                    inputFocusStyle={{borderColor: '#422485'}}
                                    onComplete={(value, index) => {}}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                />

                                {/*<div className="form-group form-group-w2">*/}


                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        id="verify_code"*/}
                                {/*        name="verify_code"*/}
                                {/*        value={data.verify_code}*/}
                                {/*        onChange={onChange}*/}
                                {/*        onFocus={setCleanInputError}*/}
                                {/*        className={`form-control form-control-w2 ${data.verify_code.length ? 'has-value' : ''}`}*/}
                                {/*    />*/}
                                {/*    <label htmlFor="verify_code">Código activación</label>*/}
                                {/*    <div className="invalid-feedback"/>*/}
                                {/*</div>*/}
                            </div>

                            <div className="col-12 text-center pt-3">
                                {
                                    verifyLoading ?
                                        <button type="button" className="btn btn-form btn-primary btn-rounded px-4" disabled>
                                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
                                            <span>Verificar</span>
                                        </button>
                                        :
                                        <button type="button" onClick={verify} className="btn btn-form btn-primary btn-rounded px-4">
                                            <span>Verificar</span>
                                        </button>
                                }

                            </div>

                        </div>
                    </form>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Form;
