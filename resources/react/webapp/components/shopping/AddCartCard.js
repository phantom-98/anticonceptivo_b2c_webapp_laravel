import React, {Fragment, useContext} from 'react';
import QuantityInput from "./QuantityInput";
import {CartContext} from "../../context/CartProvider";
import toastr from 'toastr';

const AddCartCard = ({quantity, setQuantity, product,subscription}) =>{

    const {addToCart} = useContext(CartContext);

    const handleAddToCart = () =>{
        addToCart(quantity, product, subscription)
        setQuantity(1)

    }

    return (
        <div className="row">
            <div className="col-auto pr-1">

            {subscription != null
                        ? null
                        : <QuantityInput quantity={quantity} setQuantity={setQuantity} maxQuantity={product.subcategory.category.quantity_limit}/>
            }
            </div>

            {product.stock != 0
                ?            <div className="col pl-1">
                <button className="btn btn-outline-bicolor btn-add-cart btn-block px-1" onClick={() => handleAddToCart()}>
                    <span>AGREGAR AL CARRO</span>
                </button>
            </div>
                :
                <div className="col pl-1">
                <button disabled className="btn btn-outline-bicolor btn-add-cart btn-block px-1" >
                    <span>SIN STOCK </span>
                </button>
            </div>
            }

        </div>
    );
};

export default AddCartCard
