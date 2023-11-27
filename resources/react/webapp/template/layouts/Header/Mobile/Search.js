import React, {useEffect, useState, Fragment, useRef} from 'react';
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import {Link} from "react-router-dom";
import * as Services from "../../../../Services";
import {CONFIG} from "../../../../Config";
import {formatMoney} from "../../../../helpers/GlobalUtils";
import searchWhiteThin from "../../../../assets/images/icons/header/search-white-thin.svg"
import closeIcon from "../../../../assets/images/icons/header/close-modal.svg"
import Icon from "../../../../components/general/Icon";
import noImage from "../../../../assets/images/producto-default.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Search = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const refInputSearch = useRef(null);
    const [isVisibilityDropdownSearch, setIsVisibilityDropdownSearch] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (refInputSearch.current && !refInputSearch.current.contains(event.target)) {
                setIsVisibilityDropdownSearch(false);
            } else {
                setIsVisibilityDropdownSearch(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refInputSearch]);

    useEffect(() => {
        const timer = setTimeout(() => setSearch(debouncedSearch), 1000);
        return () => clearTimeout(timer);
    }, [debouncedSearch])

    useEffect(() => {
        if(search !== ''){
            setIsLoading(true);
            getProducts();
        }
        else{
            clearResults();
        }
    }, [search]);

    const clearResults = () => setProducts([]);

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            getSearch()
        }
    }

    const getSearch = (e) => {
        if(search.trim() != ''){
            let url = PUBLIC_ROUTES.SHOP_SEARCH.path;
            url = url.replace(":search", search);
            setIsVisibilityDropdownSearch(false);
            if(products.length == 1){
                window.location.href = (PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', products[0].slug);
            }else{
                window.location.href = url;

            }
        }

    }

    const getProducts = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER_BOX;
        let data = {
            search: search,
        }

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProducts(response.data.products);
                    setIsLoading(false);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const bordersStyle = {
        borderTop: '1px solid #D6D6D6',
        borderBottom: '1px solid #D6D6D6'
    }

    const clearText = () => {
        setSearch('');
        setDebouncedSearch('');
        clearResults();
    }

    const divClearTextStyle = {
        display: 'flex',
        alignItems: 'center',
        marginRight: '15px',
    }

    return(
        <div className="col px-0 top-do-flex" style={bordersStyle}>
            <div className="input-group search-filter-button-mobile search-top-mobile">
                <input type="text"
                    className="form-control form-control-mobile-search"
                    placeholder="¿Qué estás buscando?"
                    value={debouncedSearch}
                    onChange={e => setDebouncedSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                {
                    search.length > 0 && search.trim() != '' && (
                        <div onClick={clearText} style={divClearTextStyle}>
                            <Icon
                                path={closeIcon}
                                style={{
                                    width: '15px',
                                    height: '15px',
                                }}
                            />
                        </div>
                    )
                }
                <div className="input-group-append">
                <button
                        onClick={() => getSearch()}
                        type="button"
                        className="btn btn-bicolor">
                        <span className="px-3"><Icon path={searchWhiteThin}/></span>
                    </button>
                </div>
            </div>
            {
                search.length ?
                <div className="search-mobile">
                    <div className='search-mobile-child'>
                        {
                            isLoading ?
                                <div className="d-flex justify-content-center font-poppins italic font-11 color-707070" style={{marginTop:25}}>
                                    Cargando...
                                </div>
                            :

                            search.length && isVisibilityDropdownSearch && products.length > 0  ?
                                products.map((product, index) => {
                                    return (
                                        <Fragment>

                                                <Link onClick={clearText} to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)} style={{textDecoration: 'none', color: '#000000'}}>
                                                    <div className="row mt-2 px-0">
                                                        <div className="col-3 text-center" style={{alignSelf: 'center'}}>
                                                            <LazyLoadImage
                                                                alt={`${CONFIG.APP_NAME} - ${product.name}`}
                                                                width={45}
                                                                height={45}
                                                                effect="blur"
                                                                src={product.images.length ? product.images[0].public_file : noImage}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="row">
                                                                <div className="col-12" style={{alignSelf: 'center'}}>
                                                                    <span className="d-block font-poppins italic font-11 color-707070">{product.laboratory.name}</span>
                                                                    <span className="font-poppins bold font-14">{product.name}</span>
                                                                </div>
                                                                {/* <div className="col-12" style={{alignSelf: 'center'}}>
                                                                    <span className="font-14 font-poppins bold" style={{color: '#009BE8'}}>
                                                                        {formatMoney(product.is_offer ? product.offer_price : product.price)}
                                                                    </span>
                                                                </div> */}
                                                                <div className='col-12'>
                                                                    {
                                                                        product.is_offer ? (
                                                                            <>
                                                                                <span className="font-14 font-poppins bold" style={{color: '#009BE8'}}>
                                                                                    {formatMoney(product.offer_price)}
                                                                                    <span className="badge badge-pill ml-1 font-10" style={{
                                                                                        backgroundColor:'#00dbae29',
                                                                                        color: '#00a785'
                                                                                        }}>Oferta</span>
                                                                                </span>
                                                                                <span className="ml-2 font-12 font-poppins color-707070" style={{color: '#009BE8'}}>
                                                                                <del>{formatMoney(product.price)} (Normal)</del>
                                                                                </span>
                                                                            </>
                                                                        ) :
                                                                        (
                                                                            <span className="font-14 font-poppins bold" style={{color: '#009BE8'}}>
                                                                                {formatMoney(product.price)}
                                                                            </span>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                {
                                                    products.length !== index+1 ?
                                                    <hr/>
                                                    : null
                                                }
                                        </Fragment>
                                    );
                                })
                            : <span className="d-flex justify-content-center font-poppins italic font-11 color-707070" style={{marginTop:25}}>¿No encontraste lo que buscabas?, Nosotros te asesoramos <a href="https://wa.me/56987380541" target="_BLANK" style={{textDecoration:'underline',display: 'contents'}}>aquí.</a></span>
                        }
                    </div>
                </div>
                : null
            }
        </div>
    );
}

export default Search;
