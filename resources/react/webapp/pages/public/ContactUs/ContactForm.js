import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap'
import * as Services from "../../../Services";
import toastr from 'toastr';
import { v4 as uuidv4 } from 'uuid';
import Nested from './Nested';

const ContactForm = () => {
    
    const defaultData = {
        contact_first_name: '',
        contact_last_name: '',
        contact_order_id: '',
        contact_email: '',
        contact_phone_code: '+56',
        contact_phone: '',
        contact_message: '',
        contact_subject_parent: '',
    }

    const [model, setModel] = useState(defaultData);
    const [nestedFields, setNestedFields] = useState([]);
    const [list, setList] = useState([]);
    const [inputs, setInput] = useState([]);
    const [path, setPath] = useState([]);

    useEffect(() => {
        getResources();
    }, [])

    const getResources = () => {
        Services.DoPost(Services.ENDPOINT.PUBLIC_AREA.CONTACT.GET_RESOURCES, {}).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setNestedFields(response.data.nested_fields)
                    setList(response.data.list)
                },
                warning: () => {
                    // toastr.warning(response.message)
                },
                error: () => {
                    // toastr.error(response.message)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error);
        });
    }

    const handleParent = (e) => {
        const found = list.find(x => x.id == e.target.value)
        if (found.nested_field_questions.length > 0) {
            let div = [];
            found.nested_field_questions.map(q => {
                div.push(<div key={`question_${q.id}`}>
                    <label htmlFor={q.id}>{q.name}</label>
                    <input type="text"
                        className="form-control form-control-custom"
                        id=""
                        name=""
                        placeholder=""
                    />
                </div>)
            })
            setInput(div)
        }else{
            setInput(null)
        }

        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

        setPath([found]);   
    }

    const handleData = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    const sendData = () => {
        // let url = Services.REPLACE_FOR_VALID_ROUTE;
        let data = {
            ...model,
        }

        console.log(data);

        // Services.DoPost(url,data).then(response => {
        //     Services.Response({
        //         response: response,
        //         success: () => {
        //             toastr.success(response.message);
        //         },
        //         error: () => {
        //             // toastr.error(response.message);
        //         },
        //         warning: () => {
        //             // toastr.warning(response.message);
        //         },
        //     });
        // }).catch(error => {
        //     Services.ErrorCatch(error)
        // });
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="contact_first_name">Nombres</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="contact_first_name"
                           name="contact_first_name"
                           placeholder="Nombres"
                           onChange={handleData}
                           value={model.contact_first_name}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="contact_last_name">Apellidos</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="contact_last_name"
                           name="contact_last_name"
                           placeholder="Apellidos"
                           onChange={handleData}
                           value={model.contact_last_name}
                    />
                </div>
            </div>
            {/* <div className="col-md-6">
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
            </div> */}
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="contact_order_id">¿Cuál es el número de tu orden?</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="contact_order_id"
                           name="contact_order_id"
                           placeholder="Apellidos"
                           onChange={handleData}
                           value={model.contact_order_id}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="contact_email">E-Mail</label>
                    <input type="email"
                           className="form-control form-control-custom"
                           id="contact_email"
                           name="contact_email"
                           placeholder="E-Mail"
                           onChange={handleData}
                           value={model.contact_email}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="contact_phone_code">Código</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="contact_phone_code"
                                name="contact_phone_code"
                                onChange={handleData}
                                value={model.contact_phone_code}
                            >
                                <option value="+56">+56</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="form-group">
                            <label htmlFor="contact_phone">Teléfono</label>
                            <input type="text"
                                   className="form-control form-control-custom"
                                   id="contact_phone"
                                   name="contact_phone"
                                   placeholder="9 8765 4321"
                                   onChange={handleData}
                                   value={model.contact_phone}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="contact_message">Mensaje</label>
                    <textarea
                        rows="7"
                        className="form-control form-control-custom"
                        id="contact_message"
                        name="contact_message"
                        placeholder="Mensaje"
                        onChange={handleData}
                        value={model.contact_message}
                    />
                </div>
            </div>
            <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="contact_subject_parent">Asunto</label>
                    <select 
                        className="form-control form-control-custom pl-2"
                        name="contact_subject_parent"
                        id="contact_subject_parent"
                        onChange={handleParent}
                        value={model.contact_subject_parent}
                    >
                        <option value={''} disabled={true} selected={true}>Seleccione</option>
                        {
                            nestedFields.map(parent => {
                                let parentId = uuidv4();
                                return(
                                    <option selected={path.find(x => x.id == parent.id)} value={parent.id} key={parentId}>
                                        {parent.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {
                        inputs
                    }
                </div>
            </div>
            {
                path.length && path[0].children.length ? 

                <div className="col-md-12">
                    {
                        path.map((parent) => {
                            let parentChild = uuidv4();
                            return parent.children.length ? (
                                <Nested
                                    children={parent.children}
                                    path={path}
                                    setPath={setPath}
                                    list={list}
                                    key={parentChild}
                                    parent={parent}
                                />
                            ) : null
                        })
                    }
                </div>

                : null
            }
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
                                onClick={() => sendData()}>
                            <span className="px-5">ENVIAR</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm