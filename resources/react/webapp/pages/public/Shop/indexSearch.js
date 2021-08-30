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

const ShopSearch = ({match}) => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [subcategories, setSubcategories] = useState([]);
    const [laboratories, setLaboratories] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [formats, setFormats] = useState([]);

    const [loading, setLoading] = useState(false);
    const [isPills, setIsPills] = useState(false);
    const [subcatNames, setSubcatNames] = useState(null);
    const [filtersUpdate, setFiltersUpdate] = useState(1);

    const defaultFilters = {
        subcategories: [],
        laboratories:[],
        isBioequivalent: null,
        subscriptions: [],
        formats: [],
        price: null
    };

    const [filters, setFilters] = useState(defaultFilters);

    useEffect(() => {
        setFilters(defaultFilters);
        getProducts(match.params.search);

    },[match.params]);

    useEffect(() => {
        if (filtersUpdate > 1) {
            getProductsFiltered();
        }
    },[filtersUpdate])

    const getProducts = (_search) => {
        let url = Services.ENDPOINT.PUBLIC_AREA.SHOP.PRODUCTS.SEARCH;

        let data = {
            search: _search,
        };

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProducts(response.data.products);
                    // setCategory(response.data.category);
                    setSubcategories(response.data.subcategories);
                    setLaboratories(response.data.laboratories);
                    setSubscriptions(response.data.subscriptions);
                    setFormats(Object.values(response.data.formats));
                    // setIsPills(response.data.is_pills);

                    // if (response.data.subcat){
                    //     setSubcatNames(response.data.subcat.name);
                    //     setFilters({
                    //         ...filters,
                    //         ['subcategories']: [response.data.subcat.id]
                    //     });
                    // }

                    // if (response.data.subcat){
                    //     setSubcatNames(response.data.subcat.name);
                    //     setFilters({
                    //         ...filters,
                    //         ['subcategories']: [response.data.subcat.id]
                    //     });
                    // }


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

    const getProductsFiltered = () => {
        // setLoading(false);
        let url = Services.ENDPOINT.NO_AUTH.SHOP.PRODUCTS_SEARCH_FILTER;
        let data = {
            search: match.params.search,
            subcats: filters.subcategories,
            labs: filters.laboratories,
            bioequivalent :filters.isBioequivalent,
            subscription :filters.subscriptions,
            format :filters.formats,
            price : filters.price,
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    console.log(response.data.products)
                    setProducts(response.data.products);
                    setLaboratories(response.data.laboratories);
                    setSubcatNames(response.data.subcat_names);
                    // setLoading(true);
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
                    loading ?
                        <div className="row pb-5 mb-5">
                            <div className="col-md-3">
                                <Filter
                                    isPills={isPills}
                                    laboratories={laboratories}
                                    subcategories={subcategories}
                                    subscriptions={subscriptions}
                                    formats={formats}
                                    filters={filters}
                                    setFilters={setFilters}
                                    filtersUpdate={filtersUpdate}
                                    setFiltersUpdate={setFiltersUpdate}
                                />
                            </div>
                            <div className="col-md-9">
                                <ProductList
                                    category={category}
                                    products={products}
                                    subcatNames={subcatNames}
                                    search={match.params.search}

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

export default ShopSearch