import React, {useState, useContext, useEffect} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import {AuthContext} from '../../../../../context/AuthProvider';
import * as Services from "../../../../../Services";
import {setCleanInputError} from "../../../../../helpers/GlobalUtils";
import toastr from "toastr";
import { v4 as uuidv4 } from "uuid";
import DynamicField from "./DynamicField"

const CustomerService = () => {

    const {auth} = useContext(AuthContext);

    const defaultData = {
        customer_id: auth.id,
        email: auth.email,
        name: auth.full_name,
        contact_issue: "1",
        message: '',
    }

    const [data, setData] = useState(defaultData);
    const [dynamicData, setDynamicData] = useState({});
    const [contactIssues, setContactIssues] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [description, setDescription] = useState('');

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
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const sendToCustomerService = () => {

        let url = Services.ENDPOINT.CUSTOMER.CUSTOMER_SERVICE.SEND;

        let dataForm = {
            ...data,
            dynamicData
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
