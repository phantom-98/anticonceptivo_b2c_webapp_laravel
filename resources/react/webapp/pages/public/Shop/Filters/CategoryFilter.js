import React from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const CategoryFilter = ({subcategories, setFilters, filters, filtersUpdate, setFiltersUpdate}) => {

    const handleSubcategory = (e) => {
        let list = [...filters.subcategories];

        if (list.includes(parseInt(e.target.id))) {
            list = list.filter(x => x !== parseInt(e.target.id));   
        }else{
            list = [...list, parseInt(e.target.id)];
        }
        
        if (!list.length) {
            setFilters({
                ...filters,
                ['subcategories']: []
            });
        }else{
            setFilters({
                ...filters,
                ['subcategories']: list
            });
        }

        let count = filtersUpdate+1;
        
        setFiltersUpdate(count);
    }

    return(
        subcategories.map((category) => {
            let uuid = uuidv4();
            
            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{category.name}{/* <span className="color-D8D8D8">({category.total})</span> */}</span>}
                type="checkbox"
                name={category.name}
                checked={filters.subcategories.includes(category.id)}
                id={category.id}
                onChange={handleSubcategory}
                key={uuid}
            />
        })
    )
}

export default CategoryFilter