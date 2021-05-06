import React, {useState} from 'react';
import {formatMoney} from "../../../helpers/GlobalUtils";
import AddCartCard from "../../../components/shopping/AddCartCard";

const ProductInfo = ({product}) => {

    const [quantity, setQuantity] = useState(1);

    return (
        <div className="row">
            <div className="col-md-6">
                <span className="font-poppins font-14 font-italic color-707070">
                    {product.brand.name}
                </span>
            </div>
            <div className="col-md-6 text-right">
                <span className="font-poppins font-14 color-009BE8">
                   SKU: 190081
                </span>
            </div>
            <div className="col-md-12">
                <h1 className="font-poppins font-27 bold text-black">
                    Femelle Drospirenona 3 Mg Etinilestradiol 0,03 Mg 28
                </h1>
            </div>
            <div className="col-md-12">
                <p className="font-poppins font-14 regular color-6C6B6B">
                    A plataforma web está sujeta a la reposición de los mismos en nuestros locales, en particular
                    aquella farmacia física vinculada con la compra
                </p>
            </div>
            <div className="col-md-12">
                <span className="font-poppins font-36 bold color-009BE8">
                    {formatMoney(product.price)}
                </span>
            </div>
            <div className="col-md-12 mb-3">
                <p className="font-inter font-16 bold color-033F5D">
                    Suscríbete a nuestros planes
                </p>
                <div className="row">
                    <div className="col-auto ">
                        <button className="btn btn-outline-primary btn-months">
                            4 Meses
                        </button>
                    </div>
                    <div className="col-auto px-0">
                        <button className="btn btn-outline-primary btn-months">
                            6 Meses
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-outline-primary btn-months">
                            12 Meses
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-6 mb-3">
                <AddCartCard quantity={quantity} setQuantity={setQuantity}/>
            </div>

            <div className="col-md-12">
                <div className="alert-simple-blue">
                    <div className="font-poppins font-12 regular color-033F5D">· Considera 13 productos</div>
                    <div className="font-poppins font-12 regular color-033F5D">· Se despachara 2 unidades a su domicilio</div>
                    <div className="font-poppins font-12 regular color-033F5D">· Se cobra acorde a cada despacho</div>
                </div>
            </div>

        </div>
    );
};

export default ProductInfo
