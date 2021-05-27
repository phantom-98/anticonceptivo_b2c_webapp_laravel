import React, {useState} from 'react';
import {CONFIG} from "../../../Config";
import ProductCard from "../../../components/shopping/ProductCard";

const ProductList = ({products, categoryBanner, productsFiltered, name}) => {

    const [viewCount, setViewCount] = useState(9);

    return (
        <div className="row">
            {
                categoryBanner.public_banner_image ? 
                <div className="col-12 pb-3">
                    <img width="100%" src={categoryBanner.public_banner_image} alt={CONFIG.APP_NAME}/>
                </div>
                : null
            }
            <div className="col-12 my-3 pb-3 text-primary">
                {
                    <div dangerouslySetInnerHTML={{ __html: categoryBanner.description }} />
                }
            </div>
            <div className="col-12 pb-3">
                <div className="row">
                    <div className="col-auto d-flex" style={{height: '29px'}}>
                        <div className="font-poppins font-15 light text-black my-auto">{name} <span
                            className="color-D8D8D8">({productsFiltered.length ? productsFiltered.length : products.length })</span></div>
                    </div>
                    <div className="col">
                        <div className="row justify-content-end">
                            <div className="col-auto px-2 font-poppins font-12 semi-bold color-033F5D d-flex">
                                <div className="my-auto">
                                    Mostrar
                                </div>
                            </div>
                            <div className="col-auto px-2">
                                <select className="form-control form-control-custom w-auto select-product-list" 
                                    name=""
                                    id=""
                                    onChange={(e) => setViewCount(e.target.value)}
                                    value={viewCount}    
                                >
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
                        productsFiltered.length ?
                            productsFiltered.map((product, index) => {
                                return index < parseInt(viewCount) ? <div className="col-md-4 mb-3" key={index}>
                                    <ProductCard product={product}/>
                                </div> : null
                            })
                        :
                        products.map((product, index) => {
                            return index < parseInt(viewCount) ? <div className="col-md-4 mb-3" key={index}>
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
