import React from 'react';
import {CONFIG} from "../../../Config";
import ProductCard from "../../../components/shopping/ProductCard";

const ProductList = ({products}) => {
    return (
        <div className="row">
            <div className="col-12 pb-3">
                <img width="100%" src="/themes/web/products/category.png" alt={CONFIG.APP_NAME}/>
            </div>
            <div className="col-12 pb-3">
                <div className="row">
                    <div className="col-auto d-flex" style={{height: '29px'}}>
                        <div className="font-poppins font-15 light text-black my-auto">Pastillas <span
                            className="color-D8D8D8">(133)</span></div>
                    </div>
                    <div className="col">
                        <div className="row justify-content-end">
                            <div className="col-auto px-2 font-poppins font-12 semi-bold color-033F5D d-flex">
                                <div className="my-auto">
                                    Mostrar
                                </div>
                            </div>
                            <div className="col-auto px-2">
                                <select className="form-control form-control-custom w-auto select-product-list" name=""
                                        id="">
                                    <option value="9">9</option>
                                    <option value="12">12</option>
                                    <option value="21">21</option>
                                    <option value="42">42</option>
                                </select>
                            </div>
                            <div className="col-auto px-2 font-poppins font-12 semi-bold color-033F5D d-flex">
                                <div className="my-auto">
                                    Ordenar por
                                </div>
                            </div>
                            <div className="col-auto pl-2">
                                <select className="form-control form-control-custom w-auto select-product-list" name=""
                                        id="">
                                    <option value="9">Popular</option>
                                    <option value="12">Menor a Mayor</option>
                                    <option value="21">Mayor a Menor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 pb-3">
                <div className="row">
                    {
                        products.map((product, index) => {
                            return index < 9 ? <div className="col-md-4 mb-3">
                                <ProductCard product={product}/>
                            </div> : null
                        })
                    }
                </div>
            </div>

            <div className="col-12 pb-3">
                {/*PAGINATOR*/}
            </div>
        </div>
    );
};

export default ProductList
