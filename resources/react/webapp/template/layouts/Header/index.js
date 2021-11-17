import React, {Fragment, useState, useContext, useEffect} from 'react';
import menu from "../../../assets/images/icons/header/menu.svg";
import anticonceptivo from "../../../assets/images/logo-mobile.svg";
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
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import phoneWhite from "../../../assets/images/icons/header/phone-white.svg"
import emailWhite from "../../../assets/images/icons/header/email-white.svg"
import boxWhite from "../../../assets/images/icons/header/box-white.svg"
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {v4 as uuidv4} from 'uuid';
import Icon from "../../../components/general/Icon";
import SearchModal from "./SearchModal";
import TotalCartItems from "../../../components/shopping/TotalCartItems";
import PRIVATE_ROUTES from "../../../routes/privateRoutes";
import {AuthContext} from "../../../context/AuthProvider";

const Header = () => {

    const {auth, logout} = useContext(AuthContext)

    const {showModalAuth} = useContext(AppContext);

    const [showingMenu, setShowingMenu] = useState(false);
    const showMenu = () => setShowingMenu(true);
    const hideMenu = () => setShowingMenu(false);

    const [showingSearch, setShowingSearch] = useState(false);
    const showSearch = () => setShowingSearch(true);
    const hideSearch = () => setShowingSearch(false);

    const [fixedTop, setFixedTop] = useState(false);

    const carrousels = [
        {
            icon: boxWhite,
            name: ' Despacho inmediato solo en RM de lunes a sábado de 10:00 - 19:00 hrs',
            fontSize: 'font-10',
            isLink: false,
        }
    ];

    useEffect(() => {

        onScroll(true)
        window.addEventListener("scroll", onScroll);

    }, []);

    function onScroll() {
        const _fixed = fixedTop; // is not redundate, becase te state uts slow on change
        if (window.pageYOffset > 1) {
            if (!_fixed) {
                setFixedTop(true)
            }
        }

        if (window.pageYOffset == 0) {
            setFixedTop(false)
        }
    }

    let url = PRIVATE_ROUTES.ACCOUNT.path;
    url = url.replace(':section', 'informacion-personal')

    return (
        <Fragment>
            <section id="header" className="header">

                <div className="d-md-block d-none">
                    <HeaderTop/>
                </div>

                <div className="d-md-block d-none">
                    <div className={`style-props ${fixedTop ? 'style-props-fixed-top' : ''}`}>
                        <HeaderBox/>
                    </div>
                </div>
                <div className="d-md-block d-none">
                    <div className={`style-props-menu ${fixedTop ? 'style-props-menu-fixed-top' : ''}`}>
                        <HeaderNavbar/>
                    </div>
                </div>

                {/* Mobile */}
                <div className="d-md-none d-block">
                    <div className="menu-mobile">
                        <div className="row first-row">
                            <div className="col-auto font-poppins font-12 text-center">
                                <marquee loop='10'>
                                    <div className="row no-gutters" style={{marginTop: '4px', height: '28px'}}>
                                        <div className="col-auto d-flex mr-2">
                                            <Icon className="my-auto" path={carrousels[0].icon}/>
                                        </div>
                                        <div className="col d-flex">
                                            <span className="my-auto "
                                                  style={{fontWeight: 500}}> {carrousels[0].name}</span>
                                        </div>
                                    </div>
                                </marquee>
                            </div>
                        </div>
                        <div className="row mx-2" style={{height: '70px'}}>
                            <div className="col d-flex" style={{justifyContent: 'center'}}>
                                <div className="my-auto text-center" onClick={showMenu}>
                                    <img src={menu}
                                         alt="anticonceptivo.cl"
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                        // height="34px"
                                    />
                                    <div className="text-icon-navbar-mobile">
                                        MENÚ
                                    </div>
                                </div>
                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center'}}>
                                <div className="my-auto text-center" onClick={showSearch}>
                                    <img src={search}
                                         alt="anticonceptivo.cl"
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                        // height="25px"
                                    />
                                    <div className="text-icon-navbar-mobile">
                                        BUSCAR
                                    </div>
                                </div>
                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center', padding: '0 30px'}}>
                                <div className="m-auto">
                                    <Link to="/">
                                        <img
                                            src={anticonceptivo}
                                            alt="anticonceptivo.cl"
                                            title="Anticonceptivo"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center'}}>

                                {
                                    auth ?
                                        <Link className="my-auto text-center" to={url}>
                                            <img src={userBlue}
                                                 alt="anticonceptivo.cl"
                                                 title="Anticonceptivo"
                                                 rel="nofollow"
                                                 height="25px"
                                            />
                                            <div className="text-icon-navbar-mobile">
                                                CUENTA
                                            </div>
                                        </Link>
                                        :

                                        <div className="my-auto text-center"
                                             onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                            <img src={userBlue}
                                                 alt="anticonceptivo.cl"
                                                 title="Anticonceptivo"
                                                 rel="nofollow"
                                                 height="25px"
                                            />
                                            <div className="text-icon-navbar-mobile">
                                                CUENTA
                                            </div>
                                        </div>
                                }


                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center'}}>
                                {/* <div className="my-auto" onClick={showMiniCart}>
                                    <div className="cart-badge-quantity"><TotalCartItems/></div>
                                    <img src={cartBlue}
                                         alt="anticonceptivo.cl"
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="25px"
                                    />
                                </div> */}


                                <div className="my-auto text-center">
                                    <Link to={PUBLIC_ROUTES.CART.path}>
                                        <div className="cart-badge-quantity"><TotalCartItems/></div>
                                        <img src={cartBlue}
                                             alt="anticonceptivo.cl"
                                             title="Anticonceptivo"
                                             rel="nofollow"
                                             height="25px"
                                        />
                                    </Link>
                                    <div className="text-icon-navbar-mobile">
                                        CARRO
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-md-none d-block">
                    <OffCanvas showCanvas={showingMenu} closeCanvas={hideMenu}>
                        <div className="row menu-mobile-issue">
                            <CategoryMenuMobile
                                hideMenu={hideMenu}
                            />
                        </div>
                    </OffCanvas>
                </div>
                <div className="d-md-none d-block">
                    <SearchModal
                        showingSearch={showingSearch}
                        hideSearch={hideSearch}
                    />
                </div>
            </section>
        </Fragment>
    );

};

export default Header;

