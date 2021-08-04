import React, {useEffect} from 'react';

const Nested = ({children, path, setPath, list}) => {

    const handleChildren = (e) => {
        const found = list.find(x => x.id == e.target.value)

        // let flag = [];

        // path.forEach(parent => {
        //     const obj = {
        //         id: parent.id,
        //         parent: parent.children.find(y => y.parent_id == e.target.value) ? true : false
        //     }

        //     flag.push(obj)
        // })

        

        console.log(flag);

        setPath(path => [...path, found]);
    }

    useEffect(() => {
        if (path.length > 1) {
            console.log(path);
        }
    },[path])

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