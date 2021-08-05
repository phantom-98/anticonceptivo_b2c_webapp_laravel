import React, {useEffect} from 'react';

const Nested = ({children, path, setPath, list}) => {

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
        setPath(temp_path)
    }

    return(
        <select 
            className="form-control" 
            name=""
            id=""
            onChange={handleChildren}
        >
            <option value={''} disabled={true} selected={true}>Seleccione</option>
            {
                children.map(ch => {
                    return(
                        <option selected={path.find(x => x.id == ch.id)} value={ch.id}>
                            {ch.name}
                        </option>
                    )
                })
            }
        </select>
    )
}

export default Nested;