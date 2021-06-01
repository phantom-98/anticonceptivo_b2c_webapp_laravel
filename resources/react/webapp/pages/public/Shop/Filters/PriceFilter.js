import React, {useState} from 'react';
import {Form} from "react-bootstrap";

const PriceFilter = ({priceSelected, setPriceSelected, max, localPrice, setLocalPrice}) => {

    // const handleFilterList = e => {
    //     setFilterList({
    //         ...filterList,
    //         [e.target.name]: e.target.value
    //     });
    // };

    const handlePriceSelected = () => {
        setPriceSelected(localPrice);
    }

    return(
        <Form.Control
            type="range"
            name="rangePrice"
            id="rangePrice"
            min="100"
            max={max}
            step="100"
            value={localPrice}
            onChange={e => setLocalPrice(e.target.value)}
            onMouseUp={handlePriceSelected}
        />
    );
}

export default PriceFilter