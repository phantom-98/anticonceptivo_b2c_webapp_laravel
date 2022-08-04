import React, {Fragment, useState, useContext, useEffect} from 'react';
import menu from "../../../assets/images/icons/header/menu.svg";
import anticonceptivo from "../../../assets/images/logo_responsive.png";
import cartBlue from "../../../assets/images/icons/header/cart-blue.svg";
import userBlue from "../../../assets/images/icons/header/user-blue.svg";
import search from "../../../assets/images/icons/header/search-blue.svg";
import {Link} from "react-router-dom";
import HeaderTop from "./HeaderTop";
import HeaderBox from "./HeaderBox";
import HeaderNavbar from "./HeaderNavbar";
import OffCanvas from "../../components/OffCanvas";
import {AppContext} from "../../../context/AppProvider";
import {ModalAuthMode} from "../../../Globals";
import CategoryMenuMobile from "./CategoryMenuMobile";
import boxWhite from "../../../assets/images/icons/header/box-white.svg"
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import SearchModal from "./SearchModal";
import TotalCartItems from "../../../components/shopping/TotalCartItems";
import PRIVATE_ROUTES from "../../../routes/privateRoutes";
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    const [textHeader, setTextHeader] = useState(null);

    useEffect(() => {
        getData();
    },[]);

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HEADER;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setTextHeader(response.data.tex_header);

                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }
    const carrousels = [
        {
            icon: boxWhite,
            name: ' Despacho prioritario solo en RM de lunes a sábado de 10:00 - 19:00 hrs',
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
                                <div className="row no-gutters" style={{marginTop: '10px', height: '28px'}}>
                                    {
                                        textHeader && textHeader.link ?

                                            <a href={textHeader.link } target="_blank" className="text-white">
                                                {textHeader ? textHeader.text : ''}
                                            </a>
                                            :
                                            textHeader ? textHeader.text : ''

                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row mx-2" style={{height: '70px'}}>
                            <div className="col d-flex" style={{justifyContent: 'center'}}>
                                <div className="my-auto text-center" onClick={showMenu}>
                                    <LazyLoadImage
                                        alt="anticonceptivo.cl"
                                        title="Anticonceptivo"
                                        rel="nofollow"
                                        effect="blur"
                                        src={menu}
                                        height={'25px'}
                                        width={'100%'}
                                    />
                                    <div className="text-icon-navbar-mobile">
                                        MENÚ
                                    </div>
                                </div>
                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center'}}>
                                <div className="my-auto text-center" onClick={showSearch}>
                                    <LazyLoadImage
                                        alt="anticonceptivo.cl"
                                        title="Anticonceptivo"
                                        rel="nofollow"
                                        effect="blur"
                                        src={search}
                                        height={'25px'}
                                        width={'100%'}
                                    />
                                    <div className="text-icon-navbar-mobile">
                                        BUSCAR
                                    </div>
                                </div>
                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center', padding: '0 30px'}}>
                                <div className="m-auto">
                                    <Link to="/">
                                        <LazyLoadImage
                                            alt="anticonceptivo.cl"
                                            title="Anticonceptivo"
                                            rel="nofollow"
                                            effect="blur"
                                            src={anticonceptivo}
                                            height={'100%'}
                                            width={'auto'}
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center'}}>

                                {
                                    auth ?
                                        <Link className="my-auto text-center" to={url}>
                                            <LazyLoadImage
                                                alt="anticonceptivo.cl"
                                                title="Anticonceptivo"
                                                rel="nofollow"
                                                effect="blur"
                                                src={userBlue}
                                                height={'25px'}
                                                width={'100%'}
                                            />
                                            <div className="text-icon-navbar-mobile">
                                                CUENTA
                                            </div>
                                        </Link>
                                        :

                                        <div className="my-auto text-center"
                                             onClick={() => showModalAuth(ModalAuthMode.LOGIN)}>
                                            <LazyLoadImage
                                                alt="anticonceptivo.cl"
                                                title="Anticonceptivo"
                                                rel="nofollow"
                                                effect="blur"
                                                src={userBlue}
                                                height={'100%'}
                                                width={'100%'}
                                            />
                                            <div className="text-icon-navbar-mobile">
                                                CUENTA
                                            </div>
                                        </div>
                                }


                            </div>

                            <div className="col d-flex" style={{justifyContent: 'center'}}>
                                <div className="my-auto text-center">
                                    <Link to={PUBLIC_ROUTES.CART.path}>
                                        <div className="cart-badge-quantity"><TotalCartItems/></div>
                                        <LazyLoadImage
                                            alt="anticonceptivo.cl"
                                            title="Anticonceptivo"
                                            rel="nofollow"
                                            effect="blur"
                                            height={25}
                                            src={cartBlue}
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

