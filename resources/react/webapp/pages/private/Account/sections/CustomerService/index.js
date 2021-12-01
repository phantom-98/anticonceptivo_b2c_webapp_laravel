import React, {useState, useContext, useEffect} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import {AuthContext} from '../../../../../context/AuthProvider';
import * as Services from "../../../../../Services";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import toastr from "toastr";
import { v4 as uuidv4 } from "uuid";
import DynamicField from "./DynamicField"
import DynamicPath from "../../../../public/ContactUs/DynamicPath";
import {Form, Modal} from "react-bootstrap";
import CloseModal from "../../../../../components/general/CloseModal";
import Terms from "../../../../public/TermsAndConditions/Terms";
import PrivacyPolice from "../../../../public/CorporateResponsibility/PrivacyPolicies";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";

const CustomerService = () => {

    const {auth} = useContext(AuthContext);
    const { breakpoint } = useContext(AppContext)

    const defaultData = {
        customer_id: auth.id,
        email: auth.email,
        name: auth.full_name,
        contact_issue_id: "1",
        message: '',
        contact_accept_terms: '0'
    }

    const defaultModel = {
        contact_subject_parent: '',
    }
    const [model, setModel] = useState(defaultModel);

    const [data, setData] = useState(defaultData);
    const [dynamicData, setDynamicData] = useState({});
    const [contactIssues, setContactIssues] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [description, setDescription] = useState('');
    
    const [privacyPolicy, setPrivacyPolicy] = useState({});

    const [handleTermsModal, setHandleTermsModal] = useState(false);
    const [handlePrivacyPoliceModal, setHandlePrivacyPoliceModal] = useState(false);

    const showTermsModal = () => setHandleTermsModal(true);
    const hideTermsModal = () => setHandleTermsModal(false);

    const showPrivacyPoliceModal = () => setHandlePrivacyPoliceModal(true);
    const hidePrivacyPoliceModal = () => setHandlePrivacyPoliceModal(false);

    const [nestedFields, setNestedFields] = useState([]);
    const [list, setList] = useState([]);
    const [path, setPath] = useState([]);
    const [loading, setLoading] = useState(true);

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        if (contactIssues.length) {
            var temp = contactIssues.find((contact) => contact.id == data.contact_issue_id)

            if(!temp){
                return
            }

            let url = Services.ENDPOINT.CUSTOMER.CUSTOMER_SERVICE.GET;
            let data_id = {
                action: 'CUSTOMER_SERVICE_DATA_FOR_CONTACT',
                contact_issue_id: temp.id
            }
            Services.DoPost(url,data_id).then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setNestedFields(response.data.nested_field);
                        setPrivacyPolicy(response.data.privacy_policy)
                        setLoading(false);

                    },
                });
            }).catch(error => {
                Services.ErrorCatch(error)
            });

            setDescription(temp.campaign.active ? temp.campaign.description : '');
            if (temp.fields.length) {
                setDynamicFields(temp.fields);
            }else{
                setDynamicFields([]);
                setDynamicData({});
            }
        }
    },[data.contact_issue_id, contactIssues])

    useEffect(() => {
        if (dynamicFields.length) {
            let temp = {};

            dynamicFields.map(dynamic => {
                if (dynamic.type === 'checkbox') {
                    temp = {
                        ...temp,
                        [dynamic.type+'-'+dynamic.id]: []
                    }
                }else{
                    temp = {
                        ...temp,
                        [dynamic.type+'-'+dynamic.id]: ''
                    }
                }
            })

            setDynamicData(temp);
        }
    },[dynamicFields])

    const getData = () => {
        let url = Services.ENDPOINT.CUSTOMER.CUSTOMER_SERVICE.GET;
        let data = {
            action: 'CUSTOMER_SERVICE_DATA'
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setList(response.data.list);
                    setQuestions(response.data.questions);
                    setData({...data,
                        ['contact_issue_id']: response.data.contact_issues.length > 0 ? response.data.contact_issues[0].id : 1
                    })
                    setContactIssues(response.data.contact_issues);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const sendToCustomerService = () => {

        let url = Services.ENDPOINT.CUSTOMER.CUSTOMER_SERVICE.SEND;
        let fields = [];

        let dynamic_fields_temp = [];

        Object.entries(dynamicData).map(item => {
            let temp = {
                question: questions.find(q => q.id == item[0].split('-').pop()).name,
                // type: item[0].split('-').shift(),
                answer: item[1]
            };

            dynamic_fields_temp.push(temp);
        })

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

        let dataForm = {
            ...data,
            ...model,
            dynamic_fields: dynamic_fields_temp,
            nested_fields: fields
        }


        Services.DoPost(url, dataForm).then(response => {
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


    const handleData = (e, isRadio = false) => {
        if (isRadio) {
            console.log(e.target.value)
            setData({
                ...data,
                ['contact_accept_terms']: e.target.value == '0' ? '1' : '0'
            })
        }else{
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
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

    const handleDynamicData = (e) => {
        setDynamicData({
            ...dynamicData,
            [e.target.name]: e.target.value
        })
    }

    const handleDynamicRadio = (e) => {
        setDynamicData({
            ...dynamicData,
            [e.target.name]: e.target.id
        })
    }

    const handleDynamicCheckbox = (e) => {
        let list = [];

        if(dynamicData[e.target.name].includes(e.target.id)){

            list = dynamicData[e.target.name].filter(x => x !== e.target.id)

        }else{
            list = [
                ...dynamicData[e.target.name],
                e.target.id
            ]
        }

        setDynamicData({
            ...dynamicData,
            [e.target.name]: list
        })
    }

    return (
        <div className="row" style={{marginTop: breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? '-50px' :'0px'}}>
            <H3Panel title="SERVICIO AL CLIENTE" className="mb-3 d-none d-md-block"/>
            <div className="col-md-12">
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="contact_issue_id">Asunto</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="contact_issue_id"
                                name="contact_issue_id"
                                onChange={handleData}
                                onFocus={setCleanInputError}
                                value={data.contact_issue_id}
                            >
                                {
                                    contactIssues.map((issue) => {
                                        let uuid = uuidv4();
                                        return(
                                            <option value={issue.id} key={uuid}>{issue.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12 text-justify">
                        <div dangerouslySetInnerHTML={{ __html:description}}/>
                    </div>
                    {
                        dynamicFields.length ?
                            dynamicFields.map((dynamicField, index) => {
                                return (
                                    <DynamicField
                                        id={dynamicField.id}
                                        name={dynamicField.name}
                                        values={dynamicField.values}
                                        type={dynamicField.type}
                                        index={index}
                                        dynamicData={dynamicData}
                                        handleDynamicData={handleDynamicData}
                                        handleDynamicRadio={handleDynamicRadio}
                                        handleDynamicCheckbox={handleDynamicCheckbox}
                                        key={index}
                                    />
                                )
                            })
                            : null
                    }
                    {
                        nestedFields.length > 0 ?
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
                            : null
                    }
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
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col mb-3">
                                <Form.Check
                                    custom
                                    type="checkbox"
                                    id="contact_accept_terms"
                                    value={data.contact_accept_terms}
                                    onFocus={setCleanInputError}
                                    onChange={(e) => handleData(e, true)}
                                    label={<span className="font-inter font-11 regular color-707070">Aceptar <span
                                        className="link pointer" onClick={() => showTermsModal()}>Términos y condiciones</span> y <span
                                        className="link pointer" onClick={() => showPrivacyPoliceModal()}>Políticas de privacidad</span></span>}
                                />
                                <div className="invalid-feedback" />
                            </div>
                            <div className="col-md-12 text-right d-none d-sm-block">
                                <button type="button" className="btn btn-bicolor px-5"
                                        onClick={() => sendToCustomerService()}>
                                    <span className="font-18">ENVIAR</span>
                                </button>
                            </div>
                            <div className="col-md-12 text-center d-block d-sm-none">
                                <button type="button" className="btn btn-bicolor px-5 w-100"
                                        onClick={() => sendToCustomerService()}>
                                    <span className="font-18">ENVIAR</span>
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
