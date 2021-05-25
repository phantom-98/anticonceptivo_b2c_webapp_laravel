import React, {Fragment} from 'react'
import {Form} from "react-bootstrap";

const DynamicField = ({id, name, values, type, index, dynamicData}) => {

    const fieldType = () => {
        switch (type) {
            case 'input':
                return (
                    <div className="col-md-12" key={index}>                        
                        <div className="form-group">
                            <label htmlFor={`dynamic_field_${index}`}>{name}</label>
                                <input type="text"
                                    className="form-control form-control-custom"
                                    id={`${type}-${id}`}
                                    name={`${type}-${id}`}
                                    //    placeholder="Apellidos"
                                    //    onChange={(e) => handleData(e)}
                                    //    value={data.last_name}
                                    //    onFocus={setCleanInputError}
                                />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                )
            case 'textarea':
                return (
                    <div className="col-md-12" key={index}>                        
                        <div className="form-group">
                            <label htmlFor={`dynamic_field_${index}`}>{name}</label>
                                <textarea
                                    rows="7"
                                    className="form-control form-control-custom"
                                    id={`${type}-${id}`}
                                    name={`${type}-${id}`}
                                    // placeholder="Mensaje"
                                    // onChange={handleData}
                                    // onFocus={setCleanInputError}
                                />
                                <div className="invalid-feedback" />
                        </div>
                    </div>
                )
            case 'select':
                let items = values;
                items = items.split(',');

                return(
                    <div className="col-md-12" key={index}>                        
                        <div className="form-group">
                            <label htmlFor={`dynamic_field_${index}`}>{name}</label>
                                <select
                                    className="form-control form-control-custom pl-2"
                                    id={`${type}-${id}`}
                                    name={`${type}-${id}`}
                                    // onChange={(e) => handleData(e)}
                                    // value={data.commercial_commune_id}
                                    >
                                        <option value={null} disabled selected>Seleccionar</option>
                                    {
                                        items.map(item => {
                                            return(
                                                <option value={item} key={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                )
            case 'radio':
                let radios = values;
                radios = radios.split(',');
            
                return(
                    <div className="col-md-12">
                        <div className="form-group">
                        <label htmlFor={`dynamic_field_${index}`}>{name}</label>
                        {
                            radios.map((radio) => {
                                return(
                                    <Fragment>
                                        <div className="col-auto d-flex pr-0">
                                            <div className="my-auto">
                                                    <Form.Check
                                                    custom
                                                    inline
                                                    label={
                                                        <span className="font-poppins font-10 regular color-8E8E8E">{radio}</span>
                                                    }
                                                    type="radio"
                                                    name={`${type}-${id}`}
                                                    checked={false}
                                                    className="mr-1"
                                                    onClick={() => alert('clicked')}
                                                    id={`custom-inline-radio-${type}-${id}`}
                                                />
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                        </div>
                    </div>
                );
            
            case 'checkbox':

                let checkboxes = values;
                checkboxes = checkboxes.split(',');
            
                return(
                    <div className="col-md-12">
                        <div className="form-group">
                        <label htmlFor={`dynamic_field_${index}`}>{name}</label>
                        {
                            checkboxes.map((checkbox, checkboxIndex) => {
                                return(
                                    <Fragment>
                                        <div className="col-auto d-flex pr-0">
                                            <div className="my-auto">
                                                    <Form.Check
                                                    custom
                                                    inline
                                                    label={
                                                        <span className="font-poppins font-10 regular color-8E8E8E">{checkbox}</span>
                                                    }
                                                    type="checkbox"
                                                    name={`${type}-${id}-${checkboxIndex}`}
                                                    checked={false}
                                                    className="mr-1"
                                                    onClick={() => alert('clicked')}
                                                    id={`custom-inline-checkbox-${type}-${id}`}
                                                />
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                        </div>
                    </div>
                );
                
            default:
                break;
        }
    }

    return (
        <Fragment>
            {
                fieldType()
            }
        </Fragment>
    );
}

export default DynamicField