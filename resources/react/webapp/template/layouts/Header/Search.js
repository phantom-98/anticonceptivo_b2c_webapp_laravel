import React, {useEffect, useState, Fragment, useRef} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {Link} from "react-router-dom";
import * as Services from "../../../Services";
import {CONFIG} from "../../../Config";
import {formatMoney} from "../../../helpers/GlobalUtils";
import searchWhiteThin from "../../../assets/images/icons/header/search-white-thin.svg"
import Icon from "../../../components/general/Icon";
import noImage from "../../../assets/images/producto-default.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Search = ({hideModal}) => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [productsWithFilter, setProductsWithFilter] = useState([]);
    const refInputSearch = useRef(null);
    const [isVisibilityDropdownSearch, setIsVisibilityDropdownSearch] = useState(false);

    const sendSearch = (e) => {
        setSearch((e.target.value).toLowerCase());
    }

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
            if(productsWithFilter.length == 1){
                window.location.href = (PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug', productsWithFilter[0].slug);
            }else{
                window.location.href = url;

            }
        }

    }

    useEffect(() => {
        getProducts();
    },[])

    useEffect(() =>{
        setIsVisibilityDropdownSearch(true);
        if (search.length > 0) {
            let productList = products;
            productList = productList.filter(product => {
                const name = (product.name).toLowerCase();
                const sku = product.sku;
                const laboratory = product.laboratory.name.toLowerCase();
                const texCompound = product.compound;

                const description = product.description ? (product.description).toLowerCase() : '';

                if(name.includes(search) || (texCompound !== null ? texCompound.includes(search) : false) || description.includes(search) || sku.includes(search) || laboratory.includes(search)){
                    return product;
                }
            })
            setProductsWithFilter(productList);
        }else{
            setProductsWithFilter(products);
        }
    }, [search])

    const getProducts = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER_BOX;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
            response: response,
            success: () => {
                setProducts(response.data.products);
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const dropdownStyle = {
        overflowY: 'scroll'
    }

    return(
        <div className="col top-do-flex">
            <div className="input-group search-filter-button search-top-mobile">
                <input type="text"
                    className="form-control form-control-custom form-control-custom-60"
                    placeholder="¿Qué estás buscando?"
                    value={search}
                    onChange={e => sendSearch(e)}
                    onKeyPress={handleKeyPress}

                />
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
                <div className="modal-search-mobile" style={ productsWithFilter.length && search.length > 0 && isVisibilityDropdownSearch ? dropdownStyle : null}>
                    {
                        search.length && isVisibilityDropdownSearch  ?
                            productsWithFilter.map((product, index) => {
                                return (
                                    <Fragment>

                                            <Link onClick={hideModal} to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)} style={{textDecoration: 'none', color: '#000000'}}>
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
                                                            <div className="col-12" style={{alignSelf: 'center'}}>
                                                                <span className="font-14 font-poppins bold" style={{color: '#009BE8'}}>
                                                                    {formatMoney(product.is_offer ? product.offer_price : product.price)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            {
                                                productsWithFilter.length !== index+1 ?
                                                <hr/>
                                                : null
                                            }
                                    </Fragment>
                                );
                            })
                        : null
                    }
                </div>
                : null
            }
        </div>
    );
}

export default Search;
