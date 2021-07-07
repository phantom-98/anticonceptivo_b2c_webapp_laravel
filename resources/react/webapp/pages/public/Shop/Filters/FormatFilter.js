import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const FormatFilter = ({formats, filters, setFilters, filtersUpdate, setFiltersUpdate}) => {

    const handleFormatSelected = (e) => {
        let list = [...filters.formats];
        let targetId = e.target.id.replace('format-','');

        if (list.includes(targetId)) {
            list = list.filter(x => x !== targetId);
        }else{
            list = [...list, targetId];
        }

        if (!list.length) {
            setFilters({
                ...filters,
                ['formats']: []
            });
        }else{
            setFilters({
                ...filters,
                ['formats']: list
            });
        }

        let count = filtersUpdate+1;
        setFiltersUpdate(count);
    }

    return(
        formats.map((format) => {
            let uuid = uuidv4();
            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{format}{/* <span className="color-D8D8D8">({laboratory.total})</span> */}</span>}
                type="checkbox"
                name={"format-custom-checkbox"}
                checked={filters.formats.includes(format)}
                id={`format-${format}`}
                onChange={(e) => handleFormatSelected(e)}
                key={uuid}
            />
        })
    )

}

export default FormatFilter