import React from 'react';
import QuantityInput from "./QuantityInput";

const AddCartCard = ({quantity, setQuantity}) =>{

    return (
        <div className="row">
            <div className="col-auto pr-1">
                <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
            </div>
            <div className="col pl-1">
                <button className="btn btn-outline-bicolor btn-add-cart btn-block px-1">
                    <span>AGREGAR AL CARRO</span>
                </button>
            </div>
        </div>
    );
};

export default AddCartCard
