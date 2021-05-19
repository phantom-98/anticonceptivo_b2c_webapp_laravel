import React, {useState, useContext} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import {Form} from 'react-bootstrap';
import {AuthContext} from '../../../../../context/AuthProvider';
import * as Services from "../../../../../Services";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import toastr from "toastr";

const CustomerService = () => {

    const {auth} = useContext(AuthContext);

    const defaultData = {
        customer_id: auth.id,
        email: auth.email,
        name: auth.full_name,
        subject_one: 'claim',
        subject_two: 'claimV2',
        message: '',
        accept_terms: '',
    }

    const [data, setData] = useState(defaultData);

    const handleData = (e) => {
        if (e.target.name === 'accept_terms') {
            setData({...data,
                [e.target.name]: data.accept_terms === false || data.accept_terms === '' ? true : false
            })
        }else{
            setData({...data,
                [e.target.name]: e.target.value
            })
        }
    }

    const sendToCustomerService = () => {
        let url = Services.ENDPOINT.CUSTOMER.CUSTOMER_SERVICE.SEND;
        
        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setData(defaultData);
                    toastr.success(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

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
                                name="subject_one"
                                onChange={handleData}
                                onFocus={setCleanInputError}
                                >
                                <option value="claim">Reclamo</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <select
                                className="form-control form-control-custom pl-2"
                                id="subject_two"
                                name="subject_two"
                                onChange={handleData}
                                onFocus={setCleanInputError}
                                >
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
                                onChange={handleData}
                                onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col">
                                <Form.Check
                                    custom
                                    type="checkbox"
                                    id="accept_terms"
                                    name="accept_terms"
                                    onClick={handleData}
                                    checked={data.accept_terms === true ? true : false}
                                    onFocus={setCleanInputError}
                                    label={<span className="font-inter font-12 regular color-707070">Aceptar <span className="link pointer" onClick={() => alert('Términos y condiciones')}>Términos y condiciones</span> y <span className="link pointer" onClick={() => alert('Políticas de privacidad')}>Políticas de privacidad</span> </span>}
                                />
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-bicolor px-5"
                                        onClick={() => sendToCustomerService()}>
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
