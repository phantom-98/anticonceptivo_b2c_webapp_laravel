import React, {Fragment} from 'react';
import {setCleanInputError} from "../../../helpers/GlobalUtils";
import {v4 as uuidv4} from 'uuid';
import Nested from './Nested';
import LazyLoading from "../../../components/LazyLoading";

const DynamicPath = ({loading, model, handleParent, nestedFields, path, setPath, list, handleInputs}) => {

    return(
        <Fragment>
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
                                value={model.contact_subject_parent}
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
        </Fragment>
    )
}

export default DynamicPath;