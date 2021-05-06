import React, {useContext} from 'react';
import Icon from "../../../components/general/Icon";
import logoFull from "../../../assets/images/logo-full.svg";
import userBlue from "../../../assets/images/icons/header/user-blue.svg"
import cartBlue from "../../../assets/images/icons/header/cart-blue.svg"
import searchWhite from "../../../assets/images/icons/header/search-white.svg"
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {Link} from "react-router-dom";
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";
import {CartContext} from "../../../context/CartProvider";

const HeaderBox = () => {

    const {showModalAuth} = useContext(AppContext)
    const {showMiniCart} = useContext(CartContext);

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
                            <div className="row top-do-flex pointer">
                                <div className="col-auto my-auto pr-1">
                                    <Icon path={userBlue}/>
                                </div>
                                <div className="col-auto my-auto pl-1"
                                     onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                    <div className="font-poppins font-13 lh-12 bold">Bienvenid@</div>
                                    <div className="font-poppins font-13 lh-12 regular">Inicia sesión</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-auto top-do-flex pointer" onClick={showMiniCart}>
                        <div className="my-auto">
                            <div className="cart-badge-quantity">99</div>
                            <Icon path={cartBlue}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeaderBox
