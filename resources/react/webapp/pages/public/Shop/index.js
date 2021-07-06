import React, {Fragment, useEffect, useState} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import LazyLoading from "../../../components/LazyLoading";
import Filter from "./Filter";
import ProductList from "./ProductList";
import * as Services from "../../../Services";
import {propsLength} from "../../../helpers/ShopHelper";
import toastr from "toastr";

const Shop = ({match}) => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [subcategories, setSubcategories] = useState([]);
    const [laboratories, setLaboratories] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [formats, setFormats] = useState([]);

    const [loading, setLoading] = useState(false);
    const [isPills, setIsPills] = useState(false);
    const [subcatNames, setSubcatNames] = useState(null);

      useEffect(() => {
          switch (propsLength(match.params)) {
            case 1:
                getProducts(match.params.category);
                break;
            case 2:
                getProducts(match.params.category, match.params.subcategory);
                break;
            case 3:
                getProducts(match.params.category, null, match.params.type, match.params.filter);
                break;
            default:
                break;
        }
      },[match.params]);

    // const [productsFiltered, setProductsFiltered] = useState([]);

    // const [loading, setLoading] = useState(false);
    // const [subCatName, setSubCatName] = useState(null);

    // const [categorySelected, setCategorySelected] = useState({});
    // const [filtersCat, setFiltersCat] = useState([]);

    // const [subCategoriesSelected, setSubcategoriesSelected] = useState([]);

    // useEffect(() => {
    //     getData();
    // }, [])

    // useEffect(() => {
    //     if (subCategories.length) {
    //         // console.log('Match params category: ',match.params.category);
    //         // console.log('Sub categories: ',subCategories);

    //         let path = match.params.category;
    //         let subcat = subCategories.find(x => x.slug == path);

    //         setProductsFiltered([]);

    //         // console.log('path: ',path);
            
    //         if (subcat) {
    //             setSubCatName(subcat.name);
    //             setSubcategoriesSelected([subcat.id]);
    //             // console.log('subcat antes del find: ',subcat);
    //             setProductsFiltered(products.filter(product => product.subcategory_id === subcat.id))
    //             subcat = categories.find(category => category.id === subcat.category_id);
    //             // console.log('subcat después del find: ',subcat);
    //             setCategorySelected(subcat);
    //             setFiltersCat(subcat.id === 1 ? [] : subCategories.filter(x => x.category_id == subcat.id))
    //         }
    //     }
    // }, [subCategories, match])

    // useEffect(() => {
    //     let subcat = '';
    //     let iterator;
        
    //     if (subCategoriesSelected.length > 1) {
    //         subCategoriesSelected.map(subCatId => {
    //             iterator = subCategories.find(x => x.id === subCatId);
    //             subcat += iterator.name + ', ';
    //         })

    //         setSubCatName(subcat.slice(0,-2));
    //     }else{
    //         subCategoriesSelected.map(subCatId => {
    //             iterator = subCategories.find(x => x.id === subCatId);
    //             subcat += iterator.name;
    //         })

    //         setSubCatName(subcat)
    //     }
    // },[subCategoriesSelected])

    const getProducts = (_category, _subcategory = null, _type = null, _filter = null) => {
        let url = Services.ENDPOINT.PUBLIC_AREA.SHOP.PRODUCTS.CATEGORY;
        
        let data = {
            category_slug: _category,
            subcategory_slug: _subcategory,
            type: _type,
            filter: _filter
        };
        
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProducts(response.data.products);
                    setCategory(response.data.category);
                    setSubcatNames(response.data.subcat_name);
                    setSubcategories(response.data.subcategories);
                    setLaboratories(response.data.laboratories);
                    setSubscriptions(response.data.subscriptions);
                    setFormats(Object.values(response.data.formats));
                    setIsPills(response.data.is_pills);
                    setLoading(true);
                },
                error: () => {
                    toastr.error(response.message);
                },
                warning: () => {
                    toastr.warning(response.message);
                }
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
                    loading ? 
                        <div className="row pb-5 mb-5">
                            <div className="col-3">
                                <Filter
                                    isPills={isPills}
                                    laboratories={laboratories}
                                    subcategories={subcategories}
                                    subscriptions={subscriptions}
                                    formats={formats}
                                    // setLaboratories={setLaboratories}
                                    // subscriptions={subscriptions}
                                    // filtersCat={filtersCat}
                                    // setProductsFiltered={setProductsFiltered}
                                    // setLoading={setLoading}
                                    // subCategoriesSelected={subCategoriesSelected}
                                    // setSubcategoriesSelected={setSubcategoriesSelected}
                                />
                            </div>
                            <div className="col-md-9">
                                <ProductList 
                                    category={category}
                                    products={products}
                                    subcatNames={subcatNames}
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
