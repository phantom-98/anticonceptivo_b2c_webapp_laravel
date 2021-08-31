import React, {Fragment, useState, useContext, useEffect} from 'react';
import menu from "../../../assets/images/icons/header/menu.svg";
import anticonceptivo from "../../../assets/images/logo.svg";
import cartBlue from "../../../assets/images/icons/header/cart-blue.svg";
import userBlue from "../../../assets/images/icons/header/user-blue.svg";
import search from "../../../assets/images/icons/header/search-blue.svg";
import {Link} from "react-router-dom";
import HeaderTop from "./HeaderTop";
import HeaderBox from "./HeaderBox";
import HeaderNavbar from "./HeaderNavbar";
import OffCanvas from "../../components/OffCanvas";
import {CartContext} from "../../../context/CartProvider";
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";
import CategoryMenuMobile from "./CategoryMenuMobile";
import {useLocation} from "react-router-dom";

const Header = () => {

    const styleProps = {
        top: 0,
        position: 'fixed',
        right: 0,
        left: 0,
        zIndex: 1030,
        backgroundColor: 'white',
    }

    const {showMiniCart} = useContext(CartContext);
    const {showModalAuth} = useContext(AppContext);

    const [showingMenu, setShowingMenu] = useState(false);
    const showMenu = () => setShowingMenu(true);
    const hideMenu = () => setShowingMenu(false);

    return (
        <Fragment>
            <section id="header" style={styleProps} className="header">
                {/* Desktop */}

                <div className="d-md-block d-none">
                    <HeaderTop /> 
                </div>

                <div className="d-md-block d-none">
                    <HeaderBox />
                </div>
                <div className="d-md-block d-none">
                    <HeaderNavbar />
                </div>

                {/* Mobile */}
                <div className="d-md-none d-block">
                    <div className="menu-mobile">
                        <div className="row first-row" style={{height: '25px'}}>
                            <div className="col-auto">
                                Carrousel
                            </div>
                        </div>
                        <div className="row mx-2" style={{height: '60px'}}>
                            <div className="col-2 d-flex" style={{justifyContent:'center'}}>
                                <div className="my-auto" onClick={showMenu}>
                                    <img src={menu}
                                         alt=""
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="34px"
                                         />
                                </div>
                            </div>

                            <div className="col-2 d-flex" style={{justifyContent:'center'}}>
                                <div className="my-auto" onClick={showMenu}>
                                    <img src={search}
                                         alt=""
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="25px"
                                         />
                                </div>
                            </div>

                            <div className="col-4 d-flex" style={{justifyContent:'center'}}>
                                <div className="m-auto">
                                    <Link to="/">
                                        <img
                                            src={anticonceptivo}
                                            alt=""
                                            title="Anticonceptivo"
                                            style={{height: '45px'}}
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-2 d-flex" style={{justifyContent:'center'}}>
                                <div className="my-auto" onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                    <img src={userBlue}
                                         alt=""
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="25px"
                                         />
                                </div>
                            </div>

                            <div className="col-2 d-flex" style={{justifyContent:'center'}}>
                                <div className="my-auto" onClick={showMiniCart}>
                                    <img src={cartBlue}
                                         alt=""
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="25px"
                                         />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-md-none d-block">
                    <OffCanvas showCanvas={showingMenu} closeCanvas={hideMenu}>
                        <div className="row">
                            <CategoryMenuMobile
                                hideMenu={hideMenu}
                            />
                        </div>
                    </OffCanvas>
                </div>

            </section>
        </Fragment>
    );

};

export default Header;

