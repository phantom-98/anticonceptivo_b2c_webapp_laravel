import React from 'react';
import {Form} from "react-bootstrap";

const PriceFilter = ({priceSelected, setPriceSelected, max, setMax, rangePrice, setRangePrice}) => {

    // const handleFilterList = e => {
    //     setFilterList({
    //         ...filterList,
    //         [e.target.name]: e.target.value
    //     });
    // };

    return(
        <Form.Control
            type="range"
            name="rangePrice"
            id="rangePrice"
            min="100"
            max={max}
            step="100"
            value={priceSelected}
            onChange={e => setPriceSelected(e.target.value)}
            // onMouseUp={handleFilterList}
        />
    );
}

export default PriceFilter