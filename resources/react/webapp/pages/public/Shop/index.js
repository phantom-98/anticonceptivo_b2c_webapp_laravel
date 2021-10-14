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
    const [unitFormat, setUnitFormat] = useState('');
    const [showFilterResponsive, setShowFilterResponsive] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isPills, setIsPills] = useState(false);
    const [subcatNames, setSubcatNames] = useState(null);
    const [filtersUpdate, setFiltersUpdate] = useState(1);
    const [filterLoading, setFilterLoading] = useState(false);

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

    useEffect(() => {
        if (filtersUpdate > 1) {
            getProductsFiltered();
        }
    },[filtersUpdate])

    const getProducts = (_category, _subcategory = null, _type = null, _filter = null) => {
        let url = Services.ENDPOINT.PUBLIC_AREA.SHOP.PRODUCTS.CATEGORY;

        let data = {
            category_slug: _category,
            subcategory_slug: _subcategory,
            type: _type,
            filter: _filter,
            filters: filters
        };

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProducts(response.data.products);
                    setCategory(response.data.category);
                    setSubcategories(response.data.subcategories);
                    setLaboratories(response.data.laboratories);
                    setSubscriptions(response.data.subscriptions);
                    setFormats(Object.values(response.data.formats));
                    setIsPills(response.data.is_pills);
                    setUnitFormat(response.data.unit_format)

                    if (response.data.subcat){
                        setSubcatNames(response.data.subcat.name);
                        setFilters({
                            ...filters,
                            ['subcategories']: [response.data.subcat.id]
                        });
                    }

                    if (response.data.subcat){
                        setSubcatNames(response.data.subcat.name);
                        setFilters({
                            ...filters,
                            ['subcategories']: [response.data.subcat.id]
                        });
                    }

                    switch (_type) {
                        case 'laboratorio':
                            setFilters({
                                ...defaultFilters,
                                ['laboratories']: [response.data.filter]
                            });
                            break;
                        case 'suscripcion':
                            setFilters({
                                ...defaultFilters,
                                ['subscriptions']: [response.data.filter]
                            });
                            break;
                        case 'formato':
                            setFilters({
                                ...defaultFilters,
                                ['formats']: [response.data.filter]
                            });
                            break;
                        default:
                            break;
                    }

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
        setFilterLoading(true);
        let url = Services.ENDPOINT.NO_AUTH.SHOP.PRODUCTS_FILTERED;
        let data = {
            category_slug: match.params.category,
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
                    setProducts(response.data.products);
                    setLaboratories(response.data.laboratories);
                    setSubcatNames(response.data.subcat_names);
                    setFilterLoading(false);
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

    const showFilter = () => {
        // document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0;
        if(showFilterResponsive){
            setShowFilterResponsive(false)
        }else{
            setShowFilterResponsive(true)
        }
    }

    const updateFilter = () => {
        let count = filtersUpdate+1;

        setFiltersUpdate(count);
    }

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >
                {
                    loading ?
                        <div className="row pb-5 mb-5">
                            <div className="col-auto" style={{ minWidth : '230px'}}>
                                <div className='mb-3 d-block d-sm-none'>
                                    {/*<button className="btn btn-outline-bicolor w-50 px-1" onClick={() => handleAddToCart()}>*/}

                                    {/*</button>*/}
                                </div>


                                <div className="d-none d-md-block d-md-block">
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
                                        unitFormat={unitFormat}
                                    />
                                </div>
                            </div>
                            <div className="col-md">
                                <ProductList
                                    category={category}
                                    products={products}
                                    subcatNames={subcatNames}
                                    subscriptions={subscriptions}
                                    filters={filters}
                                    setFilters={setFilters}
                                    updateFilter={updateFilter}
                                    filterLoading={filterLoading}
                                    filter={<div className="d-block d-sm-none" style={{marginTop: '10px'}}>
                                        { showFilterResponsive ?
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
                                                unitFormat={unitFormat}
                                            /> : null
                                        }
                                    </div>}
                                    showFilter={showFilter}
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
