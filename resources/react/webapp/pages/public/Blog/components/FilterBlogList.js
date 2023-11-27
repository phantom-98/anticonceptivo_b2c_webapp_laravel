import React from 'react';

const FilterBlogList = () =>{
    return (
        <div className="my-auto">
            <div className="row justify-content-end">
                <div className="col-auto px-2 font-poppins font-12 semi-bold color-033F5D d-flex">
                    <div className="my-auto">
                        Mostrar
                    </div>
                </div>
                <div className="col-auto px-2">
                    <select className="form-control form-control-custom w-auto select-product-list"
                            name=""
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
                    <select className="form-control form-control-custom w-auto select-product-list"
                            name=""
                            id="">
                        <option value="9">Popular</option>
                        <option value="12">Menor a Mayor</option>
                        <option value="21">Mayor a Menor</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBlogList
