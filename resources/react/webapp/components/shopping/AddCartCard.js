import React, {useContext} from 'react';
import QuantityInput from "./QuantityInput";
import {CartContext} from "../../context/CartProvider";

const AddCartCard = ({quantity, setQuantity, product}) =>{

    const {addToCart} = useContext(CartContext);

    const handleAddToCart = () =>{
        addToCart(quantity, product)
        setQuantity(1)
    }

    return (
        <div className="row">
            <div className="col-auto pr-1">
                <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
            </div>
            <div className="col pl-1">
                <button className="btn btn-outline-bicolor btn-add-cart btn-block px-1" onClick={() => handleAddToCart()}>
                    <span>AGREGAR AL CARRO</span>
                </button>
            </div>
        </div>
    );
};

export default AddCartCard
