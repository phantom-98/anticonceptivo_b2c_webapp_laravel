import React, {useState, useEffect} from 'react';
import {CONFIG} from "../../../Config";
import ProductCard from "../../../components/shopping/ProductCard";
import Pagination from "react-js-pagination";
import LazyLoading from "../../../components/LazyLoading";
import filterIcon from '../../../assets/images/icons/filter.svg';
import arrowIcon from '../../../assets/images/icons/arrow-up-and-down.svg';
import {Card, Form} from "react-bootstrap";
import {v4 as uuid} from 'uuid';

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
    const [showOrderByMobile, setShowOrderByMobile] = useState(false);

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
                                <div className="col d-flex" style={{
                                    borderRight: '0.1px solid rgba(0,155,232,0.11)'
                                }}>
                                    <div className="pointer font-poppins font-12 semi-bold color-033F5D m-auto"
                                         onClick={() => setShowOrderByMobile(showOrderByMobile == true ? false : true)}>
                                        <img src={arrowIcon} alt="anticonceptivo.cl"/> <span
                                        className="pt-1">Ordenar</span>
                                    </div>
                                </div>
                                <div className="col d-flex" style={{
                                    borderLeft: '0.1px solid rgba(0,155,232,0.11)'
                                }}>
                                    <div className="pointer font-poppins font-12 semi-bold color-033F5D m-auto"
                                         onClick={() => showFilter()}>
                                        <img src={filterIcon} alt="anticonceptivo.cl"/> <span
                                        className="pt-1">Filtrar</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {
                        showOrderByMobile ?
                            <div className="col-12 mt-2">
                                <Card className="card-filter">
                                    <Card.Body bsPrefix="card-body">
                                        <div className="order-list">
                                            <Form.Check
                                                custom
                                                label="Nombre: A-Z"
                                                type="radio"
                                                className="font-12"
                                                name="radio_orders"
                                                id="name_asc"
                                                onClick={() => handleProductOrderBy(1)}
                                            />
                                            <Form.Check
                                                custom
                                                label="Nombre: Z-A"
                                                type="radio"
                                                className="font-12"
                                                name="radio_orders"
                                                id="name_desc"
                                                onClick={() => handleProductOrderBy(2)}
                                            />
                                            <Form.Check
                                                custom
                                                label="Precio: Menor A Mayor"
                                                type="radio"
                                                className="font-12"
                                                name="radio_orders"
                                                id="price_asc"
                                                onClick={() => handleProductOrderBy(3)}
                                            />
                                            <Form.Check
                                                custom
                                                label="Precio: Mayor A Menor"
                                                type="radio"
                                                className="font-12"
                                                name="radio_orders"
                                                id="price_desc"
                                                onClick={() => handleProductOrderBy(4)}
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                            : null
                    }
                    <div className="col-12">
                        {filter}
                    </div>
                </div>
            </div>
            <div className="col-12 pb-3">
                <div className="row">
                    <div className="col-12">
                        <h3 className="font-14 bold color-033F5D subscription-title">Selecciona una opción de
                            suscripción</h3>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 subscription-buttons subscription-content">
                        {
                            subscriptions.map((subscription) => {
                                return (
                                    <div
                                        key={uuid()}
                                        className={`btn btn-outline-primary btn-months mr-2 subscription-button-margin ${filters.subscriptions.includes(subscription.id) ? 'focus' : ''} `}
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
                                        {subscription.cicles} Meses / {subscription.months} Ciclos
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
                            <div
                                className="col-auto px-2 font-poppins font-12 semi-bold color-033F5D d-flex responsive-d-none">
                                <div className="my-auto">
                                    Ordenar por
                                </div>
                            </div>
                            <div className="col-auto pl-2 responsive-d-none">
                                <select className="form-control form-control-custom w-auto select-product-list"
                                        id=''
                                        name=''
                                        onChange={handleProductOrderBy}
                                >
                                    <option value={1}>Nombre: A-Z</option>
                                    <option value={2}>Nombre: Z-A</option>
                                    <option value={3}>Precio: Menor A Mayor</option>
                                    <option value={4}>Precio: Mayor A Menor</option>
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
                                        <div key={uuid()} className="col-6 col-md-6 col-lg-4 mb-3">
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
                {products.length ?
                    <label className="font-poppins font-12 regular paginator-label">Páginas</label> : null}
            </div>
        </div>

    );
};

export default ProductList
