import React, {Fragment} from 'react'
import {Form} from "react-bootstrap";

const DynamicField = ({id, name, values, type, index, dynamicData, handleDynamicData, handleDynamicRadio, handleDynamicCheckbox}) => {

    const fieldType = () => {

        switch (type) {
            case 'input':
                return (
                    <div className="col-md-12" key={index}>                        
                        <div className="form-group">
                            <label htmlFor={`${type}-${id}`}>{name}</label>
                                <input type="text"
                                    className="form-control form-control-custom"
                                    id={`${type}-${id}`}
                                    name={`${type}-${id}`}
                                    placeholder="Ingresar Texto..."
                                    onChange={handleDynamicData}
                                    value={dynamicData[type+'-'+id]}
                                    // onFocus={setCleanInputError}
                                />
                            <div className="invalid-feedback" />
                        </div>
                    </div>
                )
            case 'textarea':
                return (
                    <div className="col-md-12" key={index}>                        
                        <div className="form-group">
                            <label htmlFor={`${type}-${id}`}>{name}</label>
                                <textarea
                                    rows="7"
                                    className="form-control form-control-custom"
                                    id={`${type}-${id}`}
                                    name={`${type}-${id}`}
                                    placeholder="Ingresar Párrafo..."
                                    onChange={handleDynamicData}
                                    value={dynamicData[type+'-'+id]}
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
                            <label htmlFor={`${type}-${id}`}>{name}</label>
                                <select
                                    className="form-control form-control-custom pl-2"
                                    id={`${type}-${id}`}
                                    name={`${type}-${id}`}
                                    onChange={handleDynamicData}
                                    value={dynamicData[type+'-'+id]}
                                    >
                                        <option value={null} disabled selected>Seleccionar</option>
                                    {
                                        items.map((item, itemIndex) => {
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
                        <label htmlFor={`${type}-${id}`}>{name}</label>
                        {
                            radios.map((radio, radioIndex) => {
                                return(
                                    <Fragment key={radioIndex+100}>
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
                                                    // checked={dynamicData[type+'-'+id]}
                                                    className="mr-1"
                                                    onChange={handleDynamicRadio}
                                                    id={radio}
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
                        <label htmlFor={`${type}-${id}`}>{name}</label>
                        {
                            checkboxes.map((checkbox, checkboxIndex) => {
                                return(
                                    <Fragment key={checkboxIndex+200}>
                                        <div className="col-auto d-flex pr-0">
                                            <div className="my-auto">
                                                    <Form.Check
                                                    custom
                                                    inline
                                                    label={
                                                        <span className="font-poppins font-10 regular color-8E8E8E">{checkbox}</span>
                                                    }
                                                    type="checkbox"
                                                    name={`${type}-${id}`}
                                                    className="mr-1"
                                                    // checked={dynamicData[type+'-'+id].includes(checkbox)}
                                                    onChange={handleDynamicCheckbox}
                                                    id={checkbox}
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