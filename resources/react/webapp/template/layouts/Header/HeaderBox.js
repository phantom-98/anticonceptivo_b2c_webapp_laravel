import React, {useContext, useState, useEffect, Fragment} from 'react';
import Icon from "../../../components/general/Icon";
import logoFull from "../../../assets/images/logo-full.svg";
import userBlue from "../../../assets/images/icons/header/user-blue.svg"
import cartBlue from "../../../assets/images/icons/header/cart-blue.svg"
import searchWhite from "../../../assets/images/icons/header/search-white.svg"
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import PRIVATE_ROUTES from "../../../routes/privateRoutes";
import {Link} from "react-router-dom";
import {AppContext} from "../../../context/AppProvider";
import {AuthContext} from "../../../context/AuthProvider";
import {ModalAuthMode} from "../../../Globals";
import {CartContext} from "../../../context/CartProvider";
import TotalCartItems from "../../../components/shopping/TotalCartItems";
import * as Services from "../../../Services";
import {CONFIG} from "../../../Config";
import {formatMoney} from "../../../helpers/GlobalUtils";

const HeaderBox = () => {

    const {showModalAuth} = useContext(AppContext)
    const {auth, logout} = useContext(AuthContext)
    const {showMiniCart} = useContext(CartContext);

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [productsWithFilter, setProductsWithFilter] = useState(null);

    const sendSearch = (e) => {
        setSearch((e.target.value).toLowerCase());
    }

    useEffect(() => {
        getProducts();
    },[])

    useEffect(() =>{
        if (search.length > 0) {
            let productList = products;
            productList = productList.filter(product => {
                const name = (product.name).toLowerCase();
                const description = product.description ? (product.description).toLowerCase() : '';

                if(name.includes(search) || description.includes(search)){
                    return product;
                }
            })
            setProductsWithFilter(productList);
        }else{
            setProductsWithFilter(products);
        }
    }, [search])

    const getProducts = () => {
        let url = Services.ENDPOINT.NO_AUTH.SHOP.RESOURCES;
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

    var url = PRIVATE_ROUTES.ACCOUNT.path;
    url = url.replace(':section', 'informacion-personal')

    return (
        <div>
            <div className="container py-4">
                <div className="row">

                    <div className="col-md-auto top-do-flex pointer">
                        <div className="my-auto">
                            <Link to={PUBLIC_ROUTES.HOME.path}>
                                <Icon path={logoFull}/>
                            </Link>
                        </div>
                    </div>
                    <div className="col top-do-flex">
                        <div className="input-group search-filter-button">
                            <input type="text"
                                className="form-control form-control-custom form-control-custom-60"
                                placeholder="Buscar medicamentos, marcas"
                                value={search}
                                onChange={e => sendSearch(e)}
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-bicolor" style={{height: '60px'}}>
                                    <span className="px-3"><Icon path={searchWhite}/></span>
                                </button>
                            </div>
                        </div>
                        <div className="dropdown-content">
                        {
                            search.length ? 
                                productsWithFilter.map((product, index) => {
                                    return (
                                        <Fragment>
                                            
                                                <Link to={(PUBLIC_ROUTES.PRODUCT_DETAIL.path).replace(':slug?', product.slug)} style={{textDecoration: 'none', color: '#000000'}}>
                                                    <div className="row mt-2 px-0">
                                                        <div className="col-auto">
                                                            <img style={{width:50, height:50}} src={product.images.length ? product.images[0].public_file : null} alt={`${CONFIG.APP_NAME} - ${product.name}`}/>
                                                        </div>
                                                        <div className="col-auto mr-auto" style={{alignSelf: 'center'}}>
                                                            <span className="d-block font-poppins italic font-11 color-707070">{product.laboratory.name}</span>
                                                            <span className="font-poppins bold font-14">{product.name}</span>
                                                        </div>
                                                        <div className="col-auto mr-4" style={{alignSelf: 'center'}}>
                                                            <span className="font-14 font-poppins bold" style={{color: '#009BE8'}}>
                                                                {formatMoney(product.price)}
                                                            </span>
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

                                                <Link to="#" onClick={() => logout()} className="font-poppins font-13 lh-12 regular pointer text-danger">
                                                    <div className="col-auto pl-1">Cerrar</div>
                                                </Link>
                                                {/*<span className="col-auto pl-1 font-poppins font-13 lh-12 regular pointer" >Cerrar</span>*/}
                                            </div>
                                        </div>
                                    :

                                    <div className="col-auto my-auto pl-1" onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                        <div className="font-poppins font-13 lh-12 bold">Bienvenid@</div>
                                        <div className="font-poppins font-13 lh-12 regular">Inicia sesión</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-auto top-do-flex pointer" onClick={showMiniCart}>
                        <div className="my-auto">
                            <div className="cart-badge-quantity"><TotalCartItems/></div>
                            <Icon path={cartBlue}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeaderBox