import React, {Fragment, useContext} from 'react';
import QuantityInput from "./QuantityInput";
import {CartContext} from "../../context/CartProvider";
import toastr from 'toastr';

const AddCartCard = ({quantity, setQuantity, product,subscription}) =>{

    const {addToCart} = useContext(CartContext);



    const handleAddToCart = () =>{
        addToCart(quantity, product, subscription)
        setQuantity(1)
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "1000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        toastr.info(`<div>
            <div>Producto <b>${product.name}</b> añadido al carrito</div>
        </div>`)
    }

    return (
        <div className="row">
            <div className="col-auto pr-1">

            {subscription != null
                        ? null
                        : <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
            }
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
