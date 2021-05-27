import React, {Fragment, useEffect, useState} from 'react';

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
// import {dummy_categories, dummy_products} from "../../../helpers/productsData";
import Filter from "./Filter";
import ProductList from "./ProductList";
import Subscribe from "../../../components/sections/Subscribe";
import * as Services from "../../../Services";
import LazyLoading from "../../../components/LazyLoading";

const Shop = ({match}) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [filtersCat, setFiltersCat] = useState([]);
    const [laboratories, setLaboratories] = useState([]);
    const [categoryBanner, setCategoryBanner] = useState({});
    const [name, setName] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        let path = (match.params.category).toLowerCase();
        let banner = subCategories.find(subcat => subcat.slug.toLowerCase() == path);
        
        if (banner) {
            setName(banner.name);
            setProductsFiltered(products.filter(product => product.subcategory_id === banner.id))
            banner = categories.find(category => category.id === banner.category_id);
            setCategoryBanner(banner);
            if (banner.id === 1) {
                setFiltersCat([])
            }else{
                setFiltersCat(subCategories.filter(subcat => subcat.category_id == banner.id))
            }

            
            
        }
    }, [subCategories, match])

    const getData = () => {
        let url = Services.ENDPOINT.NO_AUTH.SHOP.RESOURCES
        
        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProducts(response.data.products);
                    setCategories(response.data.categories);
                    setSubCategories(response.data.sub_categories);
                    setLaboratories(response.data.laboratories);
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
                                <Filter
                                    subCategories={subCategories}
                                    laboratories={laboratories}
                                    filtersCat={filtersCat}
                                />
                            </div>
                            <div className="col-md-9">
                                <ProductList 
                                    products={products}
                                    name={name}
                                    productsFiltered={productsFiltered}
                                    categoryBanner={categoryBanner}
                                />
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
