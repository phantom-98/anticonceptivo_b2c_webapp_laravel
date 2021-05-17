import React, {useContext} from 'react';
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


const HeaderBox = () => {

    const {showModalAuth} = useContext(AppContext)
    const {auth} = useContext(AuthContext)
    const {showMiniCart} = useContext(CartContext);

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
                                   placeholder="Buscar medicamentos, marcas"/>
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-bicolor" style={{height: '60px'}}>
                                    <span className="px-3"><Icon path={searchWhite}/></span>
                                </button>
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
                                                <div className="col-auto pl-1 font-poppins font-13 lh-12 regular pointer" onClick={() => console.log('doLogout')}>Cerrar</div>
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
