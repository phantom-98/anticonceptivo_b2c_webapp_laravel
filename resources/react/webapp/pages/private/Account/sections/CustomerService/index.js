import React, {useState, useContext, useEffect} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import {AuthContext} from '../../../../../context/AuthProvider';
import * as Services from "../../../../../Services";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import toastr from "toastr";
import { v4 as uuidv4 } from "uuid";
import DynamicField from "./DynamicField"
import DynamicPath from "../../../../public/ContactUs/DynamicPath";

const CustomerService = () => {

    const {auth} = useContext(AuthContext);

    const defaultData = {
        customer_id: auth.id,
        email: auth.email,
        name: auth.full_name,
        contact_issue: "1",
        message: '',
        contact_subject_parent: '',
    }

    const [data, setData] = useState(defaultData);
    const [dynamic_inputs, setDynamicData] = useState({});
    const [contactIssues, setContactIssues] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(true);
    const [nestedFields, setNestedFields] = useState([]);
    const [list, setList] = useState([]);
    const [path, setPath] = useState([]);

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        if (contactIssues.length) {
            var temp = contactIssues.find((contact) => contact.id == data.contact_issue)
            setDescription(temp.campaign.description);
            if (temp.fields.length) {
                setDynamicFields(temp.fields);
            }else{
                setDynamicFields([]);
                setDynamicData({});
            }
        }

    },[data.contact_issue, contactIssues])

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
                    setContactIssues(response.data.contact_issues);
                    setNestedFields(response.data.nested_fields);
                    setList(response.data.list);
                    setLoading(false);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const sendToCustomerService = () => {

        let url = Services.ENDPOINT.CUSTOMER.CUSTOMER_SERVICE.SEND;

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

        let dataForm = {
            ...data,
            dynamic_inputs,
            dynamic_fields: fields
        }

        Services.DoPost(url, dataForm).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setData(defaultData);
                    setPath([]);
                    toastr.success(response.message);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const handleData = (e) => {
        setData({...data,
            [e.target.name]: e.target.value
        })
    }

    const handleDynamicData = (e) => {
        setDynamicData({
            ...dynamic_inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleDynamicRadio = (e) => {
        setDynamicData({
            ...dynamic_inputs,
            [e.target.name]: e.target.id
        })
    }

    const handleDynamicCheckbox = (e) => {
        let list = [];

        if(dynamic_inputs[e.target.name].includes(e.target.id)){

            list = dynamic_inputs[e.target.name].filter(x => x !== e.target.id)

        }else{
            list = [
                ...dynamic_inputs[e.target.name],
                e.target.id
            ]
        }

        setDynamicData({
            ...dynamic_inputs,
            [e.target.name]: list
        })
    }

    const handleParent = (e, index) => {
        let found = list.find(x => x.id == e.target.value)

        found['question'] = 'Asunto';
        found['answer'] = found.name;

        setData({
            ...data,
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

    return (
        <div className="row">
            <H3Panel title="SERVICIO AL CLIENTE"/>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="contact_issue">Asunto</label>
                            <select
                                className="form-control form-control-custom pl-2"
                                id="contact_issue"
                                name="contact_issue"
                                onChange={handleData}
                                onFocus={setCleanInputError}
                                value={data.contact_issue}
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
                        dynamic_inputs.length ?
                            dynamic_inputs.map((dynamicField, index) => {
                                return (
                                    <DynamicField
                                        id={dynamicField.id}
                                        name={dynamicField.name}
                                        values={dynamicField.values}
                                        type={dynamicField.type}
                                        index={index}
                                        dynamic_inputs={dynamic_inputs}
                                        handleDynamicData={handleDynamicData}
                                        handleDynamicRadio={handleDynamicRadio}
                                        handleDynamicCheckbox={handleDynamicCheckbox}
                                        key={index}
                                    />
                                )
                            })
                        : null
                    }
                    <DynamicPath
                        loading={loading}
                        model={data}
                        handleParent={handleParent}
                        handleInputs={handleInputs}
                        nestedFields={nestedFields}
                        path={path}
                        setPath={setPath}
                        list={list}
                    />
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
                            <div className="col-12 text-right">
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
