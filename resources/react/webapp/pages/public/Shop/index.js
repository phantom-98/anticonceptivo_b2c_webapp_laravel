import React, {Fragment, useEffect, useState} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import LazyLoading from "../../../components/LazyLoading";
import Filter from "./Filter";
import ProductList from "./ProductList";
import * as Services from "../../../Services";
import {propsLength} from "../../../helpers/ShopHelper";
import toastr from "toastr";
import {capitalizeFirstLetterOfEachWord} from "../../../helpers/GlobalUtils";
import {CONFIG} from "../../../Config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AccordionComponent from '../../../components/general/AccordionComponent'


const Shop = ({match}) => {
    const [slug, setSlug] = useState("");
    const [products, setProducts] = useState([]);
    const [textImmediate, setTextImmediate] = useState([]);
    const [subTextImmediate, setSubTextImmediate] = useState([]);
    const [category, setCategory] = useState({});
    const [subcategory, setSubCategory] = useState({});
    const [subcategories, setSubcategories] = useState([]);
    const [laboratories, setLaboratories] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [formats, setFormats] = useState([]);
    const [unitFormat, setUnitFormat] = useState('');
    const [showFilterResponsive, setShowFilterResponsive] = useState(false);
    const [productOrderBy, setProductOrderBy] = useState(1);
    const [page , setPage]= useState(1);
    const [totalProd, setTotalProducts] = useState(0)

    const [loading, setLoading] = useState(false);
    const [isPills, setIsPills] = useState(false);
    const [subcatNames, setSubcatNames] = useState(null);
    const [filtersUpdate, setFiltersUpdate] = useState(1);
    const [filterLoading, setFilterLoading] = useState(false);

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    console.log()

    const defaultFilters = {
        subcategories: [],
        laboratories: [],
        isBioequivalent: null,
        subscriptions: [],
        formats: [],
        price: null,
        immediate: false
    };

    const [filters, setFilters] = useState(defaultFilters);
    useEffect(() => {
        console.log(match.params)
        setFilters(defaultFilters);
        switch (propsLength(match.params)) {
            case 1:
                getProducts(match.params.category);
                setSlug(match.params.category)
                break;
            case 2:
                getProducts(match.params.category, match.params.subcategory);
                setSlug(match.params.subcategory)
                getSubCategoryInfo(match.params.subcategory)
                break;
            case 3:
                getProducts(match.params.category, null, match.params.type, match.params.filter);
                setSlug(match.params.filter)
                getSubCategoryInfo(match.params.filter)
                break;
                default:
                    break;
                }
    }, [match.params]);
            
            useEffect(() => {
                if (filtersUpdate > 1) {
                    getProductsFiltered();
                }
            }, [filtersUpdate])
            
            const getSubCategoryInfo = (slug) => {

                let url = Services.ENDPOINT.PUBLIC_AREA.SHOP.INFO.SUBCATEGORY;
                
                Services.DoGet(`${url}/${slug}`).then(response => {
                    Services.Response({
                        response: response,
                        success: () => {
                            setSubCategory(response.data.subcategory)
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

    const getProducts = (_category, _subcategory = null, _type = null, _filter = null) => {
        let url = Services.ENDPOINT.PUBLIC_AREA.SHOP.PRODUCTS.CATEGORY;

        let data = {
            category_slug: _category,
            subcategory_slug: _subcategory,
            type: _type,
            filter: _filter,
            filters: filters,
            page: params.page
        };
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setTotalProducts(response.data.productCount);
                    setProducts(response.data.products);
                    setTextImmediate(response.data.immediate);
                    setSubTextImmediate(response.data.sub_inmediate);
                    setCategory(response.data.category);
                    setSubcategories(response.data.subcategories);
                    setLaboratories(response.data.laboratories);
                    setSubscriptions(response.data.subscriptions);
                    setFormats(Object.values(response.data.formats));
                    setIsPills(response.data.is_pills);
                    setUnitFormat(response.data.unit_format) 

                    if (response.data.subcat) {
                        setSubcatNames(response.data.subcat.name);
                        
                        setFilters({
                            ...filters,
                            ['subcategories']: [response.data.subcat.id]
                        });
                    } 

                    // if (response.data.subcat){
                    //     setSubcatNames(response.data.subcat.name);
                    //     setFilters({
                    //         ...filters,
                    //         ['subcategories']: [response.data.subcat.id]
                    //     });
                    // }

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
            bioequivalent: filters.isBioequivalent,
            subscription: filters.subscriptions,
            format: filters.formats,
            price: filters.price,
            is_immediate: filters.immediate,
        }
        Services.DoPost(url, data).then(response => {
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
            name: category.name,
            slug: category.slug

        },
    ];

    const showFilter = () => {
        if (showFilterResponsive) {
            setShowFilterResponsive(false)
        } else {
            setShowFilterResponsive(true)
        }
    }

    const updateFilter = () => {
        let count = filtersUpdate + 1;

        setFiltersUpdate(count);
    }

    const handleProductOrderBy = (e) => {
        let _value = e.target ? parseInt(e.target.value) : e
        setProductOrderBy(_value);

        let _products = [...products];

        switch (_value) {
            case 1:
                sortByNameAsc(_products);
                break;
            case 2:
                sortByNameDesc(_products);
                break;
            case 3:
                sortByPriceAsc(_products);
                break;
            case 4:
                sortByPriceDesc(_products);
                break;

            default:
                break;
        }

        setProducts(_products);
    }

    const sortByNameAsc = (items) => {
        items.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    }

    const sortByNameDesc = (items) => {
        items.sort((a, b) => {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        });
    }

    const sortByPriceAsc = (items) => {
        items.sort((a, b) => {
            if ((a.is_offer == 0 ? a.price : a.offer_price) > (b.is_offer == 0 ? b.price : b.offer_price)) {
                return 1;
            }
            if ((a.is_offer == 0 ? a.price : a.offer_price) < (b.is_offer == 0 ? b.price : b.offer_price)) {
                return -1;
            }
            return 0;
        });
    }

    const sortByPriceDesc = (items) => {
        items.sort((a, b) => {
            if ((a.is_offer == 0 ? a.price : a.offer_price) < (b.is_offer == 0 ? b.price : b.offer_price)) {
                return 1;
            }
            if ((a.is_offer == 0 ? a.price : a.offer_price) > (b.is_offer == 0 ? b.price : b.offer_price)) {
                return -1;
            }
            return 0;
        });
    }

    const handleImmediate = (value) => {
        setFilters({
            ...filters,
            immediate: value
        });
        if (value) {
            const _products = products.filter(p => p.is_immediate == value);
            setProducts(_products)
        } else {
            getProductsFiltered();
        }
    }

    if(subcategory && subcategory.banner_image_responsive){
        category.public_banner_image_responsive = subcategory.banner_image_responsive
    }
    const handlePaginateClick =(pagina)=>{
        const paginadata = pagina
        setPage(paginadata)
        getProducts()
    }
    

    return (
        <Fragment>
            <BasePanelTwo
                classContainer="mobile-shop"
                breadcrumbs={breadcrumbs}
                prepend={loading ?
                    <div
                        className={`d-md-none d-block px-0 ${category.banner_image_size ? category.banner_image_size : 'w-100'}`}>
                        <LazyLoadImage
                            alt={CONFIG.APP_NAME}
                            title="Anticonceptivo"
                            rel="nofollow"
                            width={'100%'}
                            effect="blur"
                            src={category.public_banner_image_responsive}
                        />
                    </div>
                    : null
                }
            >
                {
                    loading ?
                        <div className="row pb-5 mb-5">
                            <div className="col-auto" style={{minWidth: '230px'}}>
                                <div className='d-block d-sm-none'>
                                    {/*<button className="btn btn-outline-bicolor w-50 px-1" onClick={() => handleAddToCart()}>*/}

                                    {/*</button>*/}
                                </div>


                                <div className="d-none d-md-block">
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
                                        immediate={filters.immediate}
                                        textImmediate={textImmediate}
                                        setImmediate={handleImmediate}
                                        subTextImmediate={subTextImmediate}
                                    />
                                </div>
                            </div>
                            <div className="col-md">
                                <ProductList
                                    totalItem={totalProd}
                                    page={params.page}
                                    subcategory={subcategory}
                                    category={category}
                                    products={products}
                                    subcatNames={subcatNames}
                                    subscriptions={subscriptions}
                                    filters={filters}
                                    setFilters={setFilters}
                                    updateFilter={updateFilter}
                                    filterLoading={filterLoading}
                                    handleProductOrderBy={handleProductOrderBy}
                                    filter={<div className="d-block d-sm-none" style={{marginTop: '10px'}}>
                                        {showFilterResponsive ?
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
                                                immediate={filters.immediate}
                                                textImmediate={textImmediate}
                                                subTextImmediate={subTextImmediate}
                                                setImmediate={handleImmediate}
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
            
            <AccordionComponent path={slug} />
            <Subscribe/>
        </Fragment>
    );
};

export default Shop
