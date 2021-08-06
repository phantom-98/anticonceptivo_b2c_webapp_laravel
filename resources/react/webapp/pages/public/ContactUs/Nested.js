import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Nested = ({children, path, setPath, list, parent, model, setModel}) => {

    const handleChildren = (e) => {
        const found = list.find(x => x.id == e.target.value)
        var temp_path = [];
        let position = -1;
        let isNew = true
        path.every((element, index) => {

            position = element.children.findIndex(pa => pa.id == found.id);

            found['question'] = path.find(p => p.id == found.parent_id).group_title;
            found['answer'] = found.name;
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
        setPath(temp_path);
    }

    return(
        <div className="form-group">
            <label htmlFor={parent.group_title}>{parent.group_title}</label>
            <select
                className="form-control form-control-custom pl-2"
                name={`select_id_${parent.id}`}
                id={parent.group_title}
                onChange={(handleChildren)}
            >
                <option value={''} disabled={true} selected={true}>Seleccione</option>
                {
                    children.map((ch,index) => {
                        let childKey = uuidv4();
                        return(
                            <option key={childKey} selected={path.find(x => x.id == ch.id)} value={ch.id}>
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
