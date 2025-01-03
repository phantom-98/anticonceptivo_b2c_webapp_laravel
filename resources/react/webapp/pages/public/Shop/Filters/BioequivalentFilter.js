import React, {Fragment} from 'react';
import {Form} from "react-bootstrap";

const BioequivalentFilter = ({filters, setFilters, filtersUpdate, setFiltersUpdate}) => {
    

    const handleBioequivalentSelected = (e) => {
        let targetId = parseInt(e.target.id.charAt(e.target.id.length - 1));

        if (targetId == filters.isBioequivalent) {
            setFilters({
                ...filters,
                ['isBioequivalent']: null
            });
        }else{
            setFilters({
                ...filters,
                ['isBioequivalent']: targetId
            });
        }
        let count = filtersUpdate+1;
        setFiltersUpdate(count);
    }

    return(
        <Fragment>
            <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">Si{/* <span className="color-D8D8D8">({laboratory.total})</span> */}</span>}
                type="checkbox"
                name="custom-bioequivalent-chekcbox"
                checked={filters.isBioequivalent === 1 ? true : false}
                id={"bioequivalent-1"}
                onChange={(e) => handleBioequivalentSelected(e)}
            />
            <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">No{/* <span className="color-D8D8D8">({laboratory.total})</span> */}</span>}
                type="checkbox"
                name="custom-bioequivalent-chekcbox"
                checked={filters.isBioequivalent === 0 ? true : false}
                id={"bioequivalent-0"}
                onChange={(e) => handleBioequivalentSelected(e)}
            />
        </Fragment>
    );

}

export default BioequivalentFilter