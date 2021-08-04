import React, {useEffect} from 'react';

const Nested = ({children, path, setPath, list}) => {

    const handleChildren = (e) => {
        const found = list.find(x => x.id == e.target.value)

        // grandparent = 4 = 0
        // child 1 = 1
        // child.parent_id == e.target.value ?
        // evaluar si child.parent_id esta en el path
        // index - key : slice
        // const newPath
        // setPath

        console.log('value',e.target.value);
        console.log('path',path);

        var temp_path = [];

        path.forEach((element, index) => {
            let position = element.children.findIndex(pa => pa.id == e.target.value);
            if (position != -1) {
                return index;
            }
            temp_path.push(element);
        });

        console.log('temp path:',temp_path);

        // path.forEach((element, index) => {
        //     if (index <= externalPosition) {
        //         temp_path.push(element);
        //     }
        // });

        setPath(path => [...path, found]);   
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