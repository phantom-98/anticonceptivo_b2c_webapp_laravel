import React, {useContext} from 'react';
import QuantityInput from "./QuantityInput";
import {CartContext} from "../../context/CartProvider";
import {AuthContext} from "../../context/AuthProvider";
import {AppContext} from "../../context/AppProvider";
import {ModalAuthMode} from "../../Globals"
import Swal from 'sweetalert2';

const AddCartCard = ({quantity, setQuantity, product,subscription}) =>{

    const {addToCart} = useContext(CartContext);
    const {auth} = useContext(AuthContext);
    const {showModalAuth} = useContext(AppContext)

    const handleAddToCart = () =>{
        // console.log(quantity)
        // console.log(product)
        // console.log(subscription)

        if (subscription && !auth) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'col-4 ml-4 btn btn-bicolor btn-block',
                    cancelButton: "col-4 mr-4 btn btn-outline-bicolor btn-block",
                    title: 'mt-4',
                },
                buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
                title: '<span style="color: #0869A6;">Para agregar este producto debes acceder a tu cuenta</span>',
                // icon: 'warning',
                // showCancelButton: true,
                confirmButtonText: 'Acceder',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
                reverseButtons: true,
                width: '36rem',
            }).then((result) => {
                if (result.isConfirmed) {
                    showModalAuth(ModalAuthMode.LOGIN)
                }
            })
            return null;
        }

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
                    <span>SIN STOCK ONLINE </span>
                </button>
            </div>
            }

        </div>
    );
};

export default AddCartCard
