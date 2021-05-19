import React, {Fragment, useEffect, useState} from 'react';

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
import {dummy_categories, dummy_products} from "../../../helpers/productsData";
import Filter from "./Filter";
import ProductList from "./ProductList";
import Subscribe from "../../../components/sections/Subscribe";
import * as Services from "../../../Services";
import LazyLoading from "../../../components/LazyLoading";

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getData();
        // setProducts(dummy_products);
        // setCategories(dummy_categories);
    }, [])

    const getData = () => {
        let url = Services. ENDPOINT.NO_AUTH.PRODUCTS.GET;
        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProducts(response.data.products);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

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
                {
                    products ? 
                        <div className="row pb-5 mb-5">
                            <div className="col-3">
                                <Filter/>
                            </div>
                            <div className="col-md-9">
                                <ProductList products={products}/>
                            </div>
                        </div>
                    : <LazyLoading/>
                }
                
            </BasePanelTwo>

            <Subscribe/>
        </Fragment>
    );
};

export default Shop
