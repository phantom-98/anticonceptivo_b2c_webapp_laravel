import React, {useEffect, useState} from 'react';
import {Form, Modal} from 'react-bootstrap'
import * as Services from "../../../Services";
import toastr from 'toastr';
import Terms from "../TermsAndConditions/Terms";
import PrivacyPolice from "../CorporateResponsibility/PrivacyPolicies";
import CloseModal from "../../../components/general/CloseModal";
import {setCleanInputError} from "../../../helpers/GlobalUtils";
import DynamicPath from "./DynamicPath";

const ContactForm = () => {

    const defaultModel = {
        contact_first_name: '',
        contact_last_name: '',
        contact_order_id: '',
        contact_email: '',
        contact_phone_code: '+56',
        contact_phone: '',
        contact_message: '',
        contact_subject_parent: '',
        contact_accept_terms: '0'
    }

    const [loading, setLoading] = useState(true);
    const [model, setModel] = useState(defaultModel);
    const [nestedFields, setNestedFields] = useState([]);
    const [list, setList] = useState([]);
    const [path, setPath] = useState([]);
    const [privacyPolicy, setPrivacyPolicy] = useState({});

    const [handleTermsModal, setHandleTermsModal] = useState(false);
    const [handlePrivacyPoliceModal, setHandlePrivacyPoliceModal] = useState(false);

    const showTermsModal = () => setHandleTermsModal(true);
    const hideTermsModal = () => setHandleTermsModal(false);

    const showPrivacyPoliceModal = () => setHandlePrivacyPoliceModal(true);
    const hidePrivacyPoliceModal = () => setHandlePrivacyPoliceModal(false);

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
                    setPrivacyPolicy(response.data.privacy_policy)
                    setLoading(false);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error);
        });
    }

    const handleParent = (e, index) => {
        let found = list.find(x => x.id == e.target.value)

        found['question'] = 'Asunto';
        found['answer'] = found.name;

        setModel({
            ...model,
            [e.target.name]: e.target.value
        })

        setPath([found]);
    }

    const handleData = (e, isRadio = false) => {
        if (isRadio) {
            setModel({
                ...model,
                ['contact_accept_terms']: e.target.value == '0' ? '1' : '0'
            })
        }else{
            setModel({
                ...model,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleInputs = (e, parentId, inputId) => {
        let tempPath = path;
        let foundIndex = path.findIndex(p => p.id == parentId);
        let found = path[foundIndex]

        let nestedFieldQuestions = found.nested_field_questions
        let nestedIndex = nestedFieldQuestions.findIndex(nfq => nfq.id == inputId);

        nestedFieldQuestions[nestedIndex]['question'] = nestedFieldQuestions[nestedIndex].name;
        nestedFieldQuestions[nestedIndex]['answer'] = e.target.value;

        found['nested_field_questions'] = nestedFieldQuestions
        tempPath[foundIndex] = found
        setPath(tempPath);
    }

    const sendData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.CONTACT.SEND;

        let fields = [];

        path.map(p => {
            fields.push({
                question: p.question,
                answer: p.answer,
            })
            if (p.nested_field_questions) {
                p.nested_field_questions.map(nf => {
                    if ('question' in nf && 'answer' in nf) {
                        fields.push({
                            question: nf.question,
                            answer: nf.answer,
                        })
                    }
                })
            }
        })
        let data = {
            ...model,
            dynamic_fields: fields
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    toastr.success(response.message);
                    setModel(defaultModel)
                    setPath([]);
                },
                error: () => {
                    toastr.error(response.message);
                },
                warning: () => {
                    toastr.warning(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
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
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
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
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="contact_order_id">¿Cuál es el número de tu orden?</label>
                    <input type="text"
                           className="form-control form-control-custom"
                           id="contact_order_id"
                           name="contact_order_id"
                           placeholder="Nº de orden Ej: 293"
                           onChange={handleData}
                           value={model.contact_order_id}
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
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
                           onFocus={setCleanInputError}
                    />
                    <div className="invalid-feedback" />
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
                                onFocus={setCleanInputError}
                            >
                                <option value="+56">+56</option>
                            </select>
                            <div className="invalid-feedback" />
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
                                   onFocus={setCleanInputError}
                            />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                </div>
            </div>
            <DynamicPath
                loading={loading}
                model={model}
                handleParent={handleParent}
                handleInputs={handleInputs}
                nestedFields={nestedFields}
                path={path}
                setPath={setPath}
                list={list}
            />
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
                            id="contact_accept_terms"
                            value={model.contact_accept_terms}
                            onFocus={setCleanInputError}
                            onChange={(e) => handleData(e, true)}
                            label={<span className="font-inter font-12 regular color-707070">Aceptar <span
                                className="link pointer" onClick={() => showTermsModal()}>Términos y condiciones</span> y <span
                                className="link pointer" onClick={() => showPrivacyPoliceModal()}>Políticas de privacidad</span></span>}
                        />
                        <div className="invalid-feedback" />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-bicolor px-5"
                                onClick={() => sendData()}>
                            <span className="px-5">ENVIAR</span>
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                show={handleTermsModal}
                centered
                backdrop="static"
                keyboard={false}
                onHide={hideTermsModal}
                dialogClassName="modal-new-claim"
            >
                <Modal.Header>
                    <CloseModal hideModal={hideTermsModal} />
                </Modal.Header>
                <Modal.Body className="px-5">

                    <div className="row">
                        <div className="col-12">
                            <Terms/>
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
            <Modal
                show={handlePrivacyPoliceModal}
                centered
                backdrop="static"
                keyboard={false}
                onHide={hidePrivacyPoliceModal}
                dialogClassName="modal-new-claim"
            >
                <Modal.Header>
                    <CloseModal hideModal={hidePrivacyPoliceModal} />
                </Modal.Header>
                <Modal.Body className="px-5">

                    <div className="row">
                        <div className="col-12">
                            <PrivacyPolice
                                privacyPolicy={privacyPolicy}
                            />
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    );
};

export default ContactForm
