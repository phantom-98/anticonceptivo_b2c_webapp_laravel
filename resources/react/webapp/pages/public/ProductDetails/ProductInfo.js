import React, {useState} from 'react';
import {formatMoney} from "../../../helpers/GlobalUtils";
import AddCartCard from "../../../components/shopping/AddCartCard";
import Icon from "../../../components/general/Icon";
import fileSvg from '../../../assets/images/icons/file-alt-regular.svg';

const ProductInfo = ({product}) => {

    const [quantity, setQuantity] = useState(1);


    return (
        <div className="row">
            <div className="col-md-6">
                <span className="font-poppins font-14 font-italic color-707070">
                    {product.laboratory.name}
                </span>
            </div>
            <div className="col-md-6 text-right">
                <span className="font-poppins font-14 color-009BE8">
                   SKU: {product.sku}
                </span>
            </div>            
            <div className="col-md-12">
                <h1 className="font-poppins font-27 bold text-black">
                    {product.name}
                </h1>
            </div>
            <div className="col-md-12">
                <p className="font-poppins font-14 regular color-6C6B6B">
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </p>
            </div>
            <div className="col-md-12">
                <h1 className="font-poppins font-12 regular color-6C6B6B">
                    <div dangerouslySetInnerHTML={{ __html: product.compound }} />
                </h1>
            </div>
            <div className="col-md-12">
                <span className="font-poppins font-36 bold color-009BE8">
                    {formatMoney(product.price)}
                </span>
            </div>

            <div className="col-md-12">
                <h1 className="font-poppins font-12 regular color-6C6B6B">
                    {product.consumption_typology}
                </h1>
            </div>
            {/* <div className="col-md-12 mb-3">
                <p className="font-inter font-16 bold color-033F5D">
                    Suscríbete a nuestros planes
                </p>
                <div className="row">
                    {
                        product.plans.map(plan => {
                            return(
                                <div className="col-auto ">
                                    <button className="btn btn-outline-primary btn-months">
                                       { plan.subscription_plan.months } Meses
                                    </button>
                                </div>
                            )
                        })
                    } */}
                    {/* <div className="col-auto ">
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
                    </div> */}
                {/* </div>
            </div> */}

            <div className="col-md-6 mb-3">
                <AddCartCard quantity={quantity} setQuantity={setQuantity} product={product}/>
            </div>
            <div className="offset-md-1 mb-3"/>
            {
                product.unit_format ? 
                <div className="col-md-12 py-2 product-format-style">
                    <span className="font-poppins font-14 regular color-6C6B6B">
                        Precio por unidad: ${
                            product.state_of_matter === 'Líquido' ? 
                                Math.round(product.price/(parseInt(product.format)*100)*100)/100 +' '+product.unit_format  
                            : 
                                Math.round(product.price/parseInt(product.format)) +' '+product.unit_format}
                    </span>
                </div>
                : null
            }

            <div className="col-md-12 mt-3">
                <h1 className="font-poppins font-12 regular color-6C6B6B">
                    <Icon className="icon-document" path={fileSvg}/> {product.recipe_type ? product.recipe_type : 'Venta Directa'}
                </h1>
            </div>

            {/* <div className="col-md-12">
                <div className="alert-simple-blue">
                    <div className="font-poppins font-12 regular color-033F5D">· Considera 13 productos</div>
                    <div className="font-poppins font-12 regular color-033F5D">· Se despachara 2 unidades a su domicilio</div>
                    <div className="font-poppins font-12 regular color-033F5D">· Se cobra acorde a cada despacho</div>
                </div>
            </div> */}

        </div>
    );
};

export default ProductInfo
