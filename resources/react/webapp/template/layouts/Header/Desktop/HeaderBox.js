import React, {useRef, useContext, useState, useEffect, Fragment} from 'react';

import Icon from "../../../../components/general/Icon";
import logoFull from "../../../../assets/images/logo-full.svg";
import logoShort from "../../../../assets/images/logo_responsive.png";
import noImage from "../../../../assets/images/producto-default.png";
import userBlue from "../../../../assets/images/icons/header/user-blue.svg";
import cartBlue from "../../../../assets/images/icons/header/cart-blue.svg";
import searchWhite from "../../../../assets/images/icons/header/search-white.svg";

import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import PRIVATE_ROUTES from "../../../../routes/privateRoutes";

import {Link} from "react-router-dom";
import {AppContext} from "../../../../context/AppProvider";
import {AuthContext} from "../../../../context/AuthProvider";
import {ModalAuthMode} from "../../../../Globals";
import {CONFIG} from "../../../../Config";
import {formatMoney} from "../../../../helpers/GlobalUtils";
import {LazyLoadImage} from 'react-lazy-load-image-component';

import TotalCartItems from "../../../../components/shopping/TotalCartItems";
import * as Services from "../../../../Services";
import 'react-lazy-load-image-component/src/effects/blur.css';

const HeaderBox = () => {

    const {showModalAuth} = useContext(AppContext);
    const {auth, logout} = useContext(AuthContext);

    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [products, setProducts] = useState([]);
    const refInputSearch = useRef(null);
    const refDropdownList = useRef(null);
    const [isVisibilityDropdownSearch, setIsVisibilityDropdownSearch] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if ((refInputSearch.current && !refInputSearch.current.contains(event.target)) && (refDropdownList.current && !refDropdownList.current.contains(event.target)) ) {
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getSearch()
        }
    }

    const getSearch = (e) => {
        if (search.trim() != '') {
            let url = PUBLIC_ROUTES.SHOP_SEARCH.path;
            url = url.replace(":search", search);
            setIsVisibilityDropdownSearch(false);
            if (products.length == 1) {
                window.location.href = (PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', products[0].slug);
            } else {
                window.location.href = url;
            }
        }
    }

    const clearResults = () => setProducts([]);

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

    var url = PRIVATE_ROUTES.ACCOUNT.path;
    url = url.replace(':section', 'informacion-personal')

    const dropdownStyle = {
        overflowY: 'scroll'
    }

    return (
        <div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-auto top-do-flex pointer">
                        <div className="my-auto">
                            <div className="d-none d-xl-block">
                                <Link to={PUBLIC_ROUTES.HOME.path}>
                                    <Icon path={logoFull} style={{height: 47}}/>
                                </Link>
                            </div>
                            <div className="d-block d-xl-none">
                                <Link to={PUBLIC_ROUTES.HOME.path}>
                                    <Icon path={logoShort} style={{height: 47}}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col top-do-flex" >
                        <div className="input-group search-filter-button ml-auto search-top-desktop" style={{maxWidth : '540px'}}>
                            <input type="text"
                                   ref={refInputSearch}
                                   className="form-control form-control-custom"
                                   placeholder={"Buscar medicamentos, laboratorios o principio activo"}
                                   value={debouncedSearch}
                                   style={{height: '45px'}}
                                   onChange={e => setDebouncedSearch(e.target.value)}
                                   onKeyPress={handleKeyPress}
                            />
                            <div className="input-group-append">
                                <button
                                    onClick={() => getSearch()}
                                    type="button"
                                    className="btn btn-bicolor" style={{height: '45px'}}>
                                    <span className="px-3"><Icon path={searchWhite}/></span>
                                </button>
                            </div>
                        </div>
                        <div className={`dropdown-content ${products.length && search.length > 0 && isVisibilityDropdownSearch ? 'dropdown-search' : 'd-none'} `}
                             ref={refDropdownList}
                             >
                            <div className="box-search-result" style={products.length && search.length > 0 && isVisibilityDropdownSearch ? dropdownStyle : null}>
                                {
                                    isLoading ?
                                        <div className="d-flex justify-content-center font-poppins italic font-11 color-707070">
                                            Cargando...
                                        </div>
                                    :

                                    search.length && isVisibilityDropdownSearch && products.length > 0  ?
                                        products.map((product, index) => {
                                            return (
                                                <Fragment>
                                                    <Link
                                                        onClick={() =>  setSearch('') }
                                                        to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)}
                                                        style={{textDecoration: 'none', color: '#000000'}}>
                                                        <div className="row mt-2 px-0 mx-0">
                                                            <div className="col-2" style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                                <LazyLoadImage
                                                                    src={product.images.length ? product.images[0].public_file : noImage}
                                                                    title="Anticonceptivo"
                                                                    rel="nofollow"
                                                                    effect="blur"
                                                                    width={50}
                                                                    height={50}
                                                                    alt={`${CONFIG.APP_NAME} - ${product.name}`}
                                                                />
                                                            </div>
                                                            <div className="col-6 mr-auto" style={{alignSelf: 'center'}}>
                                                            <span
                                                                className="d-block font-poppins italic font-11 color-707070">{product.laboratory.name}</span>
                                                                <span
                                                                    className="font-poppins bold font-14">{product.name}</span>
                                                            </div>
                                                            <div className="col-4" style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'flex-end'
                                                            }}>
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
                                                                            <span className="font-12 font-poppins color-707070" style={{color: '#009BE8'}}>
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
                                                    </Link>
                                                    {
                                                        products.length !== index + 1 ?
                                                            <hr/>
                                                            : null
                                                    }
                                                </Fragment>
                                            );
                                        })
                                    : <span className="d-flex justify-content-center font-poppins italic font-11 color-707070" style={{marginTop:25}}>¿No encontraste lo que buscabas?, Nosotros te asesoramos <a href="https://wa.me/56987380541" target="_BLANK" style={{textDecoration:'underline'}}>  aquí.</a></span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-auto top-do-flex">
                        <div className="my-auto">
                            <div className={`row top-do-flex ${auth ? null : 'pointer'}`}>
                                <div className="col-auto my-auto pr-1">
                                    <Icon path={userBlue}/>
                                </div>
                                {
                                    auth ?
                                        <div className="col-auto my-auto pl-1">
                                            <div className="font-poppins font-13 lh-12 bold">Bienvenid@</div>
                                            <div className="row">
                                                <Link to={url} className="font-poppins font-13 lh-12 regular pointer">
                                                    <div className="col-auto pr-1">Mi Cuenta</div>
                                                </Link>

                                                <Link to="#" onClick={() => logout()}
                                                      className="font-poppins font-13 lh-12 regular pointer text-danger">
                                                    <div className="col-auto pl-1">Cerrar</div>
                                                </Link>
                                                {/*<span className="col-auto pl-1 font-poppins font-13 lh-12 regular pointer" >Cerrar</span>*/}
                                            </div>
                                        </div>
                                        :

                                        <div className="col-auto my-auto pl-1"
                                             onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                            <div className="font-poppins font-13 lh-12 bold">Bienvenid@</div>
                                            <div className="font-poppins font-13 lh-12 regular">Inicia sesión</div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-auto top-do-flex pointer">
                        <div className="my-auto">
                            <Link to={PUBLIC_ROUTES.CART.path}>
                                <div className="cart-badge-quantity"><TotalCartItems/></div>
                                <Icon path={cartBlue}/>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeaderBox
