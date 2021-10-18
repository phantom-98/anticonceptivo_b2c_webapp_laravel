import React, {Fragment, useState, useContext, useEffect} from 'react';
import menu from "../../../assets/images/icons/header/menu.svg";
import anticonceptivo from "../../../assets/images/logo-responsive.png";
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

    const styleProps = {
        position: 'fixed',
        right: 0,
        left: 0,
        zIndex: 1031,
        backgroundColor: 'white',
    }

    const stylePropsMenu = {
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

    const [showingSearch, setShowingSearch] = useState(false);
    const showSearch = () => setShowingSearch(true);
    const hideSearch = () => setShowingSearch(false);

    const [topFixed, setTopFixed] = useState({
        top: 34,
        boxShadow: '0px 1px 4px rgb(0 0 0 / 0%)'
    });

    const [topFixedMenu, setTopFixedMenu] = useState({
        top: 142,
        boxShadow: '0px 1px 4px rgb(0 0 0 / 0%)'
    });

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset >= 1) {
                setTopFixed({
                    top: 0,
                    boxShadow: '0px 1px 4px rgb(0 0 0 / 20%)'
                })
                setTopFixedMenu({
                    top: 108,
                    boxShadow: '0px 1px 4px rgb(0 0 0 / 20%)'
                })
            } else {
                setTopFixed({
                    top: 34,
                    boxShadow: '0px 1px 4px rgb(0 0 0 / 0%)'
                })
                setTopFixedMenu({
                    top: 142,
                    boxShadow: '0px 1px 4px rgb(0 0 0 / 0%)'
                })
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const carrousels = [
        {
            icon: boxWhite,
            name: 'Contamos con reparto solo en la Región Metropolitana',
            fontSize: 'font-10',
            isLink: false,
        }
    ];

    // const settings = {
    //     dots: false,
    //     infinite: false,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     // autoplay: true,
    //     // speed: 2000,
    //     // autoplaySpeed: 2000,
    //     // cssEase: "linear"
    // };
    var url = PRIVATE_ROUTES.ACCOUNT.path;
    url = url.replace(':section', 'informacion-personal')

    return (
        <Fragment>
            <section id="header" className="header">
                {/* Desktop */}

                <div className="d-md-block d-none">
                    <HeaderTop/>
                </div>

                <div className="d-md-block d-none">
                    <div style={{...styleProps, ...topFixed}}>
                        <HeaderBox/>
                    </div>
                </div>
                <div className="d-md-block d-none">
                    <div style={{...stylePropsMenu, ...topFixedMenu}}>
                        <HeaderNavbar/>
                    </div>
                </div>

                {/* Mobile */}
                <div className="d-md-none d-block">
                    <div className="menu-mobile">
                        <div className="row first-row" style={{height: '25px'}}>
                            <div className="col-auto font-poppins font-10 text-center">
                                <span><Icon path={carrousels[0].icon}/> {carrousels[0].name}</span>
                            </div>
                        </div>
                        <div className="row mx-2" style={{height: '70px'}}>
                            <div className="col-2 d-flex" style={{justifyContent: 'center'}}>
                                <div className="my-auto" onClick={showMenu}>
                                    <img src={menu}
                                         alt=""
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="34px"
                                    />
                                </div>
                            </div>

                            <div className="col-2 d-flex" style={{justifyContent: 'center'}}>
                                <div className="my-auto" onClick={showSearch}>
                                    <img src={search}
                                         alt=""
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="25px"
                                    />
                                </div>
                            </div>

                            <div className="col-4 d-flex" style={{justifyContent: 'center'}}>
                                <div className="m-auto">
                                    <Link to="/">
                                        <img
                                            src={anticonceptivo}
                                            alt=""
                                            title="Anticonceptivo"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-2 d-flex" style={{justifyContent: 'center'}}>

                                {
                                    auth ?
                                        <Link className="my-auto" to={url}>
                                            <img src={userBlue}
                                                 alt=""
                                                 title="Anticonceptivo"
                                                 rel="nofollow"
                                                 height="25px"
                                            />
                                        </Link>
                                        :

                                        <div className="my-auto" onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                            <img src={userBlue}
                                                 alt=""
                                                 title="Anticonceptivo"
                                                 rel="nofollow"
                                                 height="25px"
                                            />
                                        </div>
                                }


                            </div>

                            <div className="col-2 d-flex" style={{justifyContent: 'center'}}>
                                {/* <div className="my-auto" onClick={showMiniCart}>
                                    <div className="cart-badge-quantity"><TotalCartItems/></div>
                                    <img src={cartBlue}
                                         alt=""
                                         title="Anticonceptivo"
                                         rel="nofollow"
                                         height="25px"
                                    />
                                </div> */}

                                
                                <div className="my-auto">
                                    <Link to={PUBLIC_ROUTES.CART.path} >
                                        <div className="cart-badge-quantity"><TotalCartItems/></div>
                                        <img src={cartBlue}
                                            alt=""
                                            title="Anticonceptivo"
                                            rel="nofollow"
                                            height="25px"
                                        />
                                    </Link>
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

