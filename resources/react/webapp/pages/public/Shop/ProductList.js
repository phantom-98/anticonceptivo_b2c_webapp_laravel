import React, {useState} from 'react';
import {CONFIG} from "../../../Config";
import ProductCard from "../../../components/shopping/ProductCard";
import LazyLoading from "../../../components/LazyLoading";

const ProductList = ({categorySelected, productsFiltered, name, loading}) => {

    const [viewCount, setViewCount] = useState(9);

    return (
        <div className="row">
            {
                categorySelected.public_banner_image ? 
                <div className="col-12 pb-3">
                    <img width="100%" src={categorySelected.public_banner_image} alt={CONFIG.APP_NAME}/>
                </div>
                : null
            }
            <div className="col-12 my-3 pb-3 text-primary">
                {
                    <div dangerouslySetInnerHTML={{ __html: categorySelected.description }} />
                }
            </div>
            <div className="col-12 pb-3">
                <div className="row">
                    <div className="col-6 d-flex" style={{height: '29px'}}>
                        <div className="font-poppins font-15 light text-black my-auto">{name} <span
                            className="color-D8D8D8">({productsFiltered.length ? productsFiltered.length : 0 })</span></div>
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
                        loading ? 
                            productsFiltered.length ?
                                productsFiltered.map((product, index) => {
                                    return index < parseInt(viewCount) ? 
                                    <div className="col-md-4 mb-3" key={index}>
                                        <ProductCard product={product}/>
                                    </div> : null
                                })
                            :   <div className="col-md-12 mt-5">
                                    <div className="product-no-stock-alert font-12 font-poppins">
                                        Actualmente no tenemos productos que cumplan los requisitos de búsqueda.
                                    </div>
                                </div>
                        : <LazyLoading/>
                    }
                    {/* {
                        products.map((product, index) => {
                            return index < parseInt(viewCount) ? <div className="col-md-4 mb-3" key={index}>
                                <ProductCard product={product}/>
                            </div> 
                        })
                    } */}
                </div>
            </div>

            <div className="col-12 pb-3">
                {/*PAGINATOR*/}
            </div>
        </div>
    );
};

export default ProductList
