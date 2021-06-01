import React from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const LaboratoryFilter = ({laboratories, laboratoriesSelected, setLaboratoriesSelected}) => {

    const handleLaboratorySelected = (e) => {
        let list = [...laboratoriesSelected];
        let targetId = parseInt(e.target.id.replace('laboratory-',''));

        if (list.includes(targetId)) {
            list = list.filter(x => x !== targetId);   
        }else{
            list = [...list, targetId];
        }

        setLaboratoriesSelected(list);
    }

    return(
        laboratories.map((laboratory) => {
            let uuid = uuidv4();
            let laboratoryId = laboratory.id;
            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{laboratory.name}{/* <span className="color-D8D8D8">({laboratory.total})</span> */}</span>}
                type="checkbox"
                name={laboratory.name}
                checked={laboratoriesSelected.includes(laboratoryId)}
                id={`laboratory-${laboratory.id}`}
                onChange={(e) => handleLaboratorySelected(e)}
                key={uuid}
            />
        })
    )
}

export default LaboratoryFilter