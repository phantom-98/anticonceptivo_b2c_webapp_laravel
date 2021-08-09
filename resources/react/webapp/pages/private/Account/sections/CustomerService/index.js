import React, {useState, useContext, useEffect, Fragment} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import {AuthContext} from '../../../../../context/AuthProvider';
import * as Services from "../../../../../Services";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import toastr from "toastr";
import { v4 as uuidv4 } from "uuid";
import DynamicField from "./DynamicField"
import Nested from '../../../../public/ContactUs/Nested';
import LazyLoading from "../../../../../components/LazyLoading";

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
                        dynamicFields.length ?
                            dynamicFields.map((dynamicField, index) => {
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
                    {
                        !loading ?
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="contact_subject_parent">Asunto</label>
                                    <select
                                        className="form-control form-control-custom pl-2"
                                        name="contact_subject_parent"
                                        id="contact_subject_parent"
                                        onChange={handleParent}
                                        value={data.contact_subject_parent}
                                        onFocus={setCleanInputError}
                                    >
                                        <option value={''} disabled={true} selected={true}>Seleccione</option>
                                        {
                                            nestedFields.map(parent => {
                                                let parentId = uuidv4();
                                                return (
                                                    <option selected={path.find(x => x.id == parent.id)} value={parent.id}
                                                            key={parentId}>
                                                        {parent.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className="invalid-feedback" />
                                </div>
                            </div>
                            : null
                    }
                    {
                        !loading ?
                            path.length ?
                                <div className="col-md-12">
                                    {
                                        path.map((parent, index) => {
                                            let parentChild = uuidv4();
                                            return (
                                                <Fragment key={parentChild}>
                                                    {
                                                        parent.nested_field_questions.map((element, index) => {
                                                            let elementKey = uuidv4();
                                                            return (
                                                                <div key={elementKey} className="form-group">
                                                                    <label htmlFor={``}>{element.name}</label>
                                                                    <input type="text"
                                                                        className="form-control form-control-custom"
                                                                        id=""
                                                                        name=""
                                                                        placeholder=""
                                                                        value={element.answer}
                                                                        onChange={(e) => handleInputs(e, parent.id, element.id)}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        parent.children.length ?
                                                            <Nested
                                                                children={parent.children}
                                                                path={path}
                                                                setPath={setPath}
                                                                list={list}
                                                                parent={parent}
                                                            />
                                                            : null
                                                    }
                                                </Fragment>
                                            )
                                        })
                                    }
                                </div>
                                : null
                            : <LazyLoading/>
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
