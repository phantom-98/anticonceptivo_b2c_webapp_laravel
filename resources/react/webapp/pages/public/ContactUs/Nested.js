import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

const Nested = ({children, path, setPath, list}) => {

    const [textFields, setTextFields] = useState([1]);

    useEffect(() => {
        if (textFields.length) {
            console.log(textFields);
        }
    }, [textFields])

    // useEffect(() => {
    //     if (test.length) {
    //         if (test.nested_field_questions.length > 0) {
    //             let div = [];
    //             test.nested_field_questions.map(q => {
    //                 div.push(<div key={`question_${q.id}`}>
    //                     <label htmlFor={q.id}>{q.name}</label>
    //                     <input type="text"
    //                         className="form-control form-control-custom"
    //                         id=""
    //                         name=""
    //                         placeholder=""
    //                     />
    //                 </div>)
    //             })
    //             setTextFields(div)
    //         }else{
    //             setTextFields(null)
    //         }
    //     }
    // },[test])

    const handleChildren = (e) => {
        const found = list.find(x => x.id == e.target.value)

        let temp_path = [];
        let position = -1;
        let isNew = true

        path.every((element, index) => {
            position = element.children.findIndex(pa => pa.id == found.id);
            temp_path.push(element);
            if (index + 1 != path.length && position != -1) {
                temp_path.push(found);
                isNew = false
            }
            return isNew
        });

        if (isNew) {
            temp_path.push(found);
        }

        if (found.nested_field_questions.length > 0) {
            setTextFields(found.nested_field_questions)
        } else {
            setTextFields([])
        }

        setPath(temp_path)
    }

    const renderInput = (q) => {
        return (<div key={`question_${q.id}`}>
            <label htmlFor={q.id}>{q.name}</label>
            <input type="text"
                   className="form-control form-control-custom"
                   id=""
                   name=""
                   placeholder=""
            />
        </div>)
    }

    return (
        <div className="form-group">
            <label htmlFor={`identificar al children seleccionado`}>?</label>
            <select
                className="form-control form-control-custom pl-2"
                name={`identificar al children seleccionado`}
                id={`identificar al children seleccionado`}
                onChange={(handleChildren)}
            >
                <option value={''} disabled={true} selected={true}>Seleccione</option>
                {
                    children.map(ch => {
                        let child = uuidv4();
                        return (
                            <option key={child} selected={path.find(x => x.id == ch.id)} value={ch.id}>
                                {ch.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Nested;
