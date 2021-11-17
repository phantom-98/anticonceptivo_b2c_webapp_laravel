import React, {useState, useEffect} from 'react';
import {CONFIG} from "../../../Config";
import ProductCard from "../../../components/shopping/ProductCard";
import Pagination from "react-js-pagination";
import LazyLoading from "../../../components/LazyLoading";
import filterIcon from '../../../assets/images/icons/filter.svg'

const ProductList = ({
    category,
    products,
    subcatNames,
    filter,
    showFilter,
    subscriptions,
    filters,
    setFilters,
    updateFilter,
    filterLoading,
    search = null,
    handleProductOrderBy
}) => {

    const [viewCount, setViewCount] = useState(9);
    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(Math.ceil(products.length / viewCount));

    useEffect(() => {
        setActivePage(1);
    }, [viewCount, products])

    return (
        <div className="row">
            {search == null ?
                // <div className="col-12 pb-3">
                <div
                    className={`d-none d-md-block ${category.banner_image_size ? category.banner_image_size : 'col-12'}`}>
                    <img width="100%" src={category.public_banner_image} alt={CONFIG.APP_NAME}/>
                </div>
                : null
            }
            <div className="col-12 pb-3 pb-md-0 font-14 color-033F5D">
                {search == null ?
                    <div dangerouslySetInnerHTML={{__html: category.description}}/>
                    : null
                }
            </div>
            <div className="col-12 d-sm-none">
                <div className="row pb-3">
                    <div className="col-12 float-right">
                        <div className="filters-mobile">
                            <div className="row" style={{minHeight: '40px'}}>
                                <div className="col" style={{
                                    borderRight: '1px solid rgba(0,155,232,0.11)'
                                }} />
                                <div className="col d-flex">
                                    <div className="pointer font-poppins font-12 semi-bold color-033F5D m-auto"
                                         onClick={() => showFilter()}>
                                        <img src={filterIcon} alt="anticonceptivo.cl"/> <span className="pt-1">Filtrar</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        {filter}
                    </div>
                </div>
            </div>
            <div className="col-12 pb-3">
                <div className="row mb-3">
                    <div className="col-12 text-center">
                        {
                            subscriptions.map((subscription) => {
                                return (
                                    <div className={`btn btn-outline-primary btn-months ${filters.subscriptions.includes(subscription.id) ? 'focus' : ''} mx-1 my-2`}
                                        onClick={() => {
                                            updateFilter();
                                            if (filters.subscriptions.includes(subscription.id)) {
                                                setFilters({
                                                    ...filters,
                                                    ['subscriptions']: []
                                                });
                                            } else {
                                                setFilters({
                                                    ...filters,
                                                    ['subscriptions']: [subscription.id]
                                                });
                                            }
                                        }}
                                    >
                                        {subscription.months == 13 ? 12 : subscription.months} Meses
                                        / {subscription.months} Ciclos
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 d-flex" style={{minHeight: '29px'}}>
                        <div
                            className="font-poppins font-15 font-md-13 light text-black my-auto">{subcatNames ? subcatNames : (search == null ? category.name : search)}
                            <span
                                className="color-D8D8D8">({products.length ? products.length : 0})</span></div>
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
                                <select className="form-control form-control-custom w-auto select-product-list"
                                    id=''
                                    name=''
                                    onChange={handleProductOrderBy}
                                >
                                    <option value={1}>De A-Z</option>
                                    <option value={2}>De Z-A</option>
                                    <option value={3}>Menor a Mayor</option>
                                    <option value={4}>Mayor a Menor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 pb-3">
                <div className="row card-products-gutters">
                    {
                        !filterLoading ?
                            products.length ?
                                products.map((product, index) => {
                                    const position = index + 1;
                                    const init = activePage === 1 ? 0 : (activePage - 1) * parseInt(viewCount);
                                    const finish = init + parseInt(viewCount);
                                    return position > init && position <= finish ?
                                        <div className="col-6 col-md-6 col-lg-4 mb-3" key={index}>
                                            <ProductCard
                                                product={product}
                                                subscriptionFilter={filters.subscriptions}
                                            />
                                        </div>
                                        : null
                                })
                                : <div className="col-md-12 mt-5">
                                    <div className="product-no-stock-alert font-12 font-poppins">
                                        Actualmente no tenemos productos que cumplan los requisitos de búsqueda.
                                    </div>
                                </div>

                            : <LazyLoading/>
                    }
                </div>
            </div>

            <div className="col-12 pb-3">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={viewCount}
                    totalItemsCount={products.length}
                    pageRangeDisplayed={4}
                    pageCount={pageCount}
                    // breakLabel="..."
                    onChange={e => setActivePage(e)}
                    itemClass={'paginator-buttons'}
                    innerClass={'paginator-ul'}
                    // hideNavigation={true}
                    hideDisabled={true}
                    hideFirstLastPages={true}
                    renderOnZeroPageCount={null}
                />
                <label className="font-poppins font-12 regular paginator-label">Páginas</label>
            </div>
        </div>

    );
};

export default ProductList
