import React, {Fragment, useEffect, useState} from 'react';

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
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
    const [laboratories, setLaboratories] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    const [loading, setLoading] = useState(false);
    const [subCatName, setSubCatName] = useState(null);

    const [categorySelected, setCategorySelected] = useState({});
    const [filtersCat, setFiltersCat] = useState([]);

    const [subCategoriesSelected, setSubcategoriesSelected] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (subCategories.length) {
            // console.log('Match params category: ',match.params.category);
            // console.log('Sub categories: ',subCategories);

            let path = match.params.category;
            let subcat = subCategories.find(x => x.slug == path);

            setProductsFiltered([]);

            // console.log('path: ',path);
            
            if (subcat) {
                setSubCatName(subcat.name);
                setSubcategoriesSelected([subcat.id]);
                // console.log('subcat antes del find: ',subcat);
                setProductsFiltered(products.filter(product => product.subcategory_id === subcat.id))
                subcat = categories.find(category => category.id === subcat.category_id);
                // console.log('subcat después del find: ',subcat);
                setCategorySelected(subcat);
                setFiltersCat(subcat.id === 1 ? [] : subCategories.filter(x => x.category_id == subcat.id))
            }
        }
    }, [subCategories, match])

    useEffect(() => {
        let subcat = '';
        let iterator;
        
        if (subCategoriesSelected.length > 1) {
            subCategoriesSelected.map(subCatId => {
                iterator = subCategories.find(x => x.id === subCatId);
                subcat += iterator.name + ', ';
            })

            setSubCatName(subcat.slice(0,-2));
        }else{
            subCategoriesSelected.map(subCatId => {
                iterator = subCategories.find(x => x.id === subCatId);
                subcat += iterator.name;
            })

            setSubCatName(subcat)
        }
    },[subCategoriesSelected])

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
                    setSubscriptions(response.data.subscriptions);
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
                                    laboratories={laboratories}
                                    subscriptions={subscriptions}
                                    filtersCat={filtersCat}
                                    setProductsFiltered={setProductsFiltered}
                                    setLoading={setLoading}
                                    subCategoriesSelected={subCategoriesSelected}
                                    setSubcategoriesSelected={setSubcategoriesSelected}
                                />
                            </div>
                            <div className="col-md-9">
                                <ProductList 
                                    productsFiltered={productsFiltered}
                                    categorySelected={categorySelected}
                                    subCatName={subCatName}
                                    loading={loading}
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