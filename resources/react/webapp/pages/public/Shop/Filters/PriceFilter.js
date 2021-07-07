import React from 'react';
import {Form} from "react-bootstrap";

const PriceFilter = ({filters, setFilters, max, localPrice, setLocalPrice, filtersUpdate, setFiltersUpdate}) => {

    const handlePriceSelected = () => {
        setFilters({
            ...filters,
            ['price']: localPrice
        });

        let count = filtersUpdate+1;

        setFiltersUpdate(count);
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