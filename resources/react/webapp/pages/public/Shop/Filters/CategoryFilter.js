import React from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const CategoryFilter = ({categories, subCategoriesSelected, setSubcategoriesSelected}) => {

    const handleSubCategory = (e) => {

        let list = [...subCategoriesSelected];

        if (list.includes(parseInt(e.target.id))) {
            list = list.filter(x => x !== parseInt(e.target.id));   
        }else{
            list = [...list, parseInt(e.target.id)];
        }

        if (!list.length) {
            setSubcategoriesSelected(subCategoriesSelected);   
        }else{
            setSubcategoriesSelected(list);   
        }
    }

    return(
        categories.map((category) => {
            let uuid = uuidv4();
            
            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{category.name}{/* <span className="color-D8D8D8">({category.total})</span> */}</span>}
                type="checkbox"
                name={category.name}
                checked={subCategoriesSelected.includes(category.id)}
                id={category.id}
                onChange={handleSubCategory}
                key={uuid}
            />
        })
    )
}

export default CategoryFilter