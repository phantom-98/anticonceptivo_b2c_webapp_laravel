import React, {useEffect} from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const LaboratoryFilter = ({laboratories, setFilters, filters, filtersUpdate, setFiltersUpdate}) => {

    useEffect(() => {
        if (filters.laboratories.length) {
            let validLabs =  laboratories.filter(lab => filters.laboratories.includes(lab.id));
            let list = [];

            validLabs.map((lab) => {
                list.push(lab.id);
            })

            setFilters({
                ...filters,
                ['laboratories']:list
            });
        }
    },[laboratories])

    const handleLaboratorySelected = (e) => {
        let list = [...filters.laboratories];
        let targetId = parseInt(e.target.id.replace('laboratory-',''));

        if (list.includes(targetId)) {
            list = list.filter(x => x !== targetId);   
        }else{
            list = [...list, targetId];
        }

        if (!list.length) {
            setFilters({
                ...filters,
                ['laboratories']: []
            });
        }else{
            setFilters({
                ...filters,
                ['laboratories']:list
            });
        }

        let count = filtersUpdate+1;
        
        setFiltersUpdate(count);
    }

    return(
        laboratories.map((laboratory) => {
            let uuid = uuidv4();
            
            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{laboratory.name}{/* <span className="color-D8D8D8">({laboratory.total})</span> */}</span>}
                type="checkbox"
                name={laboratory.name}
                checked={filters.laboratories.includes(laboratory.id)}
                id={`laboratory-${laboratory.id}`}
                onChange={(e) => handleLaboratorySelected(e)}
                key={uuid}
            />
        })
    )
}

export default LaboratoryFilter