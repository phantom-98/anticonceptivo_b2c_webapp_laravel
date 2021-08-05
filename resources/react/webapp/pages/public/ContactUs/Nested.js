import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

const Nested = ({children, path, setPath, list,parent}) => {

    const [inputs, setInputs] = useState([]);
    const [test, setTest] = useState([]);

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
    //             setInputs(div)
    //         }else{
    //             setInputs(null)
    //         }
    //     }
    // },[test])

    const handleChildren = (e) => {
        const found = list.find(x => x.id == e.target.value)
        var temp_path = [];
        let position = -1;
        let isNew = true
        path.every((element, index) => {
            position = element.children.findIndex(pa => pa.id == found.id);
            temp_path.push(element);
            if(index + 1 != path.length && position != -1 ){
                temp_path.push(found);
                isNew = false
                return isNew
            }
            return isNew
        });
        if(isNew){
            temp_path.push(found);
        }
        // if (found.nested_field_questions.length > 0) {
        //     setInputs(found.nested_field_questions)
        // }else{
        //     setInputs(null)
        // }

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
 
    return(
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
                    children.map((ch,index) => {
                        let child = uuidv4();
                        return( 
                            <option key={child} selected={path.find(x => x.id == ch.id)} value={ch.id}>
                                {ch.name}
                            </option>
                        )
                    })
                }
            </select>
            
            {
                
                parent.nested_field_questions.map((element,index) => {
                    console.log(element)
                    let elementKey = uuidv4();
                        return( 
                            <input type="text" class="form-control" value={element.name}></input>
                        )
                    // console.log(ch)
                    // ch.nested_field_questions && ch.nested_field_questions.length ? 
                    // ch.nested_field_questions.map((ch2,index) => {
                    //     console.log(ch2)
                    //     let child = uuidv4();
                    //     return( 
                    //         <input key={child} value={ch2.id}>
                    //             {ch2.name}
                    //         </input>
                    //     )
                    // })
                    // : null
                })


            }
        </div>
    )
}

export default Nested;