import React, {Fragment, useEffect, useState} from 'react';

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
import {dummy_categories, dummy_products} from "../../../helpers/productsData";
import Filter from "./Filter";
import ProductList from "./ProductList";
import Subscribe from "../../../components/sections/Subscribe";

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setProducts(dummy_products);
        setCategories(dummy_categories);
    }, [])

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.SHOP.path,
            name: PUBLIC_ROUTES.SHOP.title,
        },
    ];

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >

                <div className="row pb-5 mb-5">
                    <div className="col-3">
                        <Filter/>
                    </div>
                    <div className="col-md-9">
                        <ProductList products={products}/>
                    </div>
                </div>
            </BasePanelTwo>

            <Subscribe/>
        </Fragment>
    );
};

export default Shop
